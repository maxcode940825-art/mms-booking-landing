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

// Get the spreadsheet to find the sheet ID
const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
const sheetId = meta.data.sheets[0].properties.sheetId;

// Delete rows 2-4 (test rows), keep only the header row
await sheets.spreadsheets.batchUpdate({
  spreadsheetId: SPREADSHEET_ID,
  requestBody: {
    requests: [{
      deleteDimension: {
        range: {
          sheetId,
          dimension: "ROWS",
          startIndex: 1, // row index 1 = row 2 (0-based)
          endIndex: 4,   // exclusive, so deletes rows 2,3,4
        },
      },
    }],
  },
});

console.log("✅ Test rows deleted. Sheet now has only the header row.");
