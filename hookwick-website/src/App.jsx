import React, { useState } from 'react';
import './App.css';

const DEFAULT_TRENDS = [
  {
    video_id: 'short_in_001',
    title: "Don't buy iPhone 16 in India before watching this! 🚨",
    channel_title: 'TechBanter India',
    category_name: 'Science & Technology',
    view_count: 485000,
    velocity_vph: 48500,
    duration_sec: 48,
    lifecycle_tag: 'Rising',
    reason: 'Rapid breakout (+48.5k views/hr in first 10h), high comment controversy.',
  },
  {
    video_id: 'short_in_002',
    title: 'Corporate Majdoor on Sunday vs Monday Morning 😂',
    channel_title: 'Bengaluru Chai Tales',
    category_name: 'Comedy',
    view_count: 1820000,
    velocity_vph: 45500,
    duration_sec: 32,
    lifecycle_tag: 'Peaking',
    reason: 'View velocity plateaued over last 24h as weekend sharing saturated.',
  },
  {
    video_id: 'short_in_003',
    title: 'Old ₹500 note scam hitting Delhi metro riders',
    channel_title: 'Dilli Watchdog',
    category_name: 'News & Politics',
    view_count: 920000,
    velocity_vph: 6571,
    duration_sec: 54,
    lifecycle_tag: 'Fading',
    reason: 'Age > 140h, velocity down 78% compared to initial spike.',
  },
  {
    video_id: 'short_in_004',
    title: '3 SIP Mistakes costing Gen-Z lakhs in wealth tax 💸',
    channel_title: 'PaisaIQ Hindi',
    category_name: 'Education',
    view_count: 210000,
    velocity_vph: 35000,
    duration_sec: 44,
    lifecycle_tag: 'Rising',
    reason: 'Strong bookmark and save signals typical of actionable personal finance.',
  },
];

