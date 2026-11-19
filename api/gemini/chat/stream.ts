import { handleChatStream } from "../../../server/geminiHandler.js";

export default async function handler(req: any, res: any) {
  return handleChatStream(req, res);
}
