import SignupForm from "./components/SignupForm";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "var(--grey-50)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px 80px",
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: "var(--grey-500)", marginBottom: 10, letterSpacing: "0.04em" }}>
            무빙메모리즈 · 결혼식·가족행사 영상 전문
          </p>
          <h1 style={{
            fontSize: 26,
            fontWeight: 700,
            color: "var(--grey-900)",
            lineHeight: 1.45,
            marginBottom: 12,
          }}>
            지금 신청하면<br />
            행사 전에 <span style={{ color: "var(--toss-blue)" }}>2만원 할인 쿠폰</span>이<br />
            자동으로 와요
          </h1>
          <p style={{ fontSize: 15, color: "var(--grey-600)", lineHeight: 1.7 }}>
            사진이 아직 없어도 괜찮아요.<br />
            행사일만 알려주시면, 그에 맞춰 쿠폰을 보내드려요.
          </p>
        </div>

        {/* 신뢰 배지 */}
        <div style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 36,
        }}>
          <span className="badge">🏆 네이버 감사영상 1위</span>
          <span className="badge">⭐ 평점 4.98</span>
          <span className="badge">📦 제작 7일 완성</span>
        </div>

        {/* ── 서비스 소개 ──────────────────────────────── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--grey-800)",
            marginBottom: 12,
          }}>
            어떤 영상을 만드나요?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                num: "①",
                title: "프로포즈 · 식전 애니메이션 영상",
                desc: "꿈꾸던 그 애니메이션 스타일, 세상에 하나뿐인 영상",
                tag: "신규",
                tagColor: "var(--color-success)",
              },
              {
                num: "②",
                title: "식전 · 식중 AI 복원 영상",
                desc: "폭싹 속았수다 감성 — 오래된 사진을 고화질로 복원",
                tag: "네이버 1위",
                tagColor: "var(--toss-blue)",
              },
              {
                num: "③",
                title: "환갑 · 고희연 부모님 감사영상",
                desc: "평생의 순간을 담아 부모님께 드리는 선물",
                tag: "평점 4.98",
                tagColor: "var(--toss-blue)",
              },
            ].map((item) => (
              <div key={item.num} style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 18px",
                boxShadow: "var(--shadow-1)",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}>
                <span style={{
                  fontSize: 20,
                  lineHeight: 1,
                  minWidth: 28,
                  paddingTop: 2,
                }}>
                  {item.num}
                </span>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--grey-900)" }}>
                      {item.title}
                    </span>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: item.tagColor,
                      background: item.tagColor + "18",
                      borderRadius: 6,
                      padding: "2px 7px",
                      whiteSpace: "nowrap",
                    }}>
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--grey-500)", margin: 0, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 쿠폰 발송 프로세스 ───────────────────────── */}
        <section style={{
          background: "var(--toss-blue-light)",
          borderRadius: 16,
          padding: "20px 20px 16px",
          marginBottom: 32,
        }}>
          <h2 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--grey-800)",
            marginBottom: 4,
          }}>
            쿠폰은 이렇게 와요
          </h2>
          <p style={{ fontSize: 13, color: "var(--grey-600)", marginBottom: 16, lineHeight: 1.5 }}>
            행사일 기준으로 자동 발송 — 놓칠 걱정 없어요
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "신청 완료", sub: "지금" },
              { label: "2달 전 쿠폰 발송", sub: "D-60" },
              { label: "1달 전 쿠폰 발송", sub: "D-30" },
              { label: "3주 전 쿠폰 발송", sub: "D-21" },
              { label: "2주 전 쿠폰 발송", sub: "D-14" },
              { label: "1주 전 쿠폰 발송", sub: "D-7" },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: i === 0 ? "var(--toss-blue)" : "#fff",
                    border: `2px solid ${i === 0 ? "var(--toss-blue)" : "var(--grey-300)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    color: i === 0 ? "#fff" : "var(--grey-500)",
                  }}>
                    {i === 0 ? "✓" : i}
                  </div>
                  {i < 5 && (
                    <div style={{
                      width: 2,
                      height: 20,
                      background: "var(--grey-200)",
                      margin: "2px 0",
                    }} />
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", paddingBottom: i < 5 ? 22 : 0 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: i === 0 ? 700 : 500,
                    color: i === 0 ? "var(--toss-blue)" : "var(--grey-700)",
                  }}>
                    {step.label}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--grey-400)" }}>{step.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--grey-500)", marginTop: 12, marginBottom: 0, lineHeight: 1.5 }}>
            * 신청 시점이 행사일에 가까우면 지난 단계는 건너뛰고 남은 단계부터 발송돼요
          </p>
        </section>

        {/* ── 후기 ─────────────────────────────────────── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--grey-800)",
            marginBottom: 12,
          }}>
            고객 후기
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                text: "영상이 나오자마자 어머니가 우셨어요. 아버지가 평생 처음으로 눈물 흘리시는 걸 봤어요.",
                from: "고희연 부모님 감사영상 고객",
              },
              {
                text: "폭싹 속았수다 보고 바로 찾아봤는데, 진짜 그 느낌 그대로 나왔어요. 식장에서 반응이 너무 좋았어요.",
                from: "AI 복원 영상 고객",
              },
            ].map((review, i) => (
              <div key={i} style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 18px",
                borderLeft: "3px solid var(--toss-blue)",
                boxShadow: "var(--shadow-1)",
              }}>
                <p style={{ fontSize: 14, color: "var(--grey-700)", lineHeight: 1.6, margin: "0 0 6px" }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <p style={{ fontSize: 12, color: "var(--grey-400)", margin: 0 }}>
                  — {review.from}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 신청 폼 ──────────────────────────────────── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--grey-800)",
            marginBottom: 12,
          }}>
            쿠폰 알림 신청하기
          </h2>
          <SignupForm />
        </section>

        {/* ── 이런 분께 ────────────────────────────────── */}
        <div style={{
          padding: "16px 18px",
          background: "var(--grey-100)",
          borderRadius: 12,
          fontSize: 13,
          color: "var(--grey-600)",
          lineHeight: 1.7,
          marginBottom: 24,
        }}>
          <strong style={{ color: "var(--grey-800)" }}>이런 분께 딱 맞아요</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
            <li>사진이 아직 준비 안 됐어요</li>
            <li>가격이 부담돼서 고민 중이에요</li>
            <li>다른 업체와 비교하고 있어요</li>
          </ul>
        </div>

        {/* ── 하단 ─────────────────────────────────────── */}
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--grey-400)", lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 4px" }}>무빙메모리즈 | 사업자등록번호 준비 중</p>
          <p style={{ margin: 0 }}>
            <a href="/privacy" style={{ color: "var(--grey-500)", textDecoration: "underline" }}>
              개인정보 처리방침
            </a>
            {" · "}
            문의: 카카오톡 채널 &lsquo;무빙메모리즈&rsquo;
          </p>
        </div>

      </div>
    </main>
  );
}
