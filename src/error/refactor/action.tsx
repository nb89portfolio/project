'use server';

import { ErrorReport } from '../types';
import defineReport from '../define';

async function reportError(report: ErrorReport) {
  try {
    return 'success';
  } catch (error) {
    const isError = error instanceof Error;

    if (isError) {
      const report = defineReport(error);

      return report as ErrorReport;
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

export default reportError;
