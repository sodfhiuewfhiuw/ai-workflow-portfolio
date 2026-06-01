import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUp,
  Bot,
  ClipboardCheck,
  FileText,
  Layers3,
  MessageSquareText,
  Route,
  Sparkles,
} from "lucide-react";
import "./styles.css";

const capabilitySlides = [
  {
    title: "流程拆解",
    label: "Process Mapping",
    description: "把行政、客服、文件處理與資料查詢拆成 AI 可以協助執行的步驟。",
    plain: "白話：先把工作拆清楚，AI 才知道該幫哪一段。",
    accent: "#b9ffe6",
    icon: Route,
    image:
      "linear-gradient(135deg, rgba(6,18,22,.32), rgba(15,54,45,.56)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80')",
  },
  {
    title: "知識庫整理",
    label: "Knowledge Base",
    description: "整理合約、FAQ、SOP、說明文件，轉成 AI 可以查詢與回覆的內容。",
    plain: "白話：把散落的文件整理成團隊問得到、用得到的資料庫。",
    accent: "#9edcff",
    icon: FileText,
    image:
      "linear-gradient(135deg, rgba(7,17,31,.32), rgba(29,72,106,.56)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80')",
  },
  {
    title: "Prompt 規則",
    label: "Prompt Rules",
    description: "設計角色設定、回覆限制、審核條件與操作指引，降低錯誤回覆。",
    plain: "白話：不是只叫 AI 回答，而是先寫好它能做什麼、不能亂說什麼。",
    accent: "#ffd88a",
    icon: MessageSquareText,
    image:
      "linear-gradient(135deg, rgba(29,19,7,.32), rgba(90,58,22,.56)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80')",
  },
  {
    title: "SOP 交付",
    label: "Delivery Docs",
    description: "產出操作手冊、測試計畫、客服 Q&A、教育訓練文件與問題排除文件。",
    plain: "白話：做完不是只留一個工具，而是讓別人也能照著用。",
    accent: "#ffb391",
    icon: ClipboardCheck,
    image:
      "linear-gradient(135deg, rgba(30,12,9,.32), rgba(96,42,24,.56)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80')",
  },
  {
    title: "AI 工具導入",
    label: "Tool Integration",
    description: "評估 ChatGPT、Codex、AI Agent、開源工具與自動化流程，組成可落地方案。",
    plain: "白話：幫公司選工具、串流程、測試風險，讓 AI 進到日常工作。",
    accent: "#d5c8ff",
    icon: Bot,
    image:
      "linear-gradient(135deg, rgba(18,12,34,.32), rgba(51,37,104,.56)), url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80')",
  },
];

const workItems = [
  {
    title: "MorPage + Codex 後台操作助理",
    problem: "後台操作、教學與檢查流程容易依賴人工記憶。",
    action: "把操作步驟、測試規則與安全限制整理成 AI 可協助的流程。",
    output: "導入文件、操作規則、檢查清單、教學輔助流程。",
    plain: "白話：讓不熟系統的人，也能照著 AI 提示完成後台作業。",
  },
  {
    title: "Hermes AI 業務行政助理 MVP",
    problem: "業務行政、名單查詢、Gmail 與文件整理分散在不同工具。",
    action: "規劃 Telegram 入口、任務選單、Gmail 操作、名單查詢與問題排除流程。",
    output: "MVP 部署包、使用說明、客服文件、問題排除手冊。",
    plain: "白話：把業務助理常做的重複工作，整理成可以交付給客戶使用的 AI 助理。",
  },
  {
    title: "短影音 / 名單 / 客服流程規劃",
    problem: "內容製作、名單整理與回覆規則常常靠人臨場判斷。",
    action: "拆解腳本、審核、名單去重、分級、客服回覆與人工確認節點。",
    output: "流程圖、提示詞規則、審核項目、交付文件。",
    plain: "白話：把看起來很雜的行銷與客服工作，整理成可重複執行的流程。",
  },
];

const abilityList = [
  "AI 行政助理流程設計",
  "文件摘要與知識庫建置",
  "客服 Q&A 規則整理",
  "內部作業 SOP 製作",
  "AI 工具測試與導入",
  "低程式碼與自動化流程規劃",
];

function shortestStep(current, target, total) {
  const forward = (target - current + total) % total;
  const backward = (current - target + total) % total;
  return forward <= backward ? 1 : -1;
}

