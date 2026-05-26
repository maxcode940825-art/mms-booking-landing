import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 무빙메모리즈",
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 32 }}>
    <h2 style={{
      fontSize: 16,
      fontWeight: 700,
      color: "var(--grey-800)",
      marginBottom: 12,
      paddingBottom: 8,
      borderBottom: "1px solid var(--grey-200)",
    }}>
      {title}
    </h2>
    <div style={{ fontSize: 14, color: "var(--grey-700)", lineHeight: 1.8 }}>
      {children}
    </div>
  </section>
);

export default function PrivacyPage() {
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

        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 14,
          color: "var(--grey-500)",
          textDecoration: "none",
          marginBottom: 24,
        }}>
          ← 신청 페이지로 돌아가기
        </Link>

        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          color: "var(--grey-900)",
          marginBottom: 6,
        }}>
          개인정보 처리방침
        </h1>
        <p style={{ fontSize: 13, color: "var(--grey-400)", marginBottom: 36 }}>
          시행일: 2026년 5월 26일
        </p>

        <Section title="1. 개인정보 수집 항목 및 목적">
          <p>무빙메모리즈(이하 &ldquo;서비스&rdquo;)는 쿠폰 알림 발송을 위해 아래 정보를 수집합니다.</p>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 12, fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--grey-100)" }}>
                <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid var(--grey-200)", fontWeight: 600 }}>항목</th>
                <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid var(--grey-200)", fontWeight: 600 }}>수집 목적</th>
                <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid var(--grey-200)", fontWeight: 600 }}>필수 여부</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["성함", "쿠폰 발송 시 수신자 확인", "필수"],
                ["휴대전화 번호", "알림톡·SMS 쿠폰 발송", "필수"],
                ["행사일", "발송 시점 계산", "필수"],
                ["행사 종류", "적합한 쿠폰 내용 구성", "필수"],
              ].map(([item, purpose, required]) => (
                <tr key={item}>
                  <td style={{ padding: "8px 12px", border: "1px solid var(--grey-200)" }}>{item}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid var(--grey-200)" }}>{purpose}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid var(--grey-200)" }}>{required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="2. 개인정보 보유 및 이용 기간">
          <p>수집한 개인정보는 <strong>행사일로부터 1년</strong>이 경과한 후 지체 없이 파기합니다.</p>
          <p style={{ marginTop: 8 }}>단, 관계 법령에 따라 보존이 필요한 경우에는 해당 법령이 정한 기간 동안 보관합니다.</p>
        </Section>

        <Section title="3. 개인정보 제3자 제공">
          <p>서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
          <p style={{ marginTop: 8 }}>
            단, 알림톡·SMS 발송을 위해 <strong>솔라피(Solapi)</strong>에 휴대전화 번호를 전달합니다.
            솔라피는 발송 목적 외 개인정보를 보관하거나 활용하지 않습니다.
          </p>
        </Section>

        <Section title="4. 개인정보 파기 방법">
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>전자 형태로 저장된 정보: 복구 불가능한 방법으로 영구 삭제</li>
            <li style={{ marginTop: 4 }}>종이 문서: 분쇄 또는 소각</li>
          </ul>
        </Section>

        <Section title="5. 이용자의 권리">
          <p>이용자는 언제든지 아래 권리를 행사할 수 있습니다.</p>
          <ul style={{ paddingLeft: 20, margin: "8px 0 0" }}>
            <li>개인정보 열람 요청</li>
            <li style={{ marginTop: 4 }}>개인정보 수정·삭제 요청</li>
            <li style={{ marginTop: 4 }}>개인정보 처리 정지 요청</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            요청은 카카오톡 채널 &lsquo;무빙메모리즈&rsquo; 또는 아래 이메일로 연락 주시면
            지체 없이 처리합니다.
          </p>
        </Section>

        <Section title="6. 개인정보 보호 책임자">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {[
                ["성명", "신현민"],
                ["이메일", "gusalsdp78@gmail.com"],
                ["문의 채널", "카카오톡 채널 '무빙메모리즈'"],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: "8px 12px", border: "1px solid var(--grey-200)", fontWeight: 600, background: "var(--grey-100)", width: 100 }}>{label}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid var(--grey-200)" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="7. 광고성 정보 수신 동의 철회">
          <p>
            할인 쿠폰·혜택 문자 수신에 동의하신 경우, 언제든지 동의를 철회할 수 있습니다.
            카카오톡 채널 &lsquo;무빙메모리즈&rsquo;로 수신 거부 의사를 전달하시거나,
            문자 수신 후 <strong>080 수신거부 번호</strong>로 전화하시면 즉시 처리됩니다.
          </p>
        </Section>

        <div style={{
          padding: "16px 18px",
          background: "var(--grey-100)",
          borderRadius: 12,
          fontSize: 13,
          color: "var(--grey-500)",
          lineHeight: 1.7,
        }}>
          본 방침은 2026년 5월 26일부터 시행되며, 내용 변경 시 서비스 내 공지를 통해 안내합니다.
        </div>

      </div>
    </main>
  );
}
