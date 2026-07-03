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

// 1. Rename "시트1" → "신청목록"
console.log("Renaming sheet tab...");
await sheets.spreadsheets.batchUpdate({
  spreadsheetId: SPREADSHEET_ID,
  requestBody: {
    requests: [{
      updateSheetProperties: {
        properties: { sheetId: 0, title: "신청목록" },
        fields: "title",
      },
    }],
  },
});
console.log("✅ Tab renamed to 신청목록");

// 2. Add headers
console.log("Adding headers...");
const resp = await sheets.spreadsheets.values.update({
  spreadsheetId: SPREADSHEET_ID,
  range: "신청목록!A1:L1",
  valueInputOption: "USER_ENTERED",
  requestBody: {
    values: [
      ["신청일시", "성함", "휴대전화", "행사일", "행사종류", "마케팅동의",
       "2달전_발송", "1달전_발송", "3주전_발송", "2주전_발송", "1주전_발송", "비고"],
    ],
  },
});
console.log("✅ Headers added:", resp.data.updatedRange, "—", resp.data.updatedCells, "cells");
