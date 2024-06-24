"use server";

import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type Props = {
  name: string;
  message: string;
  stack: string;
  componentStack: string;
  digest: string;
};

type ServerError = {
  procedure: string;
  name: string;
  message: string;
  stack: string;
};

function defineServerError(error: unknown, description: string) {
  const isError =
    error instanceof Error ||
    error instanceof TypeError ||
    error instanceof SyntaxError ||
    error instanceof PrismaClientKnownRequestError;

  if (!isError) {
    const name = "Name is unknown.";
    const message = "Message is unknown.";
    const stack = "Message is unknown.";

    return { name, message, stack, description };
  }

  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  if (isStackDefined) {
    const stack = error.stack as string;

    return { name, message, stack, description };
  }

  const stack = "Stack is undefined";

  return { name, message, stack, description };
}

function instantiateOrmInstance() {
  try {
    const ormInstance = new PrismaClient();

    return ormInstance;
  } catch (error) {
    const description =
      "Fatal server error occured during instanciating orm instance.";

    const response = defineServerError(error, description);

    return response;
  }
}

async function findDuplicate(report: Props, ormInstance: PrismaClient) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    const foundDuplicate = await ormInstance.reportedError.findFirst({
      where: { name, message, stack, componentStack, digest },
    });

    return foundDuplicate;
  } catch (error) {
    const description =
      "Fatal server error occured while finding duplicate report.";

    const response = defineServerError(error, description);

    return response;
  }
}

function isServerError(error: any): error is ServerError {
  const test = (error as ServerError).procedure !== undefined;

  return test;
}

async function createRecord(ormInstance: PrismaClient, report: Props) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    const test = await ormInstance.reportedError.create({
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

    return "Error record has been made.";
  } catch (error) {
    const description =
      "Fatal server error occured during creating error record.";

    const response = defineServerError(error, description);

    return response;
  }
}

export default async function errorAction({ report }: { report: Props }) {
  try {
    const ormInstance = instantiateOrmInstance();

    const isInstanceError = isServerError(ormInstance);

    if (isInstanceError) {
      return ormInstance as ServerError;
    }

    const foundDuplicate = await findDuplicate(
      report,
      ormInstance as PrismaClient
    );

    const foundDuplicateError = isServerError(foundDuplicate);

    if (foundDuplicateError) {
      return foundDuplicate as ServerError;
    }

    const hasDuplicate = foundDuplicate !== null;

    if (!hasDuplicate) {
      const createdRecord = await createRecord(
        ormInstance as PrismaClient,
        report
      );
    }
  } catch (error) {
    const description = "Fatal server error occured during error action.";

    const response = defineServerError(error, description);

    return response;
  }
}
