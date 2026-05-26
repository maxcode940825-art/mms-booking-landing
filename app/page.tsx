import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--grey-50)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "48px 20px 80px",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: "var(--grey-400)", marginBottom: 16, letterSpacing: "0.03em" }}>
            무빙메모리즈 · 결혼식·가족행사 영상 전문
          </p>
          <h1 style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--grey-900)",
            lineHeight: 1.4,
            marginBottom: 14,
          }}>
            일단 신청만 해두세요
          </h1>
          <p style={{ fontSize: 16, color: "var(--grey-600)", lineHeight: 1.75 }}>
            행사 준비, 때맞춰 먼저 알려드리고<br />
            주문할 땐 최고 할인가로 도와드려요.
          </p>
        </div>

        {/* ── 신뢰 배지 ────────────────────────────────── */}
        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 36,
        }}>
          <span className="badge">🏆 네이버 1위</span>
          <span className="badge">⭐ 평점 4.98</span>
          <span className="badge">📦 제작 7일 완성</span>
        </div>

        {/* ── 보조 링크 ────────────────────────────────── */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
        }}>
          <a
            href="https://smartstore.naver.com/moving_memories/category/ALL?cp=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 46,
              background: "#fff",
              border: "1px solid var(--grey-200)",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--grey-700)",
              textDecoration: "none",
            }}
          >
            스마트스토어 보기
          </a>
          <a
            href="http://pf.kakao.com/_McxoPn/chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 46,
              background: "#FEE500",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              color: "#191919",
              textDecoration: "none",
            }}
          >
            카카오톡 상담
          </a>
        </div>

        {/* ── 신청 폼 ──────────────────────────────────── */}
        <SignupForm />

        {/* ── 하단 ─────────────────────────────────────── */}
        <div style={{
          marginTop: 28,
          textAlign: "center",
          fontSize: 12,
          color: "var(--grey-400)",
          lineHeight: 1.8,
        }}>
          <a href="/privacy" style={{ color: "var(--grey-400)", textDecoration: "underline" }}>
            개인정보 처리방침
          </a>
          {" · "}문의: 카카오톡 채널 &lsquo;무빙메모리즈&rsquo;
        </div>

      </div>
    </main>
  );
}
