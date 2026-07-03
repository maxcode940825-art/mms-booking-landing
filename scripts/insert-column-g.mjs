import { google } from "googleapis";
import { readFileSync } from "fs";

const KEY_FILE = "C:\\Users\\노북\\Downloads\\mms-booking-497507-d690bffbb929.json";
const SPREADSHEET_ID = "1mAamcQs6VLlFquVU-oNhdCLoDEyPQBxOVP4evPoO8Zc";
const SHEET_NAME = "신청목록";

const credentials = JSON.parse(readFileSync(KEY_FILE, "utf8"));
const auth = new google.auth.GoogleAuth({
  credentials: { client_email: credentials.client_email, private_key: credentials.private_key },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
const sheetId = meta.data.sheets[0].properties.sheetId;

// Insert a blank column at index 6 (column G, 0-based)
await sheets.spreadsheets.batchUpdate({
  spreadsheetId: SPREADSHEET_ID,
  requestBody: {
    requests: [{
      insertDimension: {
        range: { sheetId, dimension: "COLUMNS", startIndex: 6, endIndex: 7 },
        inheritFromBefore: false,
      },
    }],
  },
});

// Write the header for the new column G
await sheets.spreadsheets.values.update({
  spreadsheetId: SPREADSHEET_ID,
  range: `${SHEET_NAME}!G1`,
  valueInputOption: "USER_ENTERED",
  requestBody: { values: [["즉시확인_발송"]] },
});

console.log("✅ Column G (즉시확인_발송) inserted. Sheet now has 13 columns (A-M).");
