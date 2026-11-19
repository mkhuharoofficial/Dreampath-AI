import { handleSendAssessmentEmail } from "../server/geminiHandler.js";

export default async function handler(req: any, res: any) {
  return handleSendAssessmentEmail(req, res);
}
