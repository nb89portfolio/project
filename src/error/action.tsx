'use server';

import prisma from '@/prisma/provider';
import { ErrorReport } from './provider';
import { NextJsError } from '@/app/error';

function defineReport(error: NextJsError) {
  const { name, message } = error;

  const isStackDefined = error.stack !== undefined;

  const stack = isStackDefined
    ? (error.stack as string)
    : 'Stack is undefined.';

  const isDigestDefined = error.digest !== undefined;

  const digest = isDigestDefined
    ? (error.digest as string)
    : 'Digest is undefined.';

  return { name, message, stack, digest } as ErrorReport;
}

async function getUserRecord(username: string) {
  try {
    const duplicateUser = await prisma.users.findFirst({
      where: { username },
    });

    const hasDuplicateUser = duplicateUser !== null;

    if (!hasDuplicateUser) {
      const createdUser = await prisma.users.create({ data: { username } });

      return createdUser;
    }

    return duplicateUser;
  } catch (error) {
    const isError = error instanceof Error;

    if (isError) {
      throw error;
    } else {
      throw new Error('Error is unkown.');
    }
  }
}

export default async function reportErrorRecord(
  report: ErrorReport,
  username: string
) {
  try {
    const user = await getUserRecord(username);

    const duplicateReport = await prisma.errorRecords.findFirst({
      where: {
        ...report,
      },
    });

    const hasDuplicateReport = duplicateReport !== null;

    console.log(duplicateReport);

    if (!hasDuplicateReport) {
      const createdRecord = await prisma.errorRecords.create({
        data: {
          ...report,
        },
      });

      const createInstance = await prisma.errorInstances.create({
        data: {
          created: new Date(),
          updated: new Date(),
          errorRecordsId: createdRecord.id,
          usersId: user.id,
          User: {  },
        },
      });
    }

    return 'test';
  } catch (error) {
    const isError = error instanceof Error;

    if (isError) {
      return defineReport(error);
    } else {
      return {
        name: 'Error name unknown.',
        message: 'Error message unknown.',
        stack: 'Error stack unknown.',
        digest: 'Error digest unknown.',
      } as ErrorReport;
    }
  }
}
