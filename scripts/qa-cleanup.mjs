import { google } from "googleapis";
import { readFileSync } from "fs";

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
const SPREADSHEET_ID = env.GOOGLE_SHEET_ID;

const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
const sheet = meta.data.sheets.find((s) => s.properties.title === "신청목록");
const sheetId = sheet.properties.sheetId;

const resp = await sheets.spreadsheets.values.get({
  spreadsheetId: SPREADSHEET_ID,
  range: "신청목록!A1:L100",
});
const rows = resp.data.values || [];
// QA 테스트 전화번호 행(0-based 인덱스) 수집
const targetPhone = process.argv[2] || "010-0000-0009";
const toDelete = [];
for (let i = 1; i < rows.length; i++) {
  if (rows[i][2] === targetPhone) toDelete.push(i);
}
if (toDelete.length === 0) {
  console.log("삭제할 QA 행 없음:", targetPhone);
  process.exit(0);
}
// 아래쪽부터 삭제(인덱스 밀림 방지)
toDelete.sort((a, b) => b - a);
const requests = toDelete.map((idx) => ({
  deleteDimension: {
    range: { sheetId, dimension: "ROWS", startIndex: idx, endIndex: idx + 1 },
  },
}));
await sheets.spreadsheets.batchUpdate({ spreadsheetId: SPREADSHEET_ID, requestBody: { requests } });
console.log(`✅ QA 테스트 행 ${toDelete.length}개 삭제 (${targetPhone})`);
