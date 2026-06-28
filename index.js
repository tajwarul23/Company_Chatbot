import dotenv from "dotenv";
import { indexTheDocument } from "./prepare.js";
dotenv.config();
const code = process.env.CODE;
console.log(code);
const filePath = "./dummy_company_policy.pdf"
await indexTheDocument(filePath)


