'use server';

import prismaClient from '@/prisma/client';
import { ErrorReport } from './provider';
import NextJSError from './class';

export async function handleServerError(error: unknown) {
  const isError = error instanceof Error;

  if (!isError) {
    const name = 'Error name is undeifned.';
    const message = 'Error message is undefined.';
    const stack = 'Error stack is undefined.';
    const digest = 'Error digest is undefined.';

    return { name, message, stack, digest } as ErrorReport;
  }

  const { name, message } = error;

  const hasStack = error.stack !== undefined;

  const stack = hasStack ? (error.stack as string) : 'Stack is undefined.';

  const assetError = error as NextJSError;

  const hasDigest = assetError.digest !== undefined;

  const digest = hasDigest
    ? (assetError.digest as string)
    : 'Digest is undefined';

  return { name, message, stack, digest } as ErrorReport;
}

export default async function reportErrorRecord(
  report: ErrorReport,
  username: string
) {
  try {
    const record = await prismaClient.errorRecord.findFirst({
      where: { ...report },
    });

    const hasRecord = record !== null;

    const user = await prismaClient.user.findFirst({ where: { username } });

    const hasUid = user !== null;

    const uid = hasUid ? user.id : 0;

    if (hasRecord) {
      const instance = await prismaClient.errorInstances.findFirst({
        where: { errorRecordId: record.id, userId: uid },
      });

      const hasInstance = instance !== null;

      if (hasInstance) {
        const updatedInstance = await prismaClient.errorInstances.update({
          where: {
            id: instance.id,
          },
          data: {
            updated: new Date(),
          },
        });

        return { data: 'Error instance is updated.' };
      } else {
        const createdInstance = await prismaClient.errorInstances.create({
          data: {
            errorRecordId: record.id,
            userId: uid,
            created: new Date(),
            updated: new Date(),
          },
        });

        return { data: 'Error instance created.' };
      }
    } else {
      const createdReport = await prismaClient.errorRecord.create({
        data: { ...report },
      });

      const createdInstance = await prismaClient.errorInstances.create({
        data: {
          errorRecordId: createdReport.id,
          userId: uid,
          created: new Date(),
          updated: new Date(),
        },
      });

      return { data: 'Error record and instance is created.' };
    }
  } catch (error) {
    const data = await handleServerError(error);

    return { data };
  }
}
