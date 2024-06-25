import { PrismaClient } from "@prisma/client";
import { ErrorReport } from "./wrapper";

function buildError(error: Error) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  if (isStackDefined) {
    const stack = error.stack as string;

    return { name, message, stack };
  }

  const stack = "Stack is undefined.";

  return { name, message, stack };
}

function buildFatalErrorMessage(error: unknown) {
  const isError =
    error instanceof Error ||
    error instanceof SyntaxError ||
    error instanceof TypeError;

  if (isError) {
    const { name, message, stack } = buildError(error);

    return `Fatal error calling server error action:\n${name}\n${message}\n${stack}`;
  }

  return "Fatal error calling server error action is unknown.";
}

export default async function errorAction(report: ErrorReport) {
  try {
    const { name, message, stack, componentStack, digest } = report;

    const orm = new PrismaClient();

    const duplicateRecord = await orm.reportedError.findFirst({
      where: { name, message, stack, componentStack, digest },
    });

    const hasDuplicate = duplicateRecord !== null;

    if (hasDuplicate) {
      const updatepRecord = await orm.reportedError.update({
        where: {
          id: duplicateRecord.id,
        },
        data: {
          updated: new Date(),
          severity: duplicateRecord.severity++,
        },
      });

      return `Error record has been updated on ${updatepRecord.updated}.`;
    } else {
      const createdRecord = await orm.reportedError.create({
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

      return `Error record has been updated on ${createdRecord.updated}.`;
    }
  } catch (error) {
    const status = buildFatalErrorMessage(error);

    return status;
  }
}
