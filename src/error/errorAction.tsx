"use server";

import { ErrorReport } from "./types";

export default async function errorAction(report: ErrorReport) {
  try {
    return "";
  } catch (error) {
    return "";
  }
}
