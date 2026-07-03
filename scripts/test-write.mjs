import { google } from "googleapis";
import { readFileSync } from "fs";

const KEY_FILE = "C:\\Users\\노북\\Downloads\\mms-booking-497507-d690bffbb929.json";
const SPREADSHEET_ID = "1mAamcQs6VLlFquVU-oNhdCLoDEyPQBxOVP4evPoO8Zc";

const credentials = JSON.parse(readFileSync(KEY_FILE, "utf8"));
const auth = new google.auth.GoogleAuth({
  credentials: { client_email: credentials.client_email, private_key: credentials.private_key },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

console.log("Reading existing rows...");
const readResp = await sheets.spreadsheets.values.get({
  spreadsheetId: SPREADSHEET_ID,
  range: "신청목록!A:D",
});
console.log("Existing rows:", readResp.data.values?.length ?? 0);

console.log("Appending test row...");
const appendResp = await sheets.spreadsheets.values.append({
  spreadsheetId: SPREADSHEET_ID,
  range: "신청목록!A:L",
  valueInputOption: "USER_ENTERED",
  insertDataOption: "INSERT_ROWS",
  requestBody: {
    values: [[now, "스크립트테스트", "010-0000-1111", "2026-11-10", "animation", "Y", "", "", "", "", "", ""]],
  },
});
console.log("✅ Appended to:", appendResp.data.updates?.updatedRange);
