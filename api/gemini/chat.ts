import { handleChat } from "../../server/geminiHandler.js";

export default async function handler(req: any, res: any) {
  return handleChat(req, res);
}
