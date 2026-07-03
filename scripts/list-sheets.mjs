import { google } from "googleapis";
import { readFileSync } from "fs";

const KEY_FILE = "C:\\Users\\노북\\Downloads\\mms-booking-497507-d690bffbb929.json";

const credentials = JSON.parse(readFileSync(KEY_FILE, "utf8"));
const auth = new google.auth.GoogleAuth({
  credentials: { client_email: credentials.client_email, private_key: credentials.private_key },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly"
  ],
});
const drive = google.drive({ version: "v3", auth });

const resp = await drive.files.list({
  q: "mimeType='application/vnd.google-apps.spreadsheet'",
  fields: "files(id, name, modifiedTime)",
  orderBy: "modifiedTime desc",
});

console.log("Spreadsheets accessible to service account:");
(resp.data.files || []).forEach(f => {
  console.log(`  ID: ${f.id}  Name: "${f.name}"  Modified: ${f.modifiedTime}`);
});
