import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body: SubmitBody = await req.json();
    const { name, phone, eventDate, eventType, agreePrivacy } = body;

    if (!name?.trim() || name.trim().length < 2)
      return NextResponse.json({ error: "성함을 입력해주세요." }, { status: 400 });
    if (!isValidPhone(phone))
      return NextResponse.json({ error: "올바른 휴대전화 번호를 입력해주세요." }, { status: 400 });
    if (!isValidDate(eventDate))
      return NextResponse.json({ error: "올바른 행사일을 입력해주세요." }, { status: 400 });
    if (!eventType)
      return NextResponse.json({ error: "행사 종류를 선택해주세요." }, { status: 400 });
    if (!agreePrivacy)
      return NextResponse.json({ error: "개인정보 수집·이용에 동의해주세요." }, { status: 400 });

    // TODO: Google Sheets 저장 연동
    // await saveToGoogleSheets(body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했어요." }, { status: 500 });
  }
}
