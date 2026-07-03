import { google } from "googleapis";
import { readFileSync } from "fs";

// .env.local 파싱 (따옴표/멀티라인 지원 최소 구현)
function loadEnv() {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const env = {};
  const re = /^([A-Z_]+)=("(?:[^"\\]|\\.)*"|.*)$/gm;
  let m;
  while ((m = re.exec(raw)) !== null) {
    let v = m[2];
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    env[m[1]] = v;
  }
  return env;
}

const env = loadEnv();
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const resp = await sheets.spreadsheets.values.get({
  spreadsheetId: env.GOOGLE_SHEET_ID,
  range: "신청목록!A1:L100",
  valueRenderOption: "FORMATTED_VALUE",
});
const rows = resp.data.values || [];
console.log(`Total rows: ${rows.length}`);
rows.forEach((row, i) => console.log(`Row ${i + 1}: [${row.map((c) => JSON.stringify(c)).join(", ")}]`));
