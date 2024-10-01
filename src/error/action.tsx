'use server';

import prisma from '@/prisma/instance';
import { ErrorInstances } from '@prisma/client';
import { ErrorReport } from './context';

export async function reportError(report: ErrorReport, username: string) {
  try {
    const foundUser = await prisma.users.findFirst({ where: { username } });

    const hasUser = foundUser !== null;

    const user = hasUser
      ? foundUser
      : await prisma.users.create({ data: { username } });

    const foundReport = await prisma.errorRecords.findFirst({
      where: { ...report },
    });

    const hasReport = foundReport !== null;

    if (hasReport) {
      const foundInstance = await prisma.errorInstances.findFirst({
        where: {
          errorRecordsId: foundReport.id,
          usersId: user.id,
        },
      });

      const hasUserInstance = foundInstance !== null;

      const instance = hasUserInstance
        ? foundInstance
        : await prisma.errorInstances.findFirst({
            where: {
              errorRecordsId: foundReport.id,
            },
          });

      const assetInstance = instance as ErrorInstances;

      if (hasUserInstance) {
        const updateInstance = await prisma.errorInstances.update({
          where: {
            id: foundInstance.id,
          },
          data: {
            updated: new Date(),
          },
        });

        return 'Updated error record, instance, and user.';
      } else {
        const connectInstance = await prisma.errorInstances.update({
          where: {
            id: assetInstance.id,
          },
          data: {
            updated: new Date(),
            Users: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        return 'Updated error record and instance, and connected user ';
      }
    } else {
      const createRecordInstance = await prisma.errorRecords.create({
        data: {
          ...report,
          errorInstances: {
            create: {
              intial: new Date(),
              updated: new Date(),
              Users: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });

      return 'Created error record and instance, and connected user.';
    }
  } catch (error) {
    const isError = error instanceof Error;

    if (isError) {
      const { name, message } = error;

      const isStackDefined = error.stack !== undefined;

      const stack = isStackDefined
        ? (error.stack as string)
        : 'Stack is not defined.';

      const digest = 'Digest does not exist';

      return { name, message, stack, digest } as ErrorReport;
    } else {
      return {
        name: 'Error name is unknown.',
        message: 'Error message is unknown.',
        stack: 'Error stack is unknown.',
        digest: 'Error name is unknown.',
      } as ErrorReport;
    }
  }
}
