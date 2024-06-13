"use server";

import { PrismaClient } from "@prisma/client";
import { DefinedError, ErrorReport } from "./types";

function assignErrorObjectProperty(
  key: keyof Error,
  state: "unknown" | "undefined"
) {
  return `Error ${key} is ${state}.` as string;
}

function defineErrorObject(error: any) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  const name = isError
    ? error.name
    : assignErrorObjectProperty("name", "unknown");
  const message = isError
    ? error.message
    : assignErrorObjectProperty("message", "unknown");

  const stack = isError
    ? error.stack
    : assignErrorObjectProperty("stack", "unknown");

  const definedStack =
    stack !== undefined
      ? stack
      : assignErrorObjectProperty("stack", "undefined");

  return {
    name,
    message,
    stack: definedStack,
  } as DefinedError;
}

function createReport() {
  return "";
}

function updateReport() {
  return "";
}

export default async function errorAction(report: ErrorReport) {
  const { name, message, stack, componentStack, digest } = report;

  try {
    const orm = new PrismaClient();

    const findDuplicate = await orm.reportedError.findFirst({
      where: { name, message, stack, componentStack, digest },
    });

    const foundDuplicate = findDuplicate !== null;

    const response = foundDuplicate ? updateReport() : createReport();

    return response;
  } catch (error) {
    const definedError = defineErrorObject(error);
    const { name, message, stack } = definedError;
    const response = `Error ${name}: ${message} (${stack})`;

    return response;
  }
}
