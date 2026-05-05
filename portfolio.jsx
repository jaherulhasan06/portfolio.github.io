import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, Star, Menu, X, Code2,
  Trophy, Award, Zap, BookOpen, Coffee
} from "lucide-react";

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════

const NAV = ["About", "Skills", "Projects", "Experience", "Achievements", "Contact"];
const TYPING = [
  "Full Stack Developer",
  "AI Enthusiast",
  "B.Tech CS Student",
  "Problem Solver",
  "Open Source Contributor",
];

const SKILLS = {
  Frontend: [
    { n: "React.js", v: 88 }, { n: "Next.js", v: 82 }, { n: "HTML / CSS", v: 93 },
    { n: "JavaScript", v: 87 }, { n: "Tailwind CSS", v: 85 }, { n: "TypeScript", v: 75 },
  ],
  Backend: [
    { n: "Node.js", v: 80 }, { n: "Express.js", v: 78 }, { n: "Python", v: 86 },
    { n: "FastAPI", v: 72 }, { n: "REST APIs", v: 84 },
  ],
  Database: [
    { n: "MySQL", v: 81 }, { n: "MongoDB", v: 76 },
    { n: "PostgreSQL", v: 70 }, { n: "Firebase", v: 74 },
  ],
  Tools: [
    { n: "Git / GitHub", v: 90 }, { n: "Docker", v: 65 },
    { n: "Linux", v: 79 }, { n: "VS Code", v: 94 }, { n: "Postman", v: 83 },
  ],
};

