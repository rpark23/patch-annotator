import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public/patches");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".jpg"));
  return new Response(JSON.stringify(files), { status: 200 });
}
