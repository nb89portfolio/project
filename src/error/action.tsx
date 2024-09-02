"use server";

import prismaClient from "@/prisma/client";
import { ErrorDefinition } from "./types";

async function findDuplciateReport(error: ErrorDefinition) {
  try {
    const { name, message, stack, digest } = error;

    const foundDuplicate = await prismaClient.errorRecord.findFirst({
      where: { name, message, stack, digest },
    });

    const hasDuplicate = foundDuplicate !== null;

    return hasDuplicate as boolean;
  } catch (error) {
    return error as Error;
  }
}

export default async function reportErrorRecord(
  error: ErrorDefinition,
  username: string
) {
  try {
    const hasDuplicate = await findDuplciateReport(error);

    const hasError = hasDuplicate instanceof Error;

    if (hasError) {
      return hasDuplicate;
    }

    if (hasDuplicate as boolean) {
    }
  } catch (error) {
    return error as Error;
  }
}
