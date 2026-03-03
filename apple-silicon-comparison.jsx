import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, CartesianGrid, Legend, AreaChart, Area
} from "recharts";

const CHIPS = {
  base: [
    { name: "M1", release: "Nov 2020", process: "5nm", cpu: "8-core", cpuConfig: "4P + 4E", gpu: "8-core", neuralEngine: 16, maxRam: 16, bandwidth: 68, transistors: 16, scScore: 2350, mcScore: 8500, gpuScore: 23000, aiTops: 11, gen: 1 },
    { name: "M2", release: "Jun 2022", process: "5nm", cpu: "8-core", cpuConfig: "4P + 4E", gpu: "10-core", neuralEngine: 16, maxRam: 24, bandwidth: 100, transistors: 20, scScore: 2600, mcScore: 9800, gpuScore: 30000, aiTops: 15.8, gen: 2 },
    { name: "M3", release: "Oct 2023", process: "3nm", cpu: "8-core", cpuConfig: "4P + 4E", gpu: "10-core", neuralEngine: 16, maxRam: 24, bandwidth: 100, transistors: 25, scScore: 3050, mcScore: 11800, gpuScore: 35000, aiTops: 18, gen: 3 },
    { name: "M4", release: "May 2024", process: "3nm (2nd)", cpu: "10-core", cpuConfig: "4P + 6E", gpu: "10-core", neuralEngine: 16, maxRam: 32, bandwidth: 120, transistors: 28, scScore: 3800, mcScore: 14500, gpuScore: 42000, aiTops: 38, gen: 4 },
    { name: "M5", release: "Oct 2025", process: "3nm (3rd)", cpu: "10-core", cpuConfig: "4P + 6E", gpu: "10-core", neuralEngine: 16, maxRam: 32, bandwidth: 153, transistors: 30, scScore: 3900, mcScore: 15200, gpuScore: 63000, aiTops: 42, gen: 5 },
  ],
  pro: [
    { name: "M1 Pro", release: "Oct 2021", process: "5nm", cpu: "10-core", cpuConfig: "8P + 2E", gpu: "16-core", neuralEngine: 16, maxRam: 32, bandwidth: 200, transistors: 33.7, scScore: 2400, mcScore: 12400, gpuScore: 40000, aiTops: 11, gen: 1 },
    { name: "M2 Pro", release: "Jan 2023", process: "5nm", cpu: "12-core", cpuConfig: "8P + 4E", gpu: "19-core", neuralEngine: 16, maxRam: 32, bandwidth: 200, transistors: 40, scScore: 2650, mcScore: 14600, gpuScore: 52000, aiTops: 15.8, gen: 2 },
    { name: "M3 Pro", release: "Oct 2023", process: "3nm", cpu: "12-core", cpuConfig: "6P + 6E", gpu: "18-core", neuralEngine: 16, maxRam: 36, bandwidth: 150, transistors: 37, scScore: 3000, mcScore: 14500, gpuScore: 55000, aiTops: 18, gen: 3 },
    { name: "M4 Pro", release: "Nov 2024", process: "3nm (2nd)", cpu: "14-core", cpuConfig: "10P + 4E", gpu: "20-core", neuralEngine: 16, maxRam: 48, bandwidth: 273, transistors: 55, scScore: 3850, mcScore: 17500, gpuScore: 68000, aiTops: 38, gen: 4 },
    { name: "M5 Pro", release: "Mar 2026", process: "3nm Fusion", cpu: "18-core", cpuConfig: "6S + 12P", gpu: "20-core", neuralEngine: 16, maxRam: 64, bandwidth: 307, transistors: 60, scScore: 4100, mcScore: 22700, gpuScore: 135000, aiTops: 58, gen: 5 },
  ],
  max: [
    { name: "M1 Max", release: "Oct 2021", process: "5nm", cpu: "10-core", cpuConfig: "8P + 2E", gpu: "32-core", neuralEngine: 16, maxRam: 64, bandwidth: 400, transistors: 57, scScore: 2400, mcScore: 12600, gpuScore: 68000, aiTops: 11, gen: 1 },
    { name: "M2 Max", release: "Jan 2023", process: "5nm", cpu: "12-core", cpuConfig: "8P + 4E", gpu: "38-core", neuralEngine: 16, maxRam: 96, bandwidth: 400, transistors: 67, scScore: 2750, mcScore: 14900, gpuScore: 88000, aiTops: 15.8, gen: 2 },
    { name: "M3 Max", release: "Oct 2023", process: "3nm", cpu: "16-core", cpuConfig: "12P + 4E", gpu: "40-core", neuralEngine: 16, maxRam: 128, bandwidth: 400, transistors: 92, scScore: 3100, mcScore: 19500, gpuScore: 92000, aiTops: 18, gen: 3 },
    { name: "M4 Max", release: "Nov 2024", process: "3nm (2nd)", cpu: "16-core", cpuConfig: "12P + 4E", gpu: "40-core", neuralEngine: 16, maxRam: 128, bandwidth: 546, transistors: 108, scScore: 3900, mcScore: 21400, gpuScore: 140000, aiTops: 38, gen: 4 },
    { name: "M5 Max", release: "Mar 2026", process: "3nm Fusion", cpu: "18-core", cpuConfig: "6S + 12P", gpu: "40-core", neuralEngine: 16, maxRam: 128, bandwidth: 614, transistors: 115, scScore: 4500, mcScore: 32400, gpuScore: 250000, aiTops: 72, gen: 5 },
  ]
};

