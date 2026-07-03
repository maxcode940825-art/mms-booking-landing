import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 이 Vercel 함수가 외부 서비스를 호출할 때 쓰는 아웃바운드 IP
  let outboundIp = "확인불가";
  try {
    const r = await fetch("https://api.ipify.org?format=json", {
      signal: AbortSignal.timeout(5000),
    });
    const j = (await r.json()) as { ip: string };
    outboundIp = j.ip;
  } catch {}

  // 이 엔드포인트를 호출한 클라이언트 IP (GAS 등이 호출 시 → GAS의 실제 IP)
  const callerIp =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "확인불가";

  return NextResponse.json({ outboundIp, callerIp });
}
