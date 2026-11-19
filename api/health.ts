import { handleHealth } from "../server/geminiHandler.js";

export default async function handler(req: any, res: any) {
  return handleHealth(req, res);
}
