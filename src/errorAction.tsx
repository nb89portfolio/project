"use server";

import { ErrorReport } from "./error";

export default async function errorAction(report: ErrorReport) {
  try {
    return "";
  } catch (error) {
    return "";
  }
}
