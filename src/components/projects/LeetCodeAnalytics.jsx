import React, { useState, useEffect, useCallback } from "react";
import { RefreshCw, ArrowUpRight, CheckCircle2, Code2 } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const USERNAME = "madhanmohanreddyperam06";
const PROFILE_URL = `https://leetcode.com/u/${USERNAME}/`;

const INITIAL_DATA = {
  totalSolved: 17,
  totalQuestions: 4101,
  easySolved: 15,
  totalEasy: 975,
  mediumSolved: 2,
  totalMedium: 2139,
  hardSolved: 0,
  totalHard: 987,
  ranking: 4959563,
  acceptanceRate: 75.0,
  recentSubmissions: [
    { title: "To Lower Case", titleSlug: "to-lower-case", lang: "java", statusDisplay: "Accepted" },
    { title: "Perfect Number", titleSlug: "perfect-number", lang: "java", statusDisplay: "Accepted" },
    { title: "Find the Difference", titleSlug: "find-the-difference", lang: "python3", statusDisplay: "Accepted" },
    { title: "Valid Perfect Square", titleSlug: "valid-perfect-square", lang: "java", statusDisplay: "Accepted" },
  ],
};

const formatTime = (date) => {
  const h = String(date.getHours() % 12 || 12).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${h}.${m}.${s} ${ampm}`;
};

const LeetCodeAnalytics = () => {
  const [stats, setStats] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState(() => formatTime(new Date()));
  const [activeHover, setActiveHover] = useState(null);

  const fetchLiveStats = useCallback(async () => {
    setLoading(true);

    const apis = [
      `https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`,
      `https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`,
    ];

    for (const url of apis) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6500);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);

        if (!res.ok) continue;

        const json = await res.json();
        if (json && typeof json.totalSolved === "number") {
          let ac = 18;
          let tot = 24;

          if (json.matchedUserStats?.acSubmissionNum) {
            const allAc = json.matchedUserStats.acSubmissionNum.find((i) => i.difficulty === "All");
            if (allAc?.submissions) ac = allAc.submissions;
          }
          if (json.matchedUserStats?.totalSubmissionNum) {
            const allTot = json.matchedUserStats.totalSubmissionNum.find((i) => i.difficulty === "All");
            if (allTot?.submissions) tot = allTot.submissions;
          }

          const rate = tot > 0 ? parseFloat(((ac / tot) * 100).toFixed(1)) : 75.0;

          setStats({
            totalSolved: json.totalSolved || 17,
            totalQuestions: json.totalQuestions || 4101,
            easySolved: json.easySolved ?? 15,
            totalEasy: json.totalEasy || 975,
            mediumSolved: json.mediumSolved ?? 2,
            totalMedium: json.totalMedium || 2139,
            hardSolved: json.hardSolved ?? 0,
            totalHard: json.totalHard || 987,
            ranking: json.ranking || 4959563,
            acceptanceRate: rate,
            recentSubmissions:
              Array.isArray(json.recentSubmissions) && json.recentSubmissions.length > 0
                ? json.recentSubmissions.slice(0, 4)
                : INITIAL_DATA.recentSubmissions,
          });

          setLastSync(formatTime(new Date()));
          break;
        }
      } catch {
        // try next fallback
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLiveStats();
  }, [fetchLiveStats]);

  // Circular gauge parameters
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min((stats.totalSolved / (stats.totalQuestions || 4101)) * 100, 100);
  // Visually pleasing sweep arc for gauge
  const angleSweep = Math.max((progressPercent / 100) * 360, 48);
  const angleRad = ((angleSweep - 90) * Math.PI) / 180;
  const knobX = 85 + radius * Math.cos(angleRad);
  const knobY = 85 + radius * Math.sin(angleRad);

  return (
    <section className="relative w-full bg-[#080808] text-[#F1F0EC] py-24 sm:py-32 px-[6vw] lg:px-[5vw] overflow-hidden select-none">
      {/* Ambient background glow consistent with AboutVisual */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[55vw] w-[55vw] rounded-full bg-red-700/[0.08] blur-[150px]" />

      {/* Vertical right side label consistent with AboutInfo */}
      <div className="absolute right-[2.2vw] top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center">
        <div className="flex h-[55vh] items-center gap-4">
          <div className="h-full w-px bg-white/[0.10]" />
          <span className="rotate-90 whitespace-nowrap font-[doner] text-[9px] uppercase tracking-[0.24em] text-white/[0.42]">
            LeetCode
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto">
        {/* ==========================================================
            SECTION LABEL (Consistent with 01 About & 02 Journey)
            ========================================================== */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-[doner] text-[9px] tracking-[0.18em] text-white/[0.32]">
            03
          </span>
          <span className="h-px w-7 bg-red-500/[0.65]" />
          <span className="font-[doner] text-[9px] uppercase tracking-[0.24em] text-white/[0.48]">
            LEETCODE ANALYTICS
          </span>
        </div>

        {/* ==========================================================
            HEADER COMPOSITION
            ========================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <p className="max-w-[580px] font-[doner] text-[11px] sm:text-xs leading-[1.75] tracking-[0.01em] text-white/[0.52]">
              Real-time competitive programming performance, difficulty breakdowns and algorithm practice synced live from LeetCode.
            </p>
          </div>

          {/* Action buttons styled with project button standards */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <button
              onClick={fetchLiveStats}
              disabled={loading}
              className="flex items-center gap-2 px-3.5 py-2 border border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 text-white/80 hover:text-white rounded transition-colors font-[doner] text-[9px] tracking-[0.16em] uppercase"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin text-red-400" : ""}`} />
              <span>{loading ? "Syncing..." : "Live Sync"}</span>
            </button>

            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors font-[doner] text-[9px] tracking-[0.16em] uppercase font-medium"
            >
              <SiLeetcode className="w-3 h-3" />
              <span>View Profile</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ==========================================================
            META STRIP (Profile + Live Status)
            ========================================================== */}
        <div className="w-full bg-white/[0.02] border border-white/[0.08] px-4 py-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs font-[doner]">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-white/80 tracking-wide">
              @{USERNAME}
            </span>
          </div>

          <div className="tracking-[0.14em] text-[10px] text-white/40 uppercase">
            STATUS:{" "}
            <span className="text-red-500/90 font-medium">
              SYNCED ({lastSync})
            </span>
          </div>
        </div>

        {/* ==========================================================
            DIFFICULTY BREAKDOWN SECTION
            ========================================================== */}
        <div className="mt-12">
          {/* Subheader */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <span className="font-[doner] text-[10px] tracking-[0.2em] uppercase text-white/70">
              DIFFICULTY BREAKDOWN
            </span>
            <span className="font-[doner] text-[10px] tracking-[0.16em] text-red-500/80 uppercase">
              {stats.totalSolved} Solved
            </span>
          </div>

          {/* Main Display: Circular Gauge (Left) + Detailed Rows (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] items-center gap-8 md:gap-14 py-8">
            {/* LEFT: CIRCULAR GAUGE */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 170 170">
                  {/* Outer circle track */}
                  <circle
                    cx="85"
                    cy="85"
                    r={radius}
                    className="stroke-white/[0.08]"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="85"
                    cy="85"
                    r={radius}
                    className="stroke-red-500/60 transition-all duration-700"
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - angleSweep / 360)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  {/* Glowing Indicator Knob */}
                  <circle
                    cx={knobX}
                    cy={knobY}
                    r="5"
                    className="fill-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  />
                </svg>

                {/* Inner stats text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-[doner] text-4xl font-semibold text-[#F1F0EC] leading-none">
                    {stats.totalSolved}
                  </span>
                  <span className="font-mono text-[11px] text-white/40 mt-1">
                    / {stats.totalQuestions}
                  </span>
                  <span className="font-[doner] text-[8px] uppercase tracking-[0.18em] text-white/30 mt-1">
                    Total Solved
                  </span>
                </div>
              </div>

              {/* Sub-metrics underneath */}
              <div className="flex items-center gap-4 mt-3 text-[10px] font-[doner] uppercase tracking-[0.14em] text-white/40">
                <span>Rank #{stats.ranking.toLocaleString()}</span>
                <span>•</span>
                <span className="text-emerald-400/90">{stats.acceptanceRate}% ACC</span>
              </div>
            </div>

            {/* RIGHT: DIFFICULTY ROWS */}
            <div className="w-full divide-y divide-white/[0.08]">
              {/* EASY ROW */}
              <div
                onMouseEnter={() => setActiveHover("easy")}
                onMouseLeave={() => setActiveHover(null)}
                className={`py-5 flex items-center justify-between transition-colors ${
                  activeHover === "easy" ? "bg-white/[0.02] px-2.5 rounded" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00B8A3] shadow-[0_0_8px_rgba(0,184,163,0.7)]" />
                  <span className="font-[doner] text-sm tracking-wide text-white/90">
                    Easy
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-white/70">
                    {stats.easySolved} <span className="text-white/30">/ {stats.totalEasy}</span>
                  </span>
                  {/* Progress bar */}
                  <div className="w-24 sm:w-44 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00B8A3] rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max((stats.easySolved / stats.totalEasy) * 100 * 3.5, 12)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* MEDIUM ROW */}
              <div
                onMouseEnter={() => setActiveHover("medium")}
                onMouseLeave={() => setActiveHover(null)}
                className={`py-5 flex items-center justify-between transition-colors ${
                  activeHover === "medium" ? "bg-white/[0.02] px-2.5 rounded" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC01E] shadow-[0_0_8px_rgba(255,192,30,0.7)]" />
                  <span className="font-[doner] text-sm tracking-wide text-white/90">
                    Med.
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-white/70">
                    {stats.mediumSolved} <span className="text-white/30">/ {stats.totalMedium}</span>
                  </span>
                  {/* Progress bar */}
                  <div className="w-24 sm:w-44 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFC01E] rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.max((stats.mediumSolved / stats.totalMedium) * 100 * 12, 6)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* HARD ROW */}
              <div
                onMouseEnter={() => setActiveHover("hard")}
                onMouseLeave={() => setActiveHover(null)}
                className={`py-5 flex items-center justify-between transition-colors ${
                  activeHover === "hard" ? "bg-white/[0.02] px-2.5 rounded" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF375F] shadow-[0_0_8px_rgba(255,55,95,0.7)]" />
                  <span className="font-[doner] text-sm tracking-wide text-white/90">
                    Hard
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-white/70">
                    {stats.hardSolved} <span className="text-white/30">/ {stats.totalHard}</span>
                  </span>
                  {/* Progress bar */}
                  <div className="w-24 sm:w-44 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF375F] rounded-full transition-all duration-700"
                      style={{
                        width: `${(stats.hardSolved / stats.totalHard) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeAnalytics;
