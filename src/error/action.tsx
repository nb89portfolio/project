"use server";

import { PrismaClient } from "@prisma/client";
import { ErrorReport } from "./types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function buildErrorMessage(key: keyof Error, state: "unknown" | "undefined") {
  return `Error ${key} is ${state}.`;
}

function buildError(error: unknown) {
  const isError =
    error instanceof PrismaClientKnownRequestError ||
    error instanceof SyntaxError ||
    error instanceof TypeError ||
    error instanceof Error;

  const name = isError ? error.name : buildErrorMessage("name", "unknown");
  const message = isError
    ? error.message
    : buildErrorMessage("message", "unknown");
  const stack = isError ? error.stack : buildErrorMessage("stack", "unknown");
  const isDefinedStack = stack !== undefined;
  const definedStack = isDefinedStack
    ? stack
    : buildErrorMessage("stack", "undefined");

  return `Error name: ${name},\nMessage: ${message}.,\n Stack: ${definedStack}.`;
}

function getOrmConnection() {
  try {
    return new PrismaClient();
  } catch (error) {
    return buildError(error);
  }
}

async function findingDuplicate(report: ErrorReport, orm: PrismaClient) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    return await orm.reportedError.findFirst({
      where: { name, message, stack, componentStack, digest },
    });
  } catch (error) {
    return buildError(error);
  }
}

async function updateReport(orm: PrismaClient, id: number, severity: number) {
  try {
    await orm.reportedError.update({
      where: { id },
      data: { severity: severity++, updated: new Date() },
    });

    return "Error report has been updated.";
  } catch (error) {
    return buildError(error);
  }
}

async function createReport(orm: PrismaClient, report: ErrorReport) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    await orm.reportedError.create({
      data: {
        name,
        message,
        stack,
        componentStack,
        digest,
        created: new Date(),
        updated: new Date(),
        severity: 0,
      },
    });

    return "Error report has been created.";
  } catch (error) {
    return buildError(error);
  }
}

export default async function errorAction(report: ErrorReport) {
  try {
    const orm = getOrmConnection();

    const isOrmDefined = typeof orm !== "string";

    const findDuplicate = isOrmDefined
      ? await findingDuplicate(report, orm)
      : orm;

    const isNotError = typeof findDuplicate !== "string";

    const foundDuplicate = findDuplicate !== null;

    const response = isNotError
      ? foundDuplicate
        ? await updateReport(
            orm as PrismaClient,
            findDuplicate.id,
            findDuplicate.severity
          )
        : await createReport(orm as PrismaClient, report)
      : findDuplicate;

    return response;
  } catch (error) {
    return buildError(error);
  }
}
