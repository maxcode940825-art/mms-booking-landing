import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--grey-50)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 20px 60px",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* 로고 / 서비스명 */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: "var(--grey-500)", marginBottom: 6 }}>
            무빙메모리즈 Moving Memories
          </p>
          <h1 style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--grey-900)",
            lineHeight: 1.4,
            marginBottom: 8,
          }}>
            행사 전에 미리 받는<br />
            <span style={{ color: "var(--toss-blue)" }}>2만원 할인 쿠폰</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--grey-600)", lineHeight: 1.6 }}>
            행사일에 맞춰 할인 쿠폰을 자동으로 보내드려요.<br />
            사진 준비가 안 돼도 지금 신청할 수 있어요.
          </p>
        </div>

        {/* 신뢰 배지 */}
        <div style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 24,
        }}>
          <span className="badge">🏆 네이버 감사영상 1위</span>
          <span className="badge">⭐ 평점 4.98</span>
          <span className="badge">⚡ 제작기간 일주일</span>
        </div>

        {/* 후기 인용 */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 16,
          borderLeft: "3px solid var(--toss-blue)",
          boxShadow: "var(--shadow-1)",
        }}>
          <p style={{ fontSize: 14, color: "var(--grey-700)", lineHeight: 1.6, margin: 0 }}>
            &ldquo;영상이 나오자마자 어머니가 우셨어요. 아버지가 평생 처음 눈물 흘리시는 걸 봤어요.&rdquo;
          </p>
          <p style={{ fontSize: 12, color: "var(--grey-500)", marginTop: 6, marginBottom: 0 }}>
            — 고희연 부모님 감사영상 고객
          </p>
        </div>

        {/* 신청 폼 */}
        <SignupForm />

        {/* 하단 안내 */}
        <div style={{
          marginTop: 24,
          padding: "16px",
          background: "var(--toss-blue-light)",
          borderRadius: 12,
          fontSize: 13,
          color: "var(--grey-700)",
          lineHeight: 1.7,
        }}>
          <strong style={{ color: "var(--toss-blue)" }}>💡 이런 분께 딱 맞아요</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
            <li>아직 사진 준비가 안 됐어요</li>
            <li>가격이 부담돼서 고민 중이에요</li>
            <li>다른 업체와 비교하고 있어요</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
