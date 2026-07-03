"use client";

import { useState } from "react";

type FormData = {
  name: string;
  phone: string;
  eventDate: string;
  eventType: string;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

type Errors = Partial<Record<keyof FormData, string>>;

const EVENT_TYPES = [
  { value: "", label: "행사 종류를 선택해주세요" },
  { value: "TYPE1_프로포즈애니메이션", label: "① 프로포즈/식전 애니메이션 영상" },
  { value: "TYPE2_AI복원영상", label: "② 식전/식중 AI 복원 영상 (폭싹 속았수다 스타일)" },
  { value: "TYPE3_부모님감사영상", label: "③ 환갑·칠순·팔순 부모님 감사영상" },
];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export default function SignupForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    eventDate: "",
    eventType: "",
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "성함을 2자 이상 입력해주세요.";
    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length < 10)
      e.phone = "올바른 휴대전화 번호를 입력해주세요.";
    if (!form.eventDate)
      e.eventDate = "행사일을 선택해주세요.";
    if (!form.eventType)
      e.eventType = "행사 종류를 선택해주세요.";
    if (!form.agreePrivacy)
      e.agreePrivacy = "개인정보 수집·이용에 동의해주세요.";
    return e;
  }

  function handlePhone(v: string) {
    setForm((f) => ({ ...f, phone: formatPhone(v) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("success");
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});
  }

  if (status === "success") {
    return (
      <div className="card" style={{ padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="36" r="36" fill="#3182f6"/>
            <polyline points="20,37 31,48 52,26" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--grey-900)", marginBottom: 8 }}>
          신청이 완료됐어요!
        </h2>
        <p style={{ fontSize: 15, color: "var(--grey-600)", lineHeight: 1.6, marginBottom: 28 }}>
          <strong style={{ color: "var(--grey-900)" }}>{form.name}</strong>님,<br />
          행사 시점에 맞춰 순서대로 안내드릴게요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a
            href="https://smartstore.naver.com/moving_memories/category/ALL?cp=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            스마트스토어 구경하기
          </a>
          <a
            href="http://pf.kakao.com/_McxoPn/chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 56,
              background: "#FEE500",
              color: "#191919",
              fontSize: 17,
              fontWeight: 600,
              border: "none",
              borderRadius: 16,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            카카오톡 상담 신청
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* 성함 */}
        <div>
          <label className="field-label" htmlFor="name">성함</label>
          <input
            id="name"
            className={`input-box${errors.name ? " error" : ""}`}
            type="text"
            placeholder="홍길동"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            autoComplete="name"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        {/* 휴대전화 */}
        <div>
          <label className="field-label" htmlFor="phone">휴대전화 번호</label>
          <input
            id="phone"
            className={`input-box${errors.phone ? " error" : ""}`}
            type="tel"
            placeholder="010-0000-0000"
            value={form.phone}
            onChange={(e) => handlePhone(e.target.value)}
            inputMode="numeric"
            autoComplete="tel"
          />
          {errors.phone && <p className="field-error">{errors.phone}</p>}
        </div>

        {/* 행사일 */}
        <div>
          <label className="field-label" htmlFor="eventDate">행사일 (영상 사용일)</label>
          <input
            id="eventDate"
            className={`input-box${errors.eventDate ? " error" : ""}`}
            type="date"
            min={getMinDate()}
            value={form.eventDate}
            onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
          />
          {errors.eventDate && <p className="field-error">{errors.eventDate}</p>}
        </div>

        {/* 행사 종류 */}
        <div>
          <label className="field-label" htmlFor="eventType">행사 종류</label>
          <select
            id="eventType"
            className={`select-box${errors.eventType ? " error" : ""}`}
            value={form.eventType}
            onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value} disabled={t.value === ""}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.eventType && <p className="field-error">{errors.eventType}</p>}
        </div>

        {/* 구분선 */}
        <div style={{ borderTop: "1px solid var(--grey-200)", margin: "4px 0" }} />

        {/* 개인정보 동의 (필수) */}
        <div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.agreePrivacy}
              onChange={(e) => setForm((f) => ({ ...f, agreePrivacy: e.target.checked }))}
            />
            <span style={{ fontSize: 14, color: "var(--grey-700)", lineHeight: 1.5 }}>
              <strong>[필수]</strong> 개인정보 수집·이용 동의
              <span style={{ display: "block", fontSize: 12, color: "var(--grey-500)", marginTop: 2 }}>
                성함·휴대전화·행사일을 알림 발송 목적으로 수집합니다.
              </span>
            </span>
          </label>
          {errors.agreePrivacy && <p className="field-error" style={{ marginTop: 6 }}>{errors.agreePrivacy}</p>}
        </div>

        {/* 마케팅 동의 (선택) */}
        <div>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={form.agreeMarketing}
              onChange={(e) => setForm((f) => ({ ...f, agreeMarketing: e.target.checked }))}
            />
            <span style={{ fontSize: 14, color: "var(--grey-700)", lineHeight: 1.5 }}>
              <strong>[선택]</strong> 할인 쿠폰·혜택 문자 수신 동의
              <span style={{ display: "block", fontSize: 12, color: "var(--grey-500)", marginTop: 2 }}>
                동의하지 않으시면 할인 쿠폰 문자를 받으실 수 없어요.
              </span>
            </span>
          </label>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="btn-primary"
          style={{ marginTop: 4 }}
        >
          제작 알림 및 쿠폰 신청하기
        </button>

        <p style={{ fontSize: 12, color: "var(--grey-500)", textAlign: "center", lineHeight: 1.5 }}>
          신청 내용은 언제든 카카오톡 채널로 변경 요청 가능해요.{" "}
          <a href="/privacy" style={{ color: "var(--toss-blue)", textDecoration: "underline" }}>
            개인정보 처리방침
          </a>
        </p>
      </div>
    </form>
  );
}