function App() {
  return (
    <div className="site">
      <Hero />
      <main className="page-content">
        <AbilitySection />
        <ProofSection />
        <RoleSection />
        <CtaSection />
      </main>
    </div>
  );
}

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const active = capabilitySlides[currentSlide];

  function moveToSlide(target) {
    if (isAnimating || target === currentSlide) return;
    setIsAnimating(true);
    const step = shortestStep(currentSlide, target, capabilitySlides.length);
    let current = currentSlide;

    const tick = () => {
      current = (current + step + capabilitySlides.length) % capabilitySlides.length;
      setCurrentSlide(current);
      if (current !== target) {
        window.setTimeout(tick, 240);
      } else {
        window.setTimeout(() => setIsAnimating(false), 120);
      }
    };

    tick();
  }

  const goNext = () => moveToSlide((currentSlide + 1) % capabilitySlides.length);
  const goPrev = () =>
    moveToSlide((currentSlide - 1 + capabilitySlides.length) % capabilitySlides.length);

  return (
    <section className="hero-area" style={{ "--active-bg": active.image, "--accent": active.accent }}>
      <div className="hero-shell">
        <div className="hero-bg" />

        <section className="hero-copy" aria-label="AI 落地能力介紹">
          <div className="role-line">AI 應用整合與自動化能力</div>
          <h1>AI 應用整合與工作流落地</h1>
          <p className="hero-subtitle">
            我協助企業把重複性行政、文件整理、客服回覆與內部流程，轉換成可執行的 AI 輔助流程。
          </p>
          <p className="plain-note">
            不是訓練模型，而是把 AI 變成團隊真的用得起來的工作方法。
          </p>

          <div className="active-capability">
            <span>{active.label}</span>
            <strong>{active.title}</strong>
            <p>{active.description}</p>
            <em>{active.plain}</em>
          </div>

          <div className="hero-buttons">
            <button onClick={goPrev} aria-label="上一個能力場景">
              <ArrowUp size={18} />
            </button>
            <button onClick={goNext} aria-label="下一個能力場景">
              <ArrowDown size={18} />
            </button>
          </div>
        </section>

        <section className="orbit" aria-label="AI 能力輪播">
          <svg className="orbit-line" viewBox="0 0 900 620" aria-hidden="true">
            <path d="M188 403 C276 210 552 74 724 190 C874 296 784 520 566 552 C386 577 266 508 188 403Z" />
          </svg>
          {capabilitySlides.map((slide, index) => {
            const relative = (index - currentSlide + capabilitySlides.length) % capabilitySlides.length;
            const positions = [
              { x: 45, y: 39, size: 232, opacity: 1, z: 8 },
              { x: 69, y: 17, size: 112, opacity: 0.95, z: 6 },
              { x: 90, y: 46, size: 76, opacity: 0.78, z: 4 },
              { x: 54, y: 73, size: 118, opacity: 0.88, z: 5 },
              { x: 25, y: 57, size: 80, opacity: 0.64, z: 3 },
            ];
            const Icon = slide.icon;
            const position = positions[relative];

            return (
              <button
                key={slide.title}
                className={`orbit-item ${index === currentSlide ? "current" : ""}`}
                style={{
                  "--thumb": slide.image,
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  width: `${position.size}px`,
                  height: `${position.size}px`,
                  opacity: position.opacity,
                  zIndex: position.z,
                }}
                onClick={() => moveToSlide(index)}
                aria-label={`切換到${slide.title}`}
              >
                <Icon size={index === currentSlide ? 42 : 24} />
              </button>
            );
          })}
        </section>
      </div>
    </section>
  );
}

function AbilitySection() {
  return (
    <section className="content-section ability-section">
      <div className="section-heading">
        <span>我能做什麼</span>
        <h2>把重複工作整理成 AI 可以幫忙跑的步驟。</h2>
        <p>
          我擅長從實際業務需求出發，拆解流程、設計 AI 使用情境、建立提示詞規則、規劃知識庫內容，最後交付團隊能照著使用的 SOP。
        </p>
        <em>白話：公司有一堆重複工作，我負責整理成 AI 可以協助的工作方法。</em>
      </div>
      <div className="ability-grid">
        {abilityList.map((item) => (
          <div className="ability-pill" key={item}>
            <Sparkles size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="content-section proof-section">
      <div className="section-heading compact">
        <span>實際作品證據</span>
        <h2>不是只會講 AI，而是做過可交付的流程包。</h2>
      </div>
      <div className="proof-grid">
        {workItems.map((work, index) => (
          <article className="proof-card" key={work.title}>
            <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
            <h3>{work.title}</h3>
            <dl>
              <div>
                <dt>問題</dt>
                <dd>{work.problem}</dd>
              </div>
              <div>
                <dt>我做的事</dt>
                <dd>{work.action}</dd>
              </div>
              <div>
                <dt>交付物</dt>
                <dd>{work.output}</dd>
              </div>
            </dl>
            <p>{work.plain}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleSection() {
  return (
    <section className="content-section role-section">
      <div>
        <span>角色定位</span>
        <h2>我的角色不是模型開發工程師，而是 AI 落地與流程整合者。</h2>
      </div>
      <div className="role-copy">
        <p>
          我不把自己包裝成訓練模型、調參或架深度學習環境的人。我的準確賣點是把公司現有流程整理成 AI 能理解、能執行、能交付、能被團隊複製使用的工作系統。
        </p>
        <p>
          白話：我負責讓 AI 真正進到工作裡，而不是停在「大家試用看看」。
        </p>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="content-section cta-section">
      <Layers3 size={30} />
      <p>適合職位</p>
      <h2>AI 應用整合助理 / AI 工作流設計 / AI 導入與自動化企劃</h2>
      <strong>我能幫公司把現有工作流程變成 AI 可輔助、可複製、可交付的系統。</strong>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