const CANNED_HOOKS = {
  Hinglish: [
    {
      text: "Ruk jao! Agar aap iPhone 16 lene ki soch rahe ho, toh pehle yeh 2 minute ka sach sun lo.",
      hook_type: "pattern-interrupt",
      why_it_works: "Aggressive scroll-stopper with immediate urgency and fear of financial regret.",
      strength_score: 9,
      originality: { label: "🟢 High Originality", similarity_score: 0.18, color: "#10b981" }
    },
    {
      text: "Yeh video dekhne ke baad 90% log apna naya phone order cancel kar denge.",
      hook_type: "shock",
      why_it_works: "Bold negative-action premise triggers extreme curiosity and self-preservation bias.",
      strength_score: 9,
      originality: { label: "🟢 High Originality", similarity_score: 0.12, color: "#10b981" }
    },
    {
      text: "Maine Apple Store mein ₹80,000 diye, aur 3 din baad mujhe sabse bada dhokha mila...",
      hook_type: "story",
      why_it_works: "Personal narrative anchored by high monetary stakes and unresolved tension.",
      strength_score: 8,
      originality: { label: "🟢 High Originality", similarity_score: 0.14, color: "#10b981" }
    },
    {
      text: "POV: Aapne Diwali bonus se phone liya, lekin camera roll open karte hi pachtawa shuru.",
      hook_type: "POV",
      why_it_works: "Hyper-relatable seasonal context for Indian creators with visual empathy.",
      strength_score: 8,
      originality: { label: "🟢 High Originality", similarity_score: 0.11, color: "#10b981" }
    },
    {
      text: "Kya Indian tech YouTubers aapse iPhone 16 ke baare mein sabse bada sach chhupa rahe hain?",
      hook_type: "question",
      why_it_works: "Tribal skepticism questioning established authority creates high comment debate.",
      strength_score: 7,
      originality: { label: "🟡 Moderate Overlap", similarity_score: 0.38, color: "#f59e0b" }
    }
  ],
  English: [
    {
      text: "Stop scrolling! If you are about to buy the iPhone 16 in India, watch this before wasting ₹80,000.",
      hook_type: "pattern-interrupt",
      why_it_works: "Clear financial stake combined with a direct command to stop browsing.",
      strength_score: 9,
      originality: { label: "🟡 Moderate Overlap", similarity_score: 0.42, color: "#f59e0b" }
    },
    {
      text: "Apple made a silent downgrade to the Indian iPhone 16 that literally nobody is talking about.",
      hook_type: "shock",
      why_it_works: "Information asymmetry ('nobody is talking about') creates FOMO.",
      strength_score: 9,
      originality: { label: "🟢 High Originality", similarity_score: 0.22, color: "#10b981" }
    },
    {
      text: "I tested the iPhone 16 in Delhi heat for 72 hours, and here is what melted.",
      hook_type: "story",
      why_it_works: "Extreme stress-test premise situated in familiar regional context.",
      strength_score: 8,
      originality: { label: "🟢 High Originality", similarity_score: 0.19, color: "#10b981" }
    },
    {
      text: "Why are Indian tech creators pretending this is an upgrade when base specs are identical?",
      hook_type: "question",
      why_it_works: "Provocative accountability question that invites fiery comment warfare.",
      strength_score: 8,
      originality: { label: "🟢 High Originality", similarity_score: 0.26, color: "#10b981" }
    },
    {
      text: "POV: You just spent your entire salary on a smartphone with a 60Hz display in 2026.",
      hook_type: "POV",
      why_it_works: "Self-deprecating consumer satire that drives immediate shares.",
      strength_score: 7,
      originality: { label: "🟢 High Originality", similarity_score: 0.15, color: "#10b981" }
    }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('trends');
  const [selectedTopic, setSelectedTopic] = useState("Don't buy iPhone 16 in India before watching this! 🚨");
  const [language, setLanguage] = useState('Hinglish');
  const [niche, setNiche] = useState('Tech & Gadgets');
  const [platform, setPlatform] = useState('YouTube Shorts');
  const [tone, setTone] = useState('Relatable & Punchy');
  const [honestMode, setHonestMode] = useState(true);
  const [hooksList, setHooksList] = useState(CANNED_HOOKS['Hinglish']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [feedbackEntries, setFeedbackEntries] = useState([
    {
      id: 1,
      title: 'iPhone 16 Review Draft',
      readiness_score: 64,
      actual_views: 45000,
      actual_likes: 3800,
      engagement: '8.4%',
      platform: 'YouTube Shorts'
    }
  ]);
  const [newActualViews, setNewActualViews] = useState(32000);
  const [newActualLikes, setNewActualLikes] = useState(2500);

  const handleUseTrend = (title) => {
    setSelectedTopic(title);
    setActiveTab('hooks');
  };

  const handleGenerateHooks = (e) => {
    e.preventDefault();
    const list = CANNED_HOOKS[language] || CANNED_HOOKS['Hinglish'];
    setHooksList(list);
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        readiness_score: 64,
        rule_score: 31,
        llm_score: 33,
        brutal_truth: "Your first 3 seconds are completely wasted: you stand silent adjusting posture while the algorithm swipe timer expires. You lose 65% of potential viewers before finishing your first sentence.",
        disclaimer: "The Readiness Score measures adherence to short-form video retention and editing best practices. It is NOT a prediction or guarantee of views or virality.",
        pillars: {
          "Hook & Opening (First 3s)": 10.4,
          "Pacing & Scene Rhythm": 12.8,
          "Audio Clarity & Delivery": 13.5,
          "Lighting & Framing": 14.2,
          "Retention Structure & Trend Fit": 13.1
        },
        diagnostics: {
          speech_start: "2.8s delay",
          scene_cuts: "4 cuts (0.9 cuts/10s)",
          duration: "44.5s",
          brightness: "112 / 255"
        },
        fixes: [
          { time: "0:00 - 0:03", text: "Cut dead silence entirely. Open directly on the syllable 'Don't' with a zoom-in cut.", sev: "High" },
          { time: "0:08 - 0:22", text: "Break the 14-second static monologue into 3 B-roll cutaways (phone close-up, spec sheet, screenshot).", sev: "High" },
          { time: "0:25", text: "Raise on-screen caption position by 80px so platform UI icons do not cover text.", sev: "Medium" }
        ]
      });
    }, 1200);
  };

  const handleSaveFeedback = (e) => {
    e.preventDefault();
    const newEntry = {
      id: feedbackEntries.length + 1,
      title: selectedTopic.slice(0, 30) + '...',
      readiness_score: analysisResult ? analysisResult.readiness_score : 70,
      actual_views: Number(newActualViews),
      actual_likes: Number(newActualLikes),
      engagement: ((newActualLikes / newActualViews) * 100).toFixed(1) + '%',
      platform: platform
    };
    setFeedbackEntries([newEntry, ...feedbackEntries]);
    alert("Saved performance metrics to feedback loop!");
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="logo-area">
          <span className="logo-icon">⚡</span>
          <div>
            <h1 className="logo-title">Hookwick</h1>
            <p className="logo-tagline">AI Retention Coach for Short-Video Creators in India</p>
          </div>
        </div>
        <div className="demo-badge">
          🚀 DEMO MODE ACTIVE
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`} onClick={() => setActiveTab('trends')}>
          📈 Trends & Lifecycle
        </button>
        <button className={`tab-btn ${activeTab === 'hooks' ? 'active' : ''}`} onClick={() => setActiveTab('hooks')}>
          🎣 Hook Studio
        </button>
        <button className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`} onClick={() => setActiveTab('review')}>
          🎬 Video Review
        </button>
        <button className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
          📊 Feedback Loop
        </button>
      </nav>

      {/* TAB 1: TRENDS */}
      {activeTab === 'trends' && (
        <section>
          <div className="card">
            <h2 className="card-title">Currently Trending Vertical Videos (India)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '20px' }}>
              Tracked via YouTube Data API v3 (regionCode=IN). Lifecycle tags calculated via longitudinal velocity tracking and cold-start heuristics.
            </p>

            {DEFAULT_TRENDS.map((t) => (
              <div key={t.video_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #334155' }}>
                <div style={{ flex: 3 }}>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f8fafc' }}>{t.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    {t.channel_title} • {t.category_name} • {t.duration_sec}s
                  </div>
                </div>

                <div style={{ flex: 1.5 }}>
                  <span className={`badge-${t.lifecycle_tag.toLowerCase()}`}>{t.lifecycle_tag.toUpperCase()}</span>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>{t.reason}</div>
                </div>

                <div style={{ flex: 1.5, textAlign: 'right', paddingRight: '20px' }}>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>⚡ {t.velocity_vph.toLocaleString()} VPH</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t.view_count.toLocaleString()} views</div>
                </div>

                <div>
                  <button className="btn-secondary" onClick={() => handleUseTrend(t.title)}>
                    Use this trend 🎯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: HOOK STUDIO */}
      {activeTab === 'hooks' && (
        <section>
          <div className="card">
            <h2 className="card-title">AI Hook Studio</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
              Generates 5 ranked video hooks tuned for Indian audience psychology and colloquial vernacular.
            </p>

            <form onSubmit={handleGenerateHooks}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Video Topic or Trend</label>
                  <input type="text" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Language Mode</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Hinglish">Hinglish (Natural Delhi/Mumbai creator style)</option>
                    <option value="English">English (Fast-paced global short-form)</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Creator Niche</label>
                  <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                    <option>Tech & Gadgets</option>
                    <option>Personal Finance & Wealth</option>
                    <option>Comedy & Relatable Skits</option>
                    <option>Health & Fitness</option>
                    <option>Food & Travel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Creator Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option>Relatable & Punchy</option>
                    <option>Urgent & Pattern-Interrupt</option>
                    <option>Provocative & Contrarian</option>
                    <option>Authoritative & Educational</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                ⚡ Generate 5 High-Retention Hooks
              </button>
            </form>
          </div>

          <div>
            {hooksList.map((h, i) => (
              <div key={i} className="card" style={{ borderLeft: '4px solid #6366f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 4 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#818cf8' }}>#{i + 1}</span>
                      <span style={{ background: '#312e81', color: '#c7d2fe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {h.hook_type.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: h.originality.color, fontWeight: 600 }}>
                        {h.originality.label} ({Math.round(h.originality.similarity_score * 100)}% overlap)
                      </span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '8px' }}>
                      "{h.text}"
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      💡 <b>Why it hooks:</b> {h.why_it_works}
                    </div>
                  </div>

                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>{h.strength_score} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 10</span></div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Strength Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: VIDEO REVIEW */}
      {activeTab === 'review' && (
        <section>
          <div className="card">
            <h2 className="card-title">Video Retention & Hook Review</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
              Upload your vertical short (max 100MB, 90s) to run OpenCV cut extraction, speech timing, and honest coaching.
            </p>

            <div className="grid-2">
              <div>
                <div className="form-group">
                  <label>Upload Video</label>
                  <input type="file" accept="video/mp4,video/quicktime,video/webm" />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f8fafc' }}>🔥 HONEST CRITIQUE MODE</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Leads with biggest flaws. Zero flattering padding.</div>
                  </div>
                  <input type="checkbox" checked={honestMode} onChange={(e) => setHonestMode(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '14px' }} onClick={handleRunAnalysis} disabled={isAnalyzing}>
              {isAnalyzing ? "Extracting visual cuts & analyzing speech timing..." : "🚀 Run Retention Audit"}
            </button>
          </div>

          {analysisResult && (
            <div>
              {/* Score & Disclaimer */}
              <div className="card">
                <div className="grid-2" style={{ alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>READINESS SCORE</div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f8fafc' }}>
                      {analysisResult.readiness_score} <span style={{ fontSize: '1.2rem', color: '#94a3b8' }}>/ 100</span>
                    </div>
                    <div className="progress-bar-bg" style={{ height: '12px' }}>
                      <div className="progress-bar-fill" style={{ width: `${analysisResult.readiness_score}%` }}></div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>
                      Rule Score: {analysisResult.rule_score}/50 • Qualitative LLM: {analysisResult.llm_score}/50
                    </div>
                  </div>

                  <div style={{ background: '#0f172a', padding: '16px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ fontWeight: 700, color: '#93c5fd', fontSize: '0.85rem', marginBottom: '6px' }}>DISCLAIMER</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>{analysisResult.disclaimer}</div>
                  </div>
                </div>
              </div>

              {/* Brutal Truth */}
              <div className="brutal-truth-alert">
                <h3 style={{ color: '#ef4444', marginTop: 0, marginBottom: '8px' }}>💥 THE BRUTAL TRUTH</h3>
                <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#fee2e2' }}>
                  {analysisResult.brutal_truth}
                </p>
              </div>

              {/* 5-Pillar Breakdown */}
              <div className="card">
                <h3 className="card-title">Score Breakdown</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                  {Object.entries(analysisResult.pillars).map(([pillar, val]) => (
                    <div key={pillar} style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', minHeight: '32px' }}>{pillar}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, margin: '6px 0' }}>{val} / 20</div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${(val / 20) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagnostic Signals */}
              <div className="card">
                <h3 className="card-title">Diagnostic Signals</h3>
                <div className="grid-4">
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>First Word Delay</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f87171' }}>{analysisResult.diagnostics.speech_start}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Scene Cut Velocity</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{analysisResult.diagnostics.scene_cuts}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Duration</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{analysisResult.diagnostics.duration}</div>
                  </div>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Average Luminance</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>{analysisResult.diagnostics.brightness}</div>
                  </div>
                </div>
              </div>

              {/* Timestamped Fixes */}
              <div className="card">
                <h3 className="card-title">Timestamped Fixes</h3>
                {analysisResult.fixes.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #334155' }}>
                    <div style={{ background: '#334155', color: '#f8fafc', padding: '4px 10px', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                      {f.time}
                    </div>
                    <div style={{ flex: 1, fontSize: '0.95rem' }}>{f.text}</div>
                    <span style={{ color: f.sev === 'High' ? '#ef4444' : '#f59e0b', fontWeight: 700, fontSize: '0.8rem' }}>
                      {f.sev.toUpperCase()} PRIORITY
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 4: FEEDBACK LOOP */}
      {activeTab === 'results' && (
        <section>
          <div className="card">
            <h2 className="card-title">Feedback Loop: Predicted Score vs Reality</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>
              ⚠️ <b>Statistical Honesty:</b> Short-form algorithms are stochastic. A handful of data points does not prove correlation.
              Use this dashboard to track personal editing discipline, not to claim causal guarantees.
            </p>

            <form onSubmit={handleSaveFeedback}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Actual Views</label>
                  <input type="number" value={newActualViews} onChange={(e) => setNewActualViews(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Actual Likes</label>
                  <input type="number" value={newActualLikes} onChange={(e) => setNewActualLikes(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                💾 Save Actual Performance Metrics
              </button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">Logged Performance Records</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '0.85rem' }}>
                  <th style={{ padding: '8px' }}>Video Title</th>
                  <th style={{ padding: '8px' }}>Platform</th>
                  <th style={{ padding: '8px' }}>Readiness Score</th>
                  <th style={{ padding: '8px' }}>Actual Views</th>
                  <th style={{ padding: '8px' }}>Actual Likes</th>
                  <th style={{ padding: '8px' }}>Engagement</th>
                </tr>
              </thead>
              <tbody>
                {feedbackEntries.map((e) => (
                  <tr key={e.id} style={{ borderBottom: '1px solid #1e293b', fontSize: '0.9rem' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 600 }}>{e.title}</td>
                    <td style={{ padding: '10px 8px', color: '#94a3b8' }}>{e.platform}</td>
                    <td style={{ padding: '10px 8px' }}><b>{e.readiness_score}</b> / 100</td>
                    <td style={{ padding: '10px 8px' }}>{e.actual_views.toLocaleString()}</td>
                    <td style={{ padding: '10px 8px' }}>{e.actual_likes.toLocaleString()}</td>
                    <td style={{ padding: '10px 8px', color: '#10b981', fontWeight: 700 }}>{e.engagement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
