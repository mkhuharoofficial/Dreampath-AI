import { handleSuggest } from "../../server/geminiHandler.js";

export default async function handler(req: any, res: any) {
  return handleSuggest(req, res);
}
