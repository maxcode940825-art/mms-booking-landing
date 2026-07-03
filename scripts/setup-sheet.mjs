import { google } from "googleapis";
import { readFileSync } from "fs";

const KEY_FILE = "C:\\Users\\노북\\Downloads\\mms-booking-497507-d690bffbb929.json";
const SHARE_WITH = "contact@movingmemories.kr";

const credentials = JSON.parse(readFileSync(KEY_FILE, "utf8"));

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ],
});

const sheets = google.sheets({ version: "v4", auth });
const drive = google.drive({ version: "v3", auth });

async function main() {
  // 1. Create new spreadsheet owned by service account
  console.log("Creating spreadsheet...");
  const createResp = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: "MMS 쿠폰 알림 신청목록" },
      sheets: [{ properties: { title: "신청목록" } }],
    },
  });

  const spreadsheetId = createResp.data.spreadsheetId;
  console.log("Spreadsheet ID:", spreadsheetId);

  // 2. Add headers
  console.log("Adding headers...");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "신청목록!A1:L1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        ["신청일시", "성함", "휴대전화", "행사일", "행사종류", "마케팅동의",
          "2달전_발송", "1달전_발송", "3주전_발송", "2주전_발송", "1주전_발송", "비고"],
      ],
    },
  });

  // 3. Share with the Google account owner
  console.log(`Sharing with ${SHARE_WITH}...`);
  await drive.permissions.create({
    fileId: spreadsheetId,
    requestBody: {
      role: "writer",
      type: "user",
      emailAddress: SHARE_WITH,
    },
    sendNotificationEmail: false,
  });

  console.log("\n✅ Done!");
  console.log("Spreadsheet ID:", spreadsheetId);
  console.log("URL: https://docs.google.com/spreadsheets/d/" + spreadsheetId);
}

main().catch(console.error);