const PROJECTS = [
  {
    title: "Online Examination System",
    desc: "A full-featured platform for secure online exams with real-time monitoring, auto-grading engine, and analytics dashboard. Multi-role user system — admin, teacher, and student.",
    tech: ["React", "Node.js", "MySQL", "Express.js"],
    accent: "#00f5ff", emoji: "📝", github: "#", demo: "#",
  },
  {
    title: "AI Chatbot",
    desc: "Conversational AI with NLP-driven, context-aware multi-turn dialogue, sentiment analysis, and a real-time chat UI powered by large language models.",
    tech: ["Python", "FastAPI", "OpenAI API", "React"],
    accent: "#8b5cf6", emoji: "🤖", github: "#", demo: "#",
  },
  {
    title: "Tic-Tac-Toe AI",
    desc: "Unbeatable AI opponent using Minimax with alpha-beta pruning. Multiple difficulty levels, smooth board animations, and persistent score tracking.",
    tech: ["Python", "Pygame", "Minimax"],
    accent: "#39ff14", emoji: "🎮", github: "#", demo: "#",
  },
  {
    title: "Recommendation System",
    desc: "ML-powered engine combining collaborative filtering and content-based methods to generate personalised product suggestions from user behaviour data.",
    tech: ["Python", "Scikit-learn", "Pandas", "Flask"],
    accent: "#ff006e", emoji: "⭐", github: "#", demo: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer Intern",
    company: "CodSoft",
    period: "Jun 2024 – Aug 2024",
    type: "Internship",
    color: "#00f5ff",
    points: [
      "Built responsive web applications using React.js and Node.js.",
      "Developed RESTful APIs and integrated MySQL databases.",
      "Collaborated in an Agile team environment with daily standups.",
      "Optimised app performance by 30% through code refactoring.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GitHub Community",
    period: "2023 – Present",
    type: "Volunteer",
    color: "#8b5cf6",
    points: [
      "Contributed bug fixes and features to 5+ open-source repos.",
      "Reviewed pull requests and maintained project documentation.",
      "Mentored peers in Git workflows and best practices.",
    ],
  },
];

const ACHIEVEMENTS = [
  { emoji: "🏆", title: "Hackathon Winner", sub: "1st Place — TechFest 2024" },
  { emoji: "📜", title: "Certifications", sub: "AWS · Google · Meta" },
  { emoji: "🌟", title: "Open Source", sub: "20+ GitHub contributions" },
  { emoji: "🎓", title: "Top Performer", sub: "Academic top 5% in CS" },
  { emoji: "💡", title: "Innovation Award", sub: "Best Project — College Fest" },
  { emoji: "🤝", title: "CodSoft Intern", sub: "Full Stack Development" },
];

// ═══════════════════════════════════════════════
// GLOBAL CSS
// ═══════════════════════════════════════════════

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #050510; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(#00f5ff, #8b5cf6); border-radius: 4px; }

  @keyframes flt { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }
  @keyframes rot  { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
  @keyframes rotR { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
  @keyframes up   { from { opacity:0; transform: translateY(50px); } to { opacity:1; transform: translateY(0); } }
  @keyframes blnk { 0%,100% { opacity:1; } 50% { opacity:0; } }
  @keyframes lbar { 0% { width:0%; } 100% { width:100%; } }
  @keyframes lfade { 0%,72% { opacity:1; } 100% { opacity:0; pointer-events:none; } }
  @keyframes cyGlow { 0%,100% { text-shadow: 0 0 24px rgba(0,245,255,.8); } 50% { text-shadow: 0 0 48px #00f5ff, 0 0 90px rgba(139,92,246,.55); } }
  @keyframes waveBar { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.28); } }
  @keyframes pdot   { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.5); opacity:.4; } }

  .proot { background:#050510; color:#d0d0f0; font-family:'Rajdhani','Segoe UI',sans-serif; overflow-x:hidden; min-height:100vh; }
  .orb { font-family:'Orbitron','Courier New',monospace; }

  .cdot  { position:fixed; width:7px; height:7px; background:#00f5ff; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); box-shadow:0 0 8px #00f5ff, 0 0 18px #00f5ff; }
  .cring { position:fixed; width:32px; height:32px; border:1.5px solid rgba(0,245,255,.35); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:all .1s linear; }

  .gl { background:rgba(255,255,255,.04); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); border:1px solid rgba(0,245,255,.15); border-radius:14px; }

  .rv  { opacity:0; transform:translateY(36px);  transition:opacity .7s ease, transform .7s ease; }
  .rvl { opacity:0; transform:translateX(-36px); transition:opacity .7s ease, transform .7s ease; }
  .rvr { opacity:0; transform:translateX(36px);  transition:opacity .7s ease, transform .7s ease; }
  .rvs { opacity:0; transform:scale(.88);         transition:opacity .6s ease, transform .6s ease; }
  .rv.vs, .rvl.vs, .rvr.vs, .rvs.vs { opacity:1; transform:none; }

  .nl { position:relative; text-decoration:none; color:rgba(200,200,255,.75); font-size:.87rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; transition:color .3s; padding:4px 0; }
  .nl::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:linear-gradient(90deg,#00f5ff,#8b5cf6); transition:width .3s; }
  .nl:hover { color:#00f5ff; }
  .nl:hover::after { width:100%; }

  .bp { display:inline-flex; align-items:center; gap:8px; padding:12px 28px; background:linear-gradient(135deg,#00f5ff,#8b5cf6); border:none; border-radius:8px; color:#03050e; font-weight:700; font-size:.92rem; letter-spacing:.05em; cursor:pointer; transition:all .3s; text-decoration:none; font-family:'Rajdhani',sans-serif; }
  .bp:hover { transform:translateY(-2px) scale(1.02); box-shadow:0 0 30px rgba(0,245,255,.45), 0 12px 32px rgba(0,0,0,.35); }
  .bo { display:inline-flex; align-items:center; gap:8px; padding:11px 26px; background:transparent; border:1px solid rgba(0,245,255,.45); border-radius:8px; color:#00f5ff; font-weight:600; font-size:.92rem; letter-spacing:.05em; cursor:pointer; transition:all .3s; text-decoration:none; font-family:'Rajdhani',sans-serif; }
  .bo:hover { background:rgba(0,245,255,.08); border-color:#00f5ff; box-shadow:0 0 18px rgba(0,245,255,.22); transform:translateY(-2px); }

  .slbl  { font-size:.72rem; font-weight:700; letter-spacing:.28em; text-transform:uppercase; color:#00f5ff; margin-bottom:10px; }
  .stitle { font-family:'Orbitron',monospace; font-size:clamp(1.6rem,4vw,2.65rem); font-weight:700; background:linear-gradient(135deg,#fff 30%,rgba(139,92,246,.9)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; line-height:1.2; margin-bottom:12px; }

  .sktab { padding:7px 16px; border-radius:6px; border:1px solid rgba(255,255,255,.1); background:transparent; color:rgba(200,200,255,.6); font-family:'Rajdhani',sans-serif; font-size:.87rem; font-weight:600; letter-spacing:.06em; cursor:pointer; transition:all .3s; text-transform:uppercase; }
  .sktab.act { background:linear-gradient(135deg,rgba(0,245,255,.14),rgba(139,92,246,.14)); border-color:rgba(0,245,255,.5); color:#00f5ff; box-shadow:0 0 14px rgba(0,245,255,.14); }
  .sktab:hover:not(.act) { border-color:rgba(139,92,246,.3); color:#8b5cf6; background:rgba(139,92,246,.07); }

  .ptrack { background:rgba(255,255,255,.07); border-radius:20px; height:7px; overflow:hidden; }
  .pfill  { height:100%; border-radius:20px; background:linear-gradient(90deg,#00f5ff,#8b5cf6); box-shadow:0 0 8px rgba(0,245,255,.35); width:0%; transition:width 1.35s cubic-bezier(.22,1,.36,1); }

  .pc { background:rgba(255,255,255,.025); border:1px solid rgba(255,255,255,.07); border-radius:16px; padding:26px; transition:all .4s ease; position:relative; overflow:hidden; }
  .pc:hover { transform:translateY(-8px); border-color:rgba(0,245,255,.22); box-shadow:0 24px 60px rgba(0,0,0,.5), 0 0 30px rgba(0,245,255,.07); background:rgba(255,255,255,.045); }

  .fi { width:100%; padding:12px 16px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); border-radius:8px; color:#e0e0ff; font-family:'Rajdhani',sans-serif; font-size:1rem; outline:none; transition:border-color .3s, box-shadow .3s; resize:vertical; }
  .fi:focus { border-color:rgba(0,245,255,.45); box-shadow:0 0 14px rgba(0,245,255,.12); }
  .fi::placeholder { color:rgba(170,170,210,.35); }

  .ac { background:rgba(255,255,255,.025); border:1px solid rgba(139,92,246,.2); border-radius:14px; padding:22px; text-align:center; transition:all .35s; }
  .ac:hover { border-color:rgba(0,245,255,.3); transform:translateY(-5px); box-shadow:0 12px 36px rgba(0,245,255,.07); background:rgba(0,245,255,.025); }

  .sb { display:flex; align-items:center; justify-content:center; width:42px; height:42px; border:1px solid rgba(0,245,255,.22); border-radius:8px; color:rgba(200,200,255,.7); transition:all .3s; text-decoration:none; }
  .sb:hover { border-color:#00f5ff; color:#00f5ff; background:rgba(0,245,255,.07); box-shadow:0 0 14px rgba(0,245,255,.18); transform:translateY(-2px); }

  .tag { display:inline-block; padding:2px 9px; border-radius:20px; font-size:.71rem; font-weight:600; letter-spacing:.04em; }

  .grbg { background-image:linear-gradient(rgba(0,245,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,.022) 1px, transparent 1px); background-size:60px 60px; }

  .loader { position:fixed; inset:0; background:#050510; z-index:10000; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; animation:lfade .4s ease forwards; animation-delay:2s; animation-fill-mode:forwards; }

  .dnav { display:flex; }
  .mb { display:none !important; }
  @media (max-width:768px) {
    .dnav { display:none !important; }
    .mb   { display:flex !important; }
    .cdot, .cring { display:none !important; }
    .about-g  { grid-template-columns:1fr !important; }
    .ctr-g    { grid-template-columns:1fr 1fr !important; }
    .contact-g { grid-template-columns:1fr !important; }
    .skills-g  { grid-template-columns:1fr !important; }
  }
  @media (max-width:480px) {
    .ctr-g { grid-template-columns:1fr 1fr !important; }
  }
`;

// ═══════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════

function Loader() {
  return (
    <div className="loader">
      <div className="orb" style={{ fontSize: "1.05rem", color: "#00f5ff", letterSpacing: ".22em", textTransform: "uppercase" }}>
        Initialising
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 36 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 5, height: `${16 + i * 4}px`, borderRadius: 3,
            background: `linear-gradient(180deg, ${i % 2 === 0 ? "#00f5ff" : "#8b5cf6"}, rgba(0,0,0,0))`,
            animation: `waveBar 1s ease-in-out infinite`,
            animationDelay: `${i * 0.12}s`,
          }} />
        ))}
      </div>
      <div style={{ width: 200, height: 2, background: "rgba(255,255,255,.08)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg,#00f5ff,#8b5cf6)", animation: "lbar 1.95s ease-in-out forwards", boxShadow: "0 0 10px #00f5ff" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════

function Navbar({ open, setOpen }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      padding: "0 clamp(16px,4vw,44px)", height: 62,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: sc ? "rgba(5,5,16,.94)" : "transparent",
      backdropFilter: sc ? "blur(22px)" : "none",
      borderBottom: sc ? "1px solid rgba(0,245,255,.09)" : "none",
      transition: "all .35s ease",
    }}>
      <div className="orb" style={{ fontSize: "1rem", fontWeight: 700, color: "#00f5ff", letterSpacing: ".1em" }}>&lt;YN /&gt;</div>

      {/* Desktop */}
      <div className="dnav" style={{ gap: 28, alignItems: "center" }}>
        {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="nl">{n}</a>)}
        <a href="#contact" className="bp" style={{ padding: "8px 18px", fontSize: ".83rem" }}>Hire Me</a>
      </div>

      {/* Mobile toggle */}
      <button className="mb" onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", color: "#00f5ff", cursor: "pointer", padding: 8, alignItems: "center" }}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: "absolute", top: 62, left: 0, right: 0,
          background: "rgba(5,5,16,.98)", backdropFilter: "blur(22px)",
          borderBottom: "1px solid rgba(0,245,255,.1)",
          padding: "20px clamp(16px,4vw,44px)",
          display: "flex", flexDirection: "column", gap: 18,
        }}>
          {NAV.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="nl" onClick={() => setOpen(false)} style={{ fontSize: "1rem" }}>{n}</a>)}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════

function Hero({ canvasRef, typed }) {
  return (
    <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div className="grbg" style={{ position: "absolute", inset: 0, opacity: .55 }} />
      {/* Central radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "min(700px,90vw)", height: "min(700px,90vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,245,255,.06) 0%, rgba(139,92,246,.04) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 24px", animation: "up .9s ease forwards", zIndex: 2 }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", border: "1px solid rgba(0,245,255,.3)",
          borderRadius: 20, background: "rgba(0,245,255,.06)",
          marginBottom: 22, fontSize: ".77rem", color: "#00f5ff",
          letterSpacing: ".12em", textTransform: "uppercase",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f5ff", boxShadow: "0 0 8px #00f5ff", display: "inline-block", animation: "pdot 2s ease-in-out infinite" }} />
          Open to Internships
        </div>

        <div style={{ fontSize: "clamp(.78rem,1.8vw,.98rem)", color: "rgba(170,170,230,.52)", letterSpacing: ".3em", textTransform: "uppercase", marginBottom: 10, fontWeight: 500 }}>
          Hello, I'm
        </div>

        <h1 className="orb" style={{
          fontSize: "clamp(2.2rem,8vw,5.4rem)", fontWeight: 900, color: "#fff",
          letterSpacing: ".04em", lineHeight: 1, marginBottom: 18,
          animation: "cyGlow 3.2s ease-in-out infinite",
        }}>
          Your Name
        </h1>

        {/* Typing */}
        <div style={{ fontSize: "clamp(1rem,3vw,1.5rem)", color: "#00f5ff", fontWeight: 600, letterSpacing: ".08em", minHeight: 38, marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span>{typed}</span>
          <span style={{ animation: "blnk 1s step-end infinite", color: "#8b5cf6", marginLeft: 2 }}>|</span>
        </div>

        <p style={{ maxWidth: 520, margin: "0 auto 36px", color: "rgba(180,180,225,.58)", lineHeight: 1.78, fontSize: ".98rem" }}>
          B.Tech Computer Science student passionate about building scalable full-stack applications and exploring the frontiers of AI &amp; Machine Learning.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#projects" className="bp"><Star size={15} />View Projects</a>
          <a href="#contact" className="bo"><Mail size={15} />Get In Touch</a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: -110, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          color: "rgba(180,180,220,.38)", fontSize: ".72rem", letterSpacing: ".1em",
          animation: "flt 2.2s ease-in-out infinite",
        }}>
          <span style={{ textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "linear-gradient(180deg, rgba(0,245,255,.5), transparent)" }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════

function About({ vis }) {
  const interests = [
    { e: "🧠", l: "AI & ML" }, { e: "🌐", l: "Full Stack" }, { e: "🔐", l: "Security" },
    { e: "☁️", l: "Cloud" },    { e: "🎮", l: "Game Dev" }, { e: "📊", l: "Data Science" },
  ];
  return (
    <section id="about" style={{ padding: "100px clamp(20px,5vw,80px)", maxWidth: 1080, margin: "0 auto" }}>
      <div className="about-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(30px,6vw,72px)", alignItems: "center" }}>
        {/* Visual */}
        <div className={`rvl ${vis ? "vs" : ""}`} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 290 }}>
          <div style={{ position: "absolute", width: 272, height: 272, borderRadius: "50%", border: "1px solid transparent", borderTopColor: "#00f5ff", borderRightColor: "#8b5cf6", animation: "rot 9s linear infinite" }} />
          <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", border: "1px solid transparent", borderBottomColor: "#00f5ff", borderLeftColor: "#ff006e", animation: "rotR 13s linear infinite" }} />
          <div style={{
            width: 210, height: 210, borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(0,245,255,.18),rgba(139,92,246,.28))",
            border: "2px solid rgba(0,245,255,.35)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4.5rem",
            boxShadow: "0 0 40px rgba(0,245,255,.18), 0 0 80px rgba(139,92,246,.1)",
          }}>👨‍💻</div>
          <div className="gl" style={{ position: "absolute", bottom: 0, right: "10%", padding: "10px 18px", animation: "flt 4s ease-in-out infinite", animationDelay: ".4s" }}>
            <div style={{ fontSize: ".64rem", color: "rgba(170,170,210,.5)", letterSpacing: ".1em" }}>CGPA</div>
            <div className="orb" style={{ fontSize: "1.3rem", color: "#00f5ff", fontWeight: 700 }}>8.5+</div>
          </div>
          <div className="gl" style={{ position: "absolute", top: "6%", right: "6%", padding: "10px 18px", animation: "flt 4s ease-in-out infinite", animationDelay: "1s" }}>
            <div style={{ fontSize: ".64rem", color: "rgba(170,170,210,.5)", letterSpacing: ".1em" }}>PROJECTS</div>
            <div className="orb" style={{ fontSize: "1.3rem", color: "#8b5cf6", fontWeight: 700 }}>10+</div>
          </div>
        </div>

        {/* Text */}
        <div className={`rvr ${vis ? "vs" : ""}`}>
          <div className="slbl">About Me</div>
          <h2 className="stitle">Crafting Digital<br />Experiences</h2>
          <p style={{ color: "rgba(185,185,225,.67)", lineHeight: 1.82, marginBottom: 16, fontSize: ".97rem" }}>
            I'm a passionate B.Tech Computer Science student with a love for building things that live on the internet.
            From pixel-perfect frontends to robust backend systems, I enjoy every layer of the stack.
          </p>
          <p style={{ color: "rgba(185,185,225,.67)", lineHeight: 1.82, marginBottom: 28, fontSize: ".97rem" }}>
            Currently exploring the intersection of AI and web development — always looking for smarter, faster, more beautiful ways to solve real problems.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 32 }}>
            {interests.map(({ e, l }) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "5px 13px",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(0,245,255,.13)",
                borderRadius: 20, fontSize: ".84rem", color: "rgba(205,205,245,.8)",
                transition: "all .3s", cursor: "default",
              }}><span>{e}</span><span>{l}</span></div>
            ))}
          </div>
          <a href="#" className="bo" style={{ fontSize: ".87rem", padding: "9px 22px" }}>Download Resume →</a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════

function Skills({ vis, activeTab, setActiveTab }) {
  const skills = SKILLS[activeTab] || [];
  const [animated, setAnimated] = useState(false);
  useEffect(() => { if (vis) { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t); } }, [vis, activeTab]);
  useEffect(() => { setAnimated(false); if (vis) { const t = setTimeout(() => setAnimated(true), 80); return () => clearTimeout(t); } }, [activeTab]);

  return (
    <section id="skills" style={{ padding: "100px clamp(20px,5vw,80px)", background: "rgba(255,255,255,.012)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className={`rv ${vis ? "vs" : ""}`} style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="slbl">Technical Skills</div>
          <h2 className="stitle">My Tech Arsenal</h2>
          <p style={{ color: "rgba(170,170,215,.58)", maxWidth: 460, margin: "0 auto", fontSize: ".95rem" }}>
            Technologies I use to bring ideas to life, across the full stack.
          </p>
        </div>

        {/* Category tabs */}
        <div className={`rv ${vis ? "vs" : ""}`} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
          {Object.keys(SKILLS).map(tab => (
            <button key={tab} className={`sktab ${activeTab === tab ? "act" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        {/* Skill bars */}
        <div className="skills-g" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {skills.map(({ n, v }, i) => (
            <div key={n} className={`rv ${vis ? "vs" : ""}`} style={{ transitionDelay: `${i * .07}s` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: ".93rem", color: "rgba(205,205,245,.85)" }}>{n}</span>
                <span style={{ fontSize: ".82rem", color: "#00f5ff", fontWeight: 600 }}>{v}%</span>
              </div>
              <div className="ptrack">
                <div className="pfill" style={{ width: animated ? `${v}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════

function Projects({ vis }) {
  return (
    <section id="projects" style={{ padding: "100px clamp(20px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
      <div className={`rv ${vis ? "vs" : ""}`} style={{ textAlign: "center", marginBottom: 54 }}>
        <div className="slbl">Portfolio</div>
        <h2 className="stitle">Featured Projects</h2>
        <p style={{ color: "rgba(170,170,215,.58)", maxWidth: 460, margin: "0 auto", fontSize: ".95rem" }}>
          A selection of projects that showcase my skills and passion for building.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))", gap: 22 }}>
        {PROJECTS.map(({ title, desc, tech, accent, emoji, github, demo }, i) => (
          <div key={title} className={`pc rv ${vis ? "vs" : ""}`} style={{ transitionDelay: `${i * .1}s` }}>
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)`, borderRadius: "16px 16px 0 0" }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ fontSize: "2.3rem" }}>{emoji}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href={github} className="sb" title="GitHub"><Github size={16} /></a>
                <a href={demo} className="sb" style={{ borderColor: `${accent}50`, color: accent }} title="Live Demo"><ExternalLink size={16} /></a>
              </div>
            </div>

            <h3 className="orb" style={{ fontSize: ".98rem", fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: ".03em" }}>{title}</h3>
            <p style={{ color: "rgba(175,175,220,.65)", lineHeight: 1.76, fontSize: ".9rem", marginBottom: 18 }}>{desc}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {tech.map(t => (
                <span key={t} className="tag" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// EXPERIENCE
// ═══════════════════════════════════════════════

function Experience({ vis }) {
  return (
    <section id="experience" style={{ padding: "100px clamp(20px,5vw,80px)", background: "rgba(255,255,255,.01)" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div className={`rv ${vis ? "vs" : ""}`} style={{ textAlign: "center", marginBottom: 54 }}>
          <div className="slbl">Experience</div>
          <h2 className="stitle">Work &amp; Contributions</h2>
        </div>

        <div style={{ position: "relative", paddingLeft: 48 }}>
          {/* Vertical timeline line */}
          <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,#00f5ff,#8b5cf6,transparent)" }} />

          {EXPERIENCE.map(({ role, company, period, type, color, points }, i) => (
            <div key={role} className={`rv ${vis ? "vs" : ""}`} style={{ position: "relative", marginBottom: 44, transitionDelay: `${i * .15}s` }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: -40, top: 7, width: 13, height: 13, borderRadius: "50%", background: color, boxShadow: `0 0 14px ${color}` }} />

              <div className="pc" style={{ padding: "24px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: 4 }}>{role}</h3>
                    <div style={{ color, fontSize: ".88rem", fontWeight: 600, letterSpacing: ".05em" }}>{company}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: ".78rem", color: "rgba(175,175,215,.5)", marginBottom: 5 }}>{period}</div>
                    <span className="tag" style={{ color, borderColor: `${color}40`, background: `${color}10`, fontSize: ".69rem" }}>{type}</span>
                  </div>
                </div>
                <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 }}>
                  {points.map(p => (
                    <li key={p} style={{ color: "rgba(175,175,220,.66)", fontSize: ".9rem", lineHeight: 1.65 }}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// ACHIEVEMENTS
// ═══════════════════════════════════════════════

function Achievements({ vis, counters }) {
  const stats = [
    { label: "Projects Built",   val: counters.projects, suffix: "+", color: "#00f5ff" },
    { label: "Technologies",     val: counters.skills,   suffix: "+", color: "#8b5cf6" },
    { label: "Hours Coded",      val: counters.hours,    suffix: "+", color: "#ff006e" },
    { label: "Cups of Coffee",   val: counters.coffee,   suffix: "+", color: "#39ff14" },
  ];
  return (
    <section id="achievements" style={{ padding: "100px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className={`rv ${vis ? "vs" : ""}`} style={{ textAlign: "center", marginBottom: 54 }}>
          <div className="slbl">Highlights</div>
          <h2 className="stitle">Achievements</h2>
        </div>

        {/* Animated counters */}
        <div className="ctr-g" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 50 }}>
          {stats.map(({ label, val, suffix, color }, i) => (
            <div key={label} className={`rv ${vis ? "vs" : ""}`} style={{ transitionDelay: `${i * .08}s` }}>
              <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${color}25`, borderRadius: 14, padding: "24px 16px", textAlign: "center", transition: "all .3s" }}>
                <div className="orb" style={{ fontSize: "clamp(1.7rem,4vw,2.3rem)", fontWeight: 700, color, marginBottom: 6 }}>{val}{suffix}</div>
                <div style={{ fontSize: ".79rem", color: "rgba(170,170,210,.52)", letterSpacing: ".08em", textTransform: "uppercase" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
          {ACHIEVEMENTS.map(({ emoji, title, sub }, i) => (
            <div key={title} className={`ac rv ${vis ? "vs" : ""}`} style={{ transitionDelay: `${i * .07}s` }}>
              <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{emoji}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: ".84rem", color: "rgba(165,165,205,.58)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════

function Contact({ vis }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };
  return (
    <section id="contact" style={{ padding: "100px clamp(20px,5vw,80px)", background: "rgba(255,255,255,.01)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div className={`rv ${vis ? "vs" : ""}`} style={{ textAlign: "center", marginBottom: 54 }}>
          <div className="slbl">Get In Touch</div>
          <h2 className="stitle">Let's Build Together</h2>
          <p style={{ color: "rgba(170,170,215,.58)", maxWidth: 430, margin: "0 auto", fontSize: ".95rem" }}>
            Have a project in mind or an opportunity to share? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-g" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 44, alignItems: "start" }}>
          {/* Contact info */}
          <div className={`rvl ${vis ? "vs" : ""}`}>
            <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: 20 }}>Contact Info</h3>
            {[
              { icon: <Mail size={15} />, label: "yourname@email.com", href: "mailto:yourname@email.com" },
              { icon: <Github size={15} />, label: "github.com/yourname", href: "https://github.com" },
              { icon: <Linkedin size={15} />, label: "linkedin.com/in/yourname", href: "https://linkedin.com" },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
                color: "rgba(185,185,225,.68)", textDecoration: "none", fontSize: ".9rem", transition: "color .3s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5ff"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(185,185,225,.68)"}>
                <span style={{ color: "#00f5ff" }}>{icon}</span>{label}
              </a>
            ))}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: ".78rem", color: "rgba(170,170,210,.46)", marginBottom: 14, letterSpacing: ".1em", textTransform: "uppercase" }}>Find Me On</div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="https://github.com" className="sb" title="GitHub"><Github size={17} /></a>
                <a href="https://linkedin.com" className="sb" title="LinkedIn"><Linkedin size={17} /></a>
                <a href="mailto:you@email.com" className="sb" title="Email"><Mail size={17} /></a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`rvr ${vis ? "vs" : ""}`}>
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input className="fi" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              <input className="fi" type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              <textarea className="fi" placeholder="Your Message..." rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
              <button type="submit" className="bp" style={{ alignSelf: "flex-start", background: sent ? "linear-gradient(135deg,#39ff14,#00f5ff)" : undefined }}>
                {sent ? "✓ Message Sent!" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════

function Footer() {
  return (
    <footer style={{
      padding: "28px clamp(20px,5vw,60px)",
      borderTop: "1px solid rgba(0,245,255,.07)",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <div className="orb" style={{ fontSize: ".84rem", color: "rgba(0,245,255,.55)", letterSpacing: ".08em" }}>&lt;YN /&gt;</div>
      <div style={{ fontSize: ".82rem", color: "rgba(150,150,195,.4)" }}>© 2024 Your Name · Built with React &amp; ❤️</div>
      <div style={{ display: "flex", gap: 14 }}>
        {NAV.map(n => (
          <a key={n} href={`#${n.toLowerCase()}`}
            style={{ fontSize: ".8rem", color: "rgba(150,150,195,.4)", textDecoration: "none", transition: "color .3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#00f5ff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(150,150,195,.4)"}>{n}</a>
        ))}
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════

export default function Portfolio() {
  const [open, setOpen]       = useState(false);
  const [prog, setProg]       = useState(0);
  const [typed, setTyped]     = useState("");
  const [tidx, setTidx]       = useState(0);
  const [cidx, setCidx]       = useState(0);
  const [del, setDel]         = useState(false);
  const [vis, setVis]         = useState(new Set());
  const [counters, setCounters] = useState({ projects: 0, skills: 0, hours: 0, coffee: 0 });
  const [ctrVis, setCtrVis]   = useState(false);
  const [activeTab, setActiveTab] = useState("Frontend");
  const [cur, setCur]         = useState({ x: -100, y: -100 });
  const [loading, setLoading] = useState(true);

  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouse     = useRef({ x: 0, y: 0 });

  // ── Loader ──────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // ── Particle canvas ──────────────────────────────
  useEffect(() => {
    if (loading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;
        this.r  = Math.random() * 1.7 + .4;
        this.c  = Math.random() > .5 ? "#00f5ff" : "#8b5cf6";
        this.a  = Math.random() * .45 + .12;
      }
      update() {
        const dx = mouse.current.x - this.x, dy = mouse.current.y - this.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) { this.vx += dx * .00007; this.vy += dy * .00007; }
        this.vx *= .999; this.vy *= .999;
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        ctx.save(); ctx.globalAlpha = this.a;
        ctx.fillStyle = this.c; ctx.shadowColor = this.c; ctx.shadowBlur = 6;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    }

    const ps = Array.from({ length: 110 }, () => new P());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p, i) => {
        ps.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 95) {
            ctx.save(); ctx.globalAlpha = (1 - d / 95) * .18;
            ctx.strokeStyle = "#00f5ff"; ctx.lineWidth = .4;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            ctx.restore();
          }
        });
        p.update(); p.draw();
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const mm = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", mm);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", mm);
    };
  }, [loading]);

  // ── Typing effect ────────────────────────────────
  useEffect(() => {
    const cur = TYPING[tidx];
    let t;
    if (!del && cidx < cur.length)       t = setTimeout(() => setCidx(c => c + 1), 95);
    else if (!del && cidx === cur.length) t = setTimeout(() => setDel(true), 2300);
    else if (del && cidx > 0)             t = setTimeout(() => setCidx(c => c - 1), 45);
    else if (del && cidx === 0)           { setDel(false); setTidx(i => (i + 1) % TYPING.length); }
    setTyped(cur.slice(0, cidx));
    return () => clearTimeout(t);
  }, [cidx, del, tidx]);

  // ── Scroll progress ──────────────────────────────
  useEffect(() => {
    const h = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProg((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // ── Intersection Observer ────────────────────────
  useEffect(() => {
    if (loading) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVis(prev => new Set([...prev, e.target.id]));
          if (e.target.id === "achievements") setCtrVis(true);
        }
      });
    }, { threshold: .1 });
    ["about", "skills", "projects", "experience", "achievements", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loading]);

  // ── Animated counters ────────────────────────────
  useEffect(() => {
    if (!ctrVis) return;
    const targets = { projects: 10, skills: 15, hours: 500, coffee: 300 };
    const dur = 2400, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounters({
        projects: Math.floor(ease * targets.projects),
        skills:   Math.floor(ease * targets.skills),
        hours:    Math.floor(ease * targets.hours),
        coffee:   Math.floor(ease * targets.coffee),
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [ctrVis]);

  // ── Custom cursor ────────────────────────────────
  useEffect(() => {
    const h = (e) => setCur({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  // ── Render ───────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      {loading && <Loader />}

      <div className="proot">
        {/* Custom cursor */}
        <div className="cdot"  style={{ left: cur.x, top: cur.y }} />
        <div className="cring" style={{ left: cur.x, top: cur.y }} />

        {/* Scroll progress bar */}
        <div style={{
          position: "fixed", top: 0, left: 0, height: 3, width: `${prog}%`,
          background: "linear-gradient(90deg,#00f5ff,#8b5cf6)",
          zIndex: 1000, transition: "width .1s linear",
          boxShadow: "0 0 10px rgba(0,245,255,.7)",
        }} />

        <Navbar open={open} setOpen={setOpen} />
        <Hero canvasRef={canvasRef} typed={typed} />
        <About vis={vis.has("about")} />
        <Skills vis={vis.has("skills")} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Projects vis={vis.has("projects")} />
        <Experience vis={vis.has("experience")} />
        <Achievements vis={vis.has("achievements")} counters={counters} />
        <Contact vis={vis.has("contact")} />
        <Footer />
      </div>
    </>
  );
}
