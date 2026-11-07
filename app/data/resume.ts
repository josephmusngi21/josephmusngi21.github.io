import fs from "fs";
import path from "path";

export const resumeHref = fs.existsSync(path.join(process.cwd(), "public", "resume.pdf")) ? "/resume.pdf" : null;
