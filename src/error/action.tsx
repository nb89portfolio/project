'use server';

import prisma from '@/prisma/instance';

import { ErrorReport } from './context';
import { defineErrorReport } from './handler';
import { ErrorRecords } from '@prisma/client';

export async function reportError(report: ErrorReport, username: string) {
  try {
    const user = await prisma.users.findFirst({ where: { username } });

    const hasUser = user !== null;

    if (!hasUser) {
      return 'Error could not be reported due to non-registered user.';
    }

    const record = await prisma.errorRecords.findFirst({
      where: {
        ...report,
      },
    });

    const hasRecord = record !== null;

    if (!hasRecord) {
      await prisma.errorRecords.create({
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

      return 'Error record and instance has been reported.';
    }

    const instance = await prisma.errorInstances.findFirst({
      where: {
        errorRecordsId: (record as ErrorRecords).id,
        usersId: user.id,
      },
    });

    const hasInstance = instance !== null;

    if (!hasInstance) {
      await prisma.errorInstances.create({
        data: {
          intial: new Date(),
          updated: new Date(),
          errorRecordsId: record.id,
          usersId: user.id,
        },
      });

      return 'Error instance has been created.';
    }

    await prisma.errorInstances.update({
      where: {
        id: instance.id,
      },
      data: {
        updated: new Date(),
      },
    });

    return 'Error instance has been updated.';
  } catch (error) {
    return defineErrorReport(error);
  }
}
