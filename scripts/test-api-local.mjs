import { readFileSync } from "fs";
import { google } from "googleapis";

// Load .env.local manually
const envContent = readFileSync(".env.local", "utf8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^(\w+)="(.+)"$/s);
  if (match) envVars[match[1]] = match[2];
}

const SHEET_ID = envVars.GOOGLE_SHEET_ID;
const SHEET_NAME = "신청목록";
const privateKey = envVars.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const email = envVars.GOOGLE_SERVICE_ACCOUNT_EMAIL;

console.log("SHEET_ID:", SHEET_ID);
console.log("Email:", email);
console.log("Key starts:", privateKey?.substring(0, 40));

const auth = new google.auth.GoogleAuth({
  credentials: { client_email: email, private_key: privateKey },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

// Simulate findExistingRow
const res = await sheets.spreadsheets.values.get({
  spreadsheetId: SHEET_ID,
  range: `${SHEET_NAME}!A:D`,
});
const rows = res.data.values ?? [];
console.log("Existing rows:", rows.length);

// Append
const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
const appendResp = await sheets.spreadsheets.values.append({
  spreadsheetId: SHEET_ID,
  range: `${SHEET_NAME}!A:L`,
  valueInputOption: "USER_ENTERED",
  insertDataOption: "INSERT_ROWS",
  requestBody: {
    values: [[now, "로컬테스트", "010-3333-2222", "2027-05-20", "animation", "Y", "", "", "", "", "", ""]],
  },
});
console.log("✅ Appended to:", appendResp.data.updates?.updatedRange);
