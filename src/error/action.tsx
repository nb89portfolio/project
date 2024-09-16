'use server';

import prismaClient from '@/prisma/client';
import { ErrorReport } from './provider';
import handleServerError from './server';

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
