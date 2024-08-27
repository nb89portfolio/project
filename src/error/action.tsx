import { ErrorReport } from "./types";

export default async function reportError(error: ErrorReport) {
  try {
    return "success";
  } catch (error) {
    return "failure";
  } finally {
    return "what";
  }
}