const TIER_COLORS = {
  base: { primary: "#00C9A7", secondary: "#00C9A720" },
  pro: { primary: "#845EF7", secondary: "#845EF720" },
  max: { primary: "#FF6B6B", secondary: "#FF6B6B20" }
};

const GEN_COLORS = ["#64748b", "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981"];
const GEN_NAMES = ["Gen 1", "Gen 2", "Gen 3", "Gen 4", "Gen 5"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #ffffff15", borderRadius: 12, padding: "12px 16px", fontFamily: "Haffer, system-ui, sans-serif" }}>
      <p style={{ color: "#fff", fontWeight: 600, marginBottom: 6, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: "2px 0" }}>
          {p.name}: <span style={{ fontWeight: 700 }}>{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </p>
      ))}
    </div>
  );
};

function ChipCard({ chip, tier, isSelected, onClick }) {
  const tc = TIER_COLORS[tier];
  const isNew = chip.name.includes("M5");
  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? `${tc.primary}15` : "#ffffff06",
        border: `1px solid ${isSelected ? tc.primary + "60" : "#ffffff10"}`,
        borderRadius: 16,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        minWidth: 140,
      }}
    >
      {isNew && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: "#FF6B6B",
          borderRadius: 20, padding: "2px 8px", fontSize: 9, fontWeight: 700,
          color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase"
        }}>NEW</div>
      )}
      <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{chip.name}</div>
      <div style={{ fontSize: 11, color: "#ffffff50", marginTop: 4, fontWeight: 500 }}>{chip.release}</div>
      <div style={{ fontSize: 10, color: tc.primary, marginTop: 6, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{chip.process}</div>
    </div>
  );
}

