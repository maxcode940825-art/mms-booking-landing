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

const resp = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
console.log("Title:", resp.data.properties.title);
console.log("Sheets:", resp.data.sheets.map(s => `"${s.properties.title}" (id:${s.properties.sheetId})`).join(", "));
