"use server";

import { PrismaClient } from "@prisma/client";
import { ErrorReport } from "./types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function buildErrorPropertyMessage(
  key: keyof Error,
  state: "unknown" | "undefined"
) {
  return `Error ${key} is ${state}.`;
}

function buildFatalErrorMessage(error: unknown) {
  const isError =
    error instanceof PrismaClientKnownRequestError ||
    error instanceof SyntaxError ||
    error instanceof TypeError ||
    error instanceof Error;

  const name = isError
    ? error.name
    : buildErrorPropertyMessage("name", "unknown");
  const message = isError
    ? error.message
    : buildErrorPropertyMessage("message", "unknown");
  const stack = isError
    ? error.stack
    : buildErrorPropertyMessage("stack", "unknown");
  const isDefinedStack = stack !== undefined;
  const definedStack = isDefinedStack
    ? stack
    : buildErrorPropertyMessage("stack", "undefined");

  return `Error name: ${name},\nMessage: ${message}.,\n Stack: ${definedStack}.`;
}

async function updateReport(orm: PrismaClient, id: number, severity: number) {
  try {
    const query = {
      where: { id },
      data: { severity: severity++, updated: new Date() },
    };

    await orm.reportedError.update(query);

    return "Error report has been updated.";
  } catch (error) {
    return buildFatalErrorMessage(error);
  }
}

async function createReport(orm: PrismaClient, report: ErrorReport) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    const query = {
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
    };

    await orm.reportedError.create(query);

    return "Error report has been created.";
  } catch (error) {
    return buildFatalErrorMessage(error);
  }
}

// new

type DefinedError = {
  name: string;
  message: string;
  stack: string;
};

type FatalError = {
  description: string;
  error: DefinedError;
};

function defineError(error: unknown) {
  const isError =
    error instanceof PrismaClientKnownRequestError ||
    error instanceof SyntaxError ||
    error instanceof TypeError ||
    error instanceof Error;

  if (isError) {
    const { name, message } = error;

    const isStackDefined = error.stack !== undefined;

    if (isStackDefined) {
      const { stack } = error;

      return { name, message, stack } as DefinedError;
    }

    return {
      name,
      message,
      stack: "Stack is undefined.",
    } as DefinedError;
  }

  return {
    name: "Name is unknown.",
    message: "Message is unknown.",
    stack: "Stack is unknown.",
  };
}


function connectOrmInstance() {
  try {
    return {
      type: new PrismaClient(),
      error: null,
    } as ReturnData;
  } catch (error) {
    const definedError = defineError(error);

    return {
      type: null,
      error: {
        description: "",
        error: definedError,
      },
    } as ReturnData;
  }
}

async function findDuplicateReport(
  report: ErrorReport,
  ormInstance: PrismaClient
) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    const searchForDuplicate = ormInstance.reportedError.findFirst({
      where: { name, message, stack, componentStack, digest },
    });

    return {
      data: 
    }
  } catch (error) {
    const definedError = defineError(error);

    return {
      type: null,
      error: {
        description: "",
        error: definedError,
      },
    } as ReturnData;
  }
}

export default async function errorAction(report: ErrorReport) {
  try {
    const ormInstance = connectOrmInstance();

    const hasError = ormInstance.error !== null;

    if (hasError) {
      return ormInstance.error as FatalError;
    }

    const duplicateReport = await findDuplicateReport(
      report,
      ormInstance.type as PrismaClient
    );

    const query = {
      where: { name, message, stack, componentStack, digest },
    };

    const findDuplicate = await orm.reportedError.findFirst(query);

    const foundDuplicate = findDuplicate !== null;

    const response = foundDuplicate
      ? await updateReport(
          orm as PrismaClient,
          findDuplicate.id,
          findDuplicate.severity
        )
      : await createReport(orm as PrismaClient, report);

    return response;
  } catch (error) {
    return buildFatalErrorMessage(error);
  }
}