function StatBlock({ label, value, unit, color, subtext }) {
  return (
    <div style={{ textAlign: "center", padding: "12px 8px" }}>
      <div style={{ fontSize: 11, color: "#ffffff40", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 600, color: color || "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && <span style={{ fontSize: 12, color: "#ffffff40", marginLeft: 4, fontWeight: 500 }}>{unit}</span>}
      </div>
      {subtext && <div style={{ fontSize: 10, color: "#ffffff30", marginTop: 4 }}>{subtext}</div>}
    </div>
  );
}

function SectionTitle({ children, accent }) {
  return (
    <div style={{ marginBottom: 24, marginTop: 48 }}>
      <h2 style={{
        fontSize: 24, fontWeight: 600, color: "#fff",
        letterSpacing: "-0.03em", margin: 0,
        display: "flex", alignItems: "center", gap: 12
      }}>
        <span style={{ width: 4, height: 24, background: accent || "#845EF7", borderRadius: 2, display: "inline-block" }}></span>
        {children}
      </h2>
    </div>
  );
}

function PerformanceChart({ data, dataKey, title, color, unit }) {
  return (
    <div style={{ background: "#ffffff04", borderRadius: 20, padding: "24px 20px", border: "1px solid #ffffff08" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={28} barGap={4}>
          <XAxis dataKey="name" tick={{ fill: "#ffffff50", fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} width={50} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={dataKey} radius={[6, 6, 0, 0]} fill={color}>
            {data.map((entry, i) => (
              <rect key={i} fill={entry.name.includes("M5") ? color : color + "80"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function AppleSiliconDashboard() {
  const [activeTier, setActiveTier] = useState("all");
  const [selectedChip, setSelectedChip] = useState(null);
  const [activeCompare, setActiveCompare] = useState("singlecore");

  const tiers = ["all", "base", "pro", "max"];

  const getFilteredData = () => {
    if (activeTier === "all") {
      return [...CHIPS.base, ...CHIPS.pro, ...CHIPS.max];
    }
    return CHIPS[activeTier];
  };

  const getTimelineData = () => {
    const generations = [1, 2, 3, 4, 5];
    return generations.map(gen => {
      const base = CHIPS.base.find(c => c.gen === gen);
      const pro = CHIPS.pro.find(c => c.gen === gen);
      const max = CHIPS.max.find(c => c.gen === gen);
      return {
        gen: `Gen ${gen}`,
        release: base?.release || pro?.release,
        Base: base?.scScore || 0,
        Pro: pro?.scScore || 0,
        Max: max?.scScore || 0,
        baseMC: base?.mcScore || 0,
        proMC: pro?.mcScore || 0,
        maxMC: max?.mcScore || 0,
        baseGPU: base?.gpuScore || 0,
        proGPU: pro?.gpuScore || 0,
        maxGPU: max?.gpuScore || 0,
        baseBW: base?.bandwidth || 0,
        proBW: pro?.bandwidth || 0,
        maxBW: max?.bandwidth || 0,
        baseRAM: base?.maxRam || 0,
        proRAM: pro?.maxRam || 0,
        maxRAM: max?.maxRam || 0,
      };
    });
  };

  const getCompareMetric = () => {
    switch (activeCompare) {
      case "singlecore": return { key: "scScore", label: "Single-Core (Geekbench 6)", color: "#845EF7" };
      case "multicore": return { key: "mcScore", label: "Multi-Core (Geekbench 6)", color: "#00C9A7" };
      case "gpu": return { key: "gpuScore", label: "GPU Metal Score", color: "#FF6B6B" };
      case "bandwidth": return { key: "bandwidth", label: "Memory Bandwidth (GB/s)", color: "#3b82f6" };
      case "ram": return { key: "maxRam", label: "Max Unified Memory (GB)", color: "#f59e0b" };
      default: return { key: "scScore", label: "Single-Core", color: "#845EF7" };
    }
  };

  const timelineData = getTimelineData();
  const metric = getCompareMetric();

  const compareKeys = {
    singlecore: { base: "Base", pro: "Pro", max: "Max" },
    multicore: { base: "baseMC", pro: "proMC", max: "maxMC" },
    gpu: { base: "baseGPU", pro: "proGPU", max: "maxGPU" },
    bandwidth: { base: "baseBW", pro: "proBW", max: "maxBW" },
    ram: { base: "baseRAM", pro: "proRAM", max: "maxRAM" },
  };

  const ck = compareKeys[activeCompare];

  const getGainPercent = (chips) => {
    if (chips.length < 2) return null;
    const first = chips[0];
    const last = chips[chips.length - 1];
    return Math.round(((last.scScore - first.scScore) / first.scScore) * 100);
  };

  return (
    <div style={{
      fontFamily: "Haffer, 'SF Pro Display', system-ui, -apple-system, sans-serif",
      background: "#0a0a14",
      color: "#fff",
      minHeight: "100vh",
      padding: "0",
      overflowX: "hidden",
    }}>
      {/* Hero Header */}
      <div style={{
        background: "#11112a",
        padding: "48px 32px 40px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400,
          background: "#845EF715",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -50, left: -50,
          width: 300, height: 300,
          background: "#00C9A710",
          borderRadius: "50%",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: "#FF6B6B",
            borderRadius: 20, padding: "4px 12px",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 16, color: "#fff"
          }}>
            M5 Pro & M5 Max - Just Announced Today
          </div>

          <h1 style={{
            fontSize: 48, fontWeight: 600, letterSpacing: "-0.04em",
            lineHeight: 1.05, margin: "0 0 12px",
            color: "#fff",
          }}>
            Apple Silicon<br />The Complete Picture
          </h1>
          <p style={{ fontSize: 15, color: "#ffffff40", fontWeight: 500, maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
            Every M-series chip from M1 to M5 - benchmarked, compared, and visualized. Five generations of Apple's silicon revolution.
          </p>

          {/* Quick Stats */}
          <div style={{
            display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap",
          }}>
            {[
              { label: "Generations", value: "5", sub: "2020 - 2026" },
              { label: "Chip Variants", value: "15", sub: "Base + Pro + Max" },
              { label: "M5 Max SC", value: "4,500", sub: "Geekbench 6 est." },
              { label: "Peak Bandwidth", value: "614", sub: "GB/s (M5 Max)" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: "#ffffff30", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: "#fff", letterSpacing: "-0.03em", marginTop: 2 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#ffffff25", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 64px" }}>

        {/* Tier Navigation */}
        <div style={{ display: "flex", gap: 8, marginTop: 32, marginBottom: 32, flexWrap: "wrap" }}>
          {tiers.map(t => (
            <button
              key={t}
              onClick={() => { setActiveTier(t); setSelectedChip(null); }}
              style={{
                background: activeTier === t
                  ? t === "all" ? "#845EF7" : TIER_COLORS[t]?.primary || "#845EF7"
                  : "#ffffff08",
                border: "none",
                borderRadius: 12,
                padding: "10px 24px",
                color: activeTier === t ? "#fff" : "#ffffff50",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {t === "all" ? "All Chips" : t}
            </button>
          ))}
        </div>

        {/* Chip Grid */}
        {activeTier === "all" ? (
          <>
            {["base", "pro", "max"].map(tier => (
              <div key={tier} style={{ marginBottom: 24 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: TIER_COLORS[tier].primary,
                  textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
                  display: "flex", alignItems: "center", gap: 8
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: TIER_COLORS[tier].primary, display: "inline-block" }}></span>
                  {tier} Series
                </div>
                <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
                  {CHIPS[tier].map(chip => (
                    <ChipCard
                      key={chip.name}
                      chip={chip}
                      tier={tier}
                      isSelected={selectedChip?.name === chip.name}
                      onClick={() => setSelectedChip(selectedChip?.name === chip.name ? null : chip)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8 }}>
            {CHIPS[activeTier].map(chip => (
              <ChipCard
                key={chip.name}
                chip={chip}
                tier={activeTier}
                isSelected={selectedChip?.name === chip.name}
                onClick={() => setSelectedChip(selectedChip?.name === chip.name ? null : chip)}
              />
            ))}
          </div>
        )}

        {/* Selected Chip Detail */}
        {selectedChip && (
          <div style={{
            background: "#ffffff06",
            borderRadius: 24, padding: 28,
            border: "1px solid #ffffff10",
            marginTop: 24,
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.04em" }}>{selectedChip.name}</div>
                <div style={{ fontSize: 13, color: "#ffffff40", marginTop: 4 }}>Released {selectedChip.release} - {selectedChip.process} process</div>
              </div>
              <div style={{ fontSize: 12, color: "#ffffff30", background: "#ffffff08", borderRadius: 12, padding: "8px 16px" }}>
                {selectedChip.cpu} CPU ({selectedChip.cpuConfig}) - {selectedChip.gpu} GPU
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 4, marginTop: 20 }}>
              <StatBlock label="Single-Core" value={selectedChip.scScore} color="#845EF7" subtext="Geekbench 6" />
              <StatBlock label="Multi-Core" value={selectedChip.mcScore} color="#00C9A7" subtext="Geekbench 6" />
              <StatBlock label="GPU Metal" value={selectedChip.gpuScore} color="#FF6B6B" subtext="Geekbench 6" />
              <StatBlock label="Bandwidth" value={selectedChip.bandwidth} unit="GB/s" color="#3b82f6" />
              <StatBlock label="Max RAM" value={selectedChip.maxRam} unit="GB" color="#f59e0b" />
              <StatBlock label="AI TOPS" value={selectedChip.aiTops} color="#FF8E53" subtext="Neural Engine" />
            </div>
          </div>
        )}

        {/* Cross-Generation Comparison */}
        <SectionTitle accent="#845EF7">Cross-Generation Performance</SectionTitle>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { key: "singlecore", label: "Single-Core" },
            { key: "multicore", label: "Multi-Core" },
            { key: "gpu", label: "GPU Metal" },
            { key: "bandwidth", label: "Bandwidth" },
            { key: "ram", label: "Max RAM" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveCompare(tab.key)}
              style={{
                background: activeCompare === tab.key ? "#ffffff15" : "#ffffff06",
                border: `1px solid ${activeCompare === tab.key ? "#ffffff25" : "#ffffff08"}`,
                borderRadius: 10, padding: "8px 18px",
                color: activeCompare === tab.key ? "#fff" : "#ffffff40",
                fontWeight: 600, fontSize: 12, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#ffffff04", borderRadius: 20, padding: "28px 20px", border: "1px solid #ffffff08" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {metric.label}
          </div>
          <div style={{ fontSize: 11, color: "#ffffff25", marginBottom: 20 }}>
            Base vs Pro vs Max across all generations
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData} barSize={20} barGap={2} barCategoryGap="20%">
              <CartesianGrid stroke="#ffffff08" vertical={false} />
              <XAxis dataKey="gen" tick={{ fill: "#ffffff50", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "#ffffff60" }} />
              <Bar dataKey={ck.base} name="Base" fill={TIER_COLORS.base.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey={ck.pro} name="Pro" fill={TIER_COLORS.pro.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey={ck.max} name="Max" fill={TIER_COLORS.max.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Generation-over-Generation Line Charts */}
        <SectionTitle accent="#00C9A7">Generation-over-Generation Trends</SectionTitle>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
          {/* SC Trend */}
          <div style={{ background: "#ffffff04", borderRadius: 20, padding: "24px 20px", border: "1px solid #ffffff08" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Single-Core Progression</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timelineData}>
                <CartesianGrid stroke="#ffffff06" vertical={false} />
                <XAxis dataKey="gen" tick={{ fill: "#ffffff40", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff25", fontSize: 10 }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="Base" stroke={TIER_COLORS.base.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.base.primary }} />
                <Line type="monotone" dataKey="Pro" stroke={TIER_COLORS.pro.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.pro.primary }} />
                <Line type="monotone" dataKey="Max" stroke={TIER_COLORS.max.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.max.primary }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GPU Trend */}
          <div style={{ background: "#ffffff04", borderRadius: 20, padding: "24px 20px", border: "1px solid #ffffff08" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>GPU Metal Progression</div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={timelineData}>
                <CartesianGrid stroke="#ffffff06" vertical={false} />
                <XAxis dataKey="gen" tick={{ fill: "#ffffff40", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff25", fontSize: 10 }} axisLine={false} tickLine={false} width={45} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="baseGPU" name="Base" stroke={TIER_COLORS.base.primary} fill={TIER_COLORS.base.primary + "20"} strokeWidth={2} />
                <Area type="monotone" dataKey="proGPU" name="Pro" stroke={TIER_COLORS.pro.primary} fill={TIER_COLORS.pro.primary + "20"} strokeWidth={2} />
                <Area type="monotone" dataKey="maxGPU" name="Max" stroke={TIER_COLORS.max.primary} fill={TIER_COLORS.max.primary + "20"} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bandwidth Trend */}
          <div style={{ background: "#ffffff04", borderRadius: 20, padding: "24px 20px", border: "1px solid #ffffff08" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Memory Bandwidth (GB/s)</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={timelineData}>
                <CartesianGrid stroke="#ffffff06" vertical={false} />
                <XAxis dataKey="gen" tick={{ fill: "#ffffff40", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff25", fontSize: 10 }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="baseBW" name="Base" stroke={TIER_COLORS.base.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.base.primary }} />
                <Line type="monotone" dataKey="proBW" name="Pro" stroke={TIER_COLORS.pro.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.pro.primary }} />
                <Line type="monotone" dataKey="maxBW" name="Max" stroke={TIER_COLORS.max.primary} strokeWidth={2.5} dot={{ r: 4, fill: TIER_COLORS.max.primary }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* RAM Trend */}
          <div style={{ background: "#ffffff04", borderRadius: 20, padding: "24px 20px", border: "1px solid #ffffff08" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff60", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Max Unified Memory (GB)</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={timelineData} barSize={16} barGap={2}>
                <CartesianGrid stroke="#ffffff06" vertical={false} />
                <XAxis dataKey="gen" tick={{ fill: "#ffffff40", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff25", fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="baseRAM" name="Base" fill={TIER_COLORS.base.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="proRAM" name="Pro" fill={TIER_COLORS.pro.primary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="maxRAM" name="Max" fill={TIER_COLORS.max.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-Tier Deep Dive */}
        {["base", "pro", "max"].map(tier => (
          <div key={tier}>
            <SectionTitle accent={TIER_COLORS[tier].primary}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Series Deep Dive
            </SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              <PerformanceChart
                data={CHIPS[tier].map(c => ({ name: c.name, score: c.scScore }))}
                dataKey="score"
                title="Single-Core"
                color={TIER_COLORS[tier].primary}
              />
              <PerformanceChart
                data={CHIPS[tier].map(c => ({ name: c.name, score: c.mcScore }))}
                dataKey="score"
                title="Multi-Core"
                color={TIER_COLORS[tier].primary + "CC"}
              />
              <PerformanceChart
                data={CHIPS[tier].map(c => ({ name: c.name, score: c.gpuScore }))}
                dataKey="score"
                title="GPU Metal"
                color={TIER_COLORS[tier].primary + "99"}
              />
            </div>

            {/* Spec Table */}
            <div style={{
              background: "#ffffff04", borderRadius: 20,
              border: "1px solid #ffffff08", overflow: "hidden",
              marginTop: 20,
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #ffffff10" }}>
                      {["Chip", "Released", "Process", "CPU", "Config", "GPU", "Max RAM", "BW (GB/s)", "AI TOPS", "Transistors (B)"].map(h => (
                        <th key={h} style={{
                          padding: "14px 16px", textAlign: "left",
                          color: "#ffffff35", fontWeight: 700, fontSize: 10,
                          textTransform: "uppercase", letterSpacing: "0.08em",
                          whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CHIPS[tier].map((chip, i) => (
                      <tr key={chip.name} style={{
                        borderBottom: i < CHIPS[tier].length - 1 ? "1px solid #ffffff06" : "none",
                        background: chip.name.includes("M5") ? `${TIER_COLORS[tier].primary}08` : "transparent",
                      }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
                          {chip.name}
                          {chip.name.includes("M5") && (
                            <span style={{
                              marginLeft: 8, fontSize: 8, fontWeight: 700,
                              background: "#FF6B6B",
                              borderRadius: 10, padding: "2px 6px", color: "#fff",
                              verticalAlign: "middle",
                            }}>NEW</span>
                          )}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#ffffff60", whiteSpace: "nowrap" }}>{chip.release}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff60" }}>{chip.process}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff80", fontWeight: 600 }}>{chip.cpu}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff50", fontSize: 11 }}>{chip.cpuConfig}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff80", fontWeight: 600 }}>{chip.gpu}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff80", fontWeight: 600 }}>{chip.maxRam}GB</td>
                        <td style={{ padding: "12px 16px", color: TIER_COLORS[tier].primary, fontWeight: 700 }}>{chip.bandwidth}</td>
                        <td style={{ padding: "12px 16px", color: "#FF8E53", fontWeight: 600 }}>{chip.aiTops}</td>
                        <td style={{ padding: "12px 16px", color: "#ffffff50" }}>{chip.transistors}B</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        {/* M5 Highlight Section */}
        <SectionTitle accent="#FF6B6B">M5 Generation - The Big Numbers</SectionTitle>

        <div style={{
          background: "#ffffff06",
          borderRadius: 24, padding: 32,
          border: "1px solid #ffffff10",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              { label: "M5 vs M1 Single-Core", value: "+66%", color: "#845EF7", detail: "2,350 -> 3,900" },
              { label: "M5 Pro vs M1 Pro Multi-Core", value: "+83%", color: "#00C9A7", detail: "12,400 -> 22,700" },
              { label: "M5 Max vs M1 Max GPU", value: "+268%", color: "#FF6B6B", detail: "68K -> 250K Metal" },
              { label: "M5 Max Bandwidth vs M1 Max", value: "+54%", color: "#3b82f6", detail: "400 -> 614 GB/s" },
              { label: "M5 Pro CPU Cores vs M1 Pro", value: "+80%", color: "#f59e0b", detail: "10 -> 18 cores" },
              { label: "M5 Pro Max RAM vs M1 Pro", value: "+100%", color: "#FF8E53", detail: "32GB -> 64GB" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "#ffffff06",
                borderRadius: 16, padding: "20px 24px",
                border: "1px solid #ffffff08",
              }}>
                <div style={{ fontSize: 10, color: "#ffffff35", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{stat.label}</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: stat.color, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#ffffff25", marginTop: 6 }}>{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Evolution */}
        <SectionTitle accent="#3b82f6">Architecture Evolution</SectionTitle>

        <div style={{
          background: "#ffffff04", borderRadius: 20,
          border: "1px solid #ffffff08", padding: 28,
        }}>
          <div style={{ display: "flex", gap: 0, position: "relative", overflow: "auto" }}>
            {CHIPS.base.map((chip, i) => (
              <div key={chip.name} style={{
                flex: 1, minWidth: 180,
                padding: "20px 16px",
                borderRight: i < CHIPS.base.length - 1 ? "1px solid #ffffff08" : "none",
                position: "relative",
              }}>
                {i > 0 && (
                  <div style={{
                    position: "absolute", top: 28, left: -12,
                    fontSize: 16, color: "#ffffff15",
                  }}>→</div>
                )}
                <div style={{
                  fontSize: 18, fontWeight: 600, color: GEN_COLORS[i],
                  marginBottom: 12,
                }}>{chip.name}</div>
                <div style={{ fontSize: 10, color: "#ffffff30", marginBottom: 12 }}>{chip.release}</div>

                {[
                  { label: "Process", value: chip.process },
                  { label: "CPU", value: chip.cpuConfig },
                  { label: "GPU", value: chip.gpu },
                  { label: "Memory", value: `${chip.maxRam}GB` },
                  { label: "BW", value: `${chip.bandwidth} GB/s` },
                  { label: "Neural", value: `${chip.aiTops} TOPS` },
                ].map(spec => (
                  <div key={spec.label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #ffffff04" }}>
                    <span style={{ fontSize: 10, color: "#ffffff30" }}>{spec.label}</span>
                    <span style={{ fontSize: 10, color: "#ffffff70", fontWeight: 600 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaway */}
        <div style={{
          marginTop: 48,
          background: "#11112a",
          borderRadius: 24, padding: "32px 36px",
          border: "1px solid #ffffff10",
        }}>
          <div style={{ fontSize: 11, color: "#845EF7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Key Takeaway</div>
          <div style={{ fontSize: 18, fontWeight: 500, color: "#ffffff90", lineHeight: 1.6, maxWidth: 700 }}>
            The M5 Pro and M5 Max introduce Apple's first <span style={{ color: "#fff" }}>Fusion Architecture</span> with dual-die design. The M5 Max delivers <span style={{ color: "#FF6B6B" }}>2.5x</span> the multi-core performance of M1 Max, while GPU compute has jumped <span style={{ color: "#00C9A7" }}>over 3.5x</span> in five generations.
          </div>
          <div style={{ fontSize: 12, color: "#ffffff25", marginTop: 16 }}>
            Benchmark data from Geekbench 6. M5 Pro and M5 Max scores are estimated based on Apple's claims and early leaks. Real-world numbers may vary.
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #ffffff08" }}>
          <div style={{ fontSize: 10, color: "#ffffff20", fontWeight: 500, letterSpacing: "0.05em" }}>
            Data compiled March 4, 2026 - All benchmark scores are Geekbench 6 based
          </div>
        </div>
      </div>
    </div>
  );
}
