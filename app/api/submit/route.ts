import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

async function sendAlimtalk(name: string, phone: string, eventDate: string) {
  const d = new Date(eventDate);
  const eventDateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  const message =
    `${name}님, 신청해주셔서 감사해요 :)\n\n` +
    `  ${eventDateStr}, 그 날이 후회 없는 최고의 하루가 되도록 미리미리 챙겨드릴게요. \n\n` +
    `언제든 궁금한 거 있으시면 편하게 연락 주세요.`;

  const apiKey = process.env.ALIGO_API_KEY;
  const userId = process.env.ALIGO_USER_ID;
  const senderKey = process.env.ALIGO_SENDER_KEY;
  const tplCode = process.env.ALIGO_TPL_CODE;
  const sender = process.env.ALIGO_SENDER;

  if (!apiKey || !userId || !senderKey || !tplCode || !sender) {
    throw new Error("Aligo 환경변수 미설정");
  }

  const failoverMessage =
    `[무빙메모리즈] ${name}님, 신청해주셔서 감사해요 :)\n\n` +
    `${eventDateStr}, 그 날이 후회 없는 최고의 하루가 되도록 미리미리 챙겨드릴게요.\n\n` +
    `언제든 궁금한 거 있으시면 편하게 연락 주세요.`;

  const button1 = JSON.stringify({
    button: [
      {
        name: "상담 문의하기",
        linkType: "WL",
        linkMo: "http://pf.kakao.com/_McxoPn/chat",
        linkPc: "http://pf.kakao.com/_McxoPn/chat",
      },
      {
        name: "상품 둘러보기",
        linkType: "WL",
        linkMo: "https://smartstore.naver.com/moving_memories/category/ALL?cp=1",
        linkPc: "https://smartstore.naver.com/moving_memories/category/ALL?cp=1https://smartstore.naver.com/moving_memories/category/ALL?cp=1",
      },
    ],
  });

  const params = new URLSearchParams({
    apikey: apiKey,
    userid: userId,
    senderkey: senderKey,
    tpl_code: tplCode,
    sender,
    receiver_1: phone.replace(/-/g, ""),
    recvname_1: name,
    subject_1: `${name}님 쿠폰 알림 신청 확인`,
    message_1: message,
    button_1: button1,
    failover: "Y",
    fsubject_1: `${name}님 쿠폰 알림 신청 확인`,
    fmessage_1: failoverMessage,
  });

  const proxyUrl = process.env.PROXY_URL || "http://199.192.115.29:3001";
  const proxySecret = process.env.PROXY_SECRET || "";
  const res = await fetch(`${proxyUrl}/alimtalk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-proxy-secret": proxySecret,
    },
    body: params.toString(),
  });

  const json = await res.json();
  return { code: json.code === "1" ? 0 : parseInt(json.code), ...json };
}

/* 폼은 동일 출처(form.movingmemories.kr)에서 제출되며, 그 외 허용 출처를 나열한다.
   아임웹 도메인 확정 시 여기에 추가 (예: https://movingmemories.co.kr) */
const ALLOWED_ORIGINS = [
  "https://form.movingmemories.kr",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

type SubmitBody = {
  name: string;
  phone: string;
  eventDate: string;
  eventType: string;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

function isValidPhone(phone: string): boolean {
  return /^010-\d{4}-\d{4}$/.test(phone);
}

function isValidDate(date: string): boolean {
  const d = new Date(date);
  return !isNaN(d.getTime()) && d > new Date();
}

function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = "신청목록";

async function findExistingRow(
  sheets: ReturnType<typeof getSheets>,
  phone: string,
  eventDate: string
): Promise<number | null> {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:D`,
  });
  const rows = res.data.values ?? [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][2] === phone && rows[i][3] === eventDate) {
      return i + 1;
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const body: SubmitBody = await req.json();
    const { name, phone, eventDate, eventType, agreePrivacy, agreeMarketing } = body;

    if (!name?.trim() || name.trim().length < 2)
      return NextResponse.json({ error: "성함을 입력해주세요." }, { status: 400, headers });
    if (!isValidPhone(phone))
      return NextResponse.json({ error: "올바른 휴대전화 번호를 입력해주세요." }, { status: 400, headers });
    if (!isValidDate(eventDate))
      return NextResponse.json({ error: "올바른 행사일을 입력해주세요." }, { status: 400, headers });
    if (!eventType)
      return NextResponse.json({ error: "행사 종류를 선택해주세요." }, { status: 400, headers });
    if (!agreePrivacy)
      return NextResponse.json({ error: "개인정보 수집·이용에 동의해주세요." }, { status: 400, headers });

    const sheets = getSheets();
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const marketingYN = agreeMarketing ? "Y" : "N";

    const existingRow = await findExistingRow(sheets, phone, eventDate);

    // 알림톡 발송 (Sheets 쓰기 전에 먼저 시도)
    let alimtalkStatus = "";
    try {
      const alimtalkResult = await sendAlimtalk(name, phone, eventDate);
      alimtalkStatus = alimtalkResult?.code === 0 ? "Y" : "N";
    } catch (e) {
      console.error("알림톡 오류:", e);
      alimtalkStatus = "N";
    }

    // 시트 스키마(SSOT): A신청일시 B성함 C휴대전화 D행사일 E행사종류
    //   F마케팅동의 G즉시확인_발송(알림톡) H2달전 I1달전 J3주전 K2주전 L1주전
    if (existingRow) {
      await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          valueInputOption: "USER_ENTERED",
          data: [
            { range: `${SHEET_NAME}!A${existingRow}:B${existingRow}`, values: [[now, name]] },
            { range: `${SHEET_NAME}!E${existingRow}:G${existingRow}`, values: [[eventType, marketingYN, alimtalkStatus]] },
          ],
        },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A:L`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [[now, name, phone, eventDate, eventType, marketingYN, alimtalkStatus, "", "", "", "", ""]],
        },
      });
    }

    return NextResponse.json(
      { success: true, duplicate: !!existingRow, alimtalkSent: alimtalkStatus === "Y" },
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Google Sheets 오류:", err);
    return NextResponse.json({ error: "서버 오류가 발생했어요." }, { status: 500, headers });
  }
}
