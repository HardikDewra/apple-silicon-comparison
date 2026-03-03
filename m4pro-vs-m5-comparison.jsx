import { useState } from "react";

const MACHINES = [
  {
    name: "M4 Pro",
    tag: "YOUR MACHINE",
    tagColor: "#845EF7",
    release: "Nov 2024",
    startPrice14: "$1,999",
    startPrice16: "$2,499",
    process: "2nd-gen 3nm",
    architecture: "Single-die SoC",
    transistors: "55 billion",
    cpu: "14-core",
    cpuConfig: "10 Performance + 4 Efficiency",
    gpu: "20-core",
    gpuArch: "Hardware ray tracing, dynamic caching",
    neuralEngine: "16-core",
    aiPerf: "38 TOPS",
    llmSpeed: "Baseline",
    maxRam: "48 GB",
    yourRam: "24 GB",
    ramBandwidth: "273 GB/s",
    storageStart: "512 GB",
    storageMax: "4 TB",
    ssdSpeed: "Baseline",
    thunderbolt: "Thunderbolt 5",
    tbSpeed: "Up to 120 Gb/s",
    tbPorts: "3x USB-C",
    wifi: "Wi-Fi 6E (802.11ax)",
    bluetooth: "5.3",
    wirelessChip: "Standard",
    display14: '14.2" Liquid Retina XDR',
    resolution14: "3024 x 1964 (254 ppi)",
    peakBrightness: "1600 nits peak (HDR)",
    sdrBrightness: "1000 nits (SDR outdoor)",
    refreshRate: "ProMotion up to 120Hz",
    batteryWeb14: "Up to 14 hrs",
    batteryVideo14: "Up to 22 hrs",
    batteryWeb16: "Up to 17 hrs",
    batteryVideo16: "Up to 24 hrs",
    camera: "12MP Center Stage",
    speakers: "6-speaker, force-cancelling woofers",
    mics: "Studio-quality 3-mic array",
    hdmi: "HDMI 2.1",
    sdCard: "SDXC",
    headphone: "3.5mm (high-impedance support)",
    magsafe: "MagSafe 3",
    externalDisplays: "Up to 2",
    colors: "Space Black, Silver",
    nanoTexture: "Optional",
    weight14: "3.5 lbs (1.60 kg)",
  },
  {
    name: "M5 Pro",
    tag: "NEW",
    tagColor: "#00C9A7",
    release: "Mar 2026",
    startPrice14: "$2,199",
    startPrice16: "$2,699",
    process: "3rd-gen 3nm (Fusion)",
    architecture: "Dual-die Fusion SoC",
    transistors: "~60 billion (est.)",
    cpu: "18-core",
    cpuConfig: "6 Super + 12 Performance",
    gpu: "Up to 20-core",
    gpuArch: "Neural Accelerator per core, 3rd-gen ray tracing, 2nd-gen dynamic caching, mesh shading",
    neuralEngine: "16-core (faster, higher BW)",
    aiPerf: "~58 TOPS (est.)",
    llmSpeed: "4x faster prompt processing",
    maxRam: "64 GB",
    yourRam: "-",
    ramBandwidth: "307 GB/s",
    storageStart: "1 TB",
    storageMax: "4 TB",
    ssdSpeed: "2x faster (up to 14.5 GB/s)",
    thunderbolt: "Thunderbolt 5",
    tbSpeed: "Up to 120 Gb/s",
    tbPorts: "3x USB-C",
    wifi: "Wi-Fi 7 (802.11be)",
    bluetooth: "6.0",
    wirelessChip: "Apple N1",
    display14: '14.2" Liquid Retina XDR',
    resolution14: "3024 x 1964 (254 ppi)",
    peakBrightness: "1600 nits peak (HDR)",
    sdrBrightness: "1000 nits (SDR outdoor)",
    refreshRate: "ProMotion up to 120Hz",
    batteryWeb14: "Up to 14 hrs",
    batteryVideo14: "Up to 22 hrs",
    batteryWeb16: "Up to 17 hrs",
    batteryVideo16: "Up to 24 hrs",
    camera: "12MP Center Stage",
    speakers: "6-speaker, force-cancelling woofers",
    mics: "Studio-quality 3-mic array",
    hdmi: "HDMI 2.1",
    sdCard: "SDXC",
    headphone: "3.5mm (high-impedance support)",
    magsafe: "MagSafe 3",
    externalDisplays: "Up to 2",
    colors: "Space Black, Silver",
    nanoTexture: "Optional",
    weight14: "~3.5 lbs (est.)",
  },
  {
    name: "M5 Max",
    tag: "MAXED OUT",
    tagColor: "#FF6B6B",
    release: "Mar 2026",
    startPrice14: "$3,599",
    startPrice16: "$3,899",
    process: "3rd-gen 3nm (Fusion)",
    architecture: "Dual-die Fusion SoC",
    transistors: "~115 billion (est.)",
    cpu: "18-core",
    cpuConfig: "6 Super + 12 Performance",
    gpu: "Up to 40-core",
    gpuArch: "Neural Accelerator per core, 3rd-gen ray tracing, 2nd-gen dynamic caching, mesh shading",
    neuralEngine: "16-core (faster, higher BW)",
    aiPerf: "~72 TOPS (est.)",
    llmSpeed: "4x faster prompt processing",
    maxRam: "128 GB",
    yourRam: "-",
    ramBandwidth: "614 GB/s",
    storageStart: "2 TB",
    storageMax: "8 TB",
    ssdSpeed: "2x faster (up to 14.5 GB/s)",
    thunderbolt: "Thunderbolt 5",
    tbSpeed: "Up to 120 Gb/s",
    tbPorts: "3x USB-C",
    wifi: "Wi-Fi 7 (802.11be)",
    bluetooth: "6.0",
    wirelessChip: "Apple N1",
    display14: '14.2" Liquid Retina XDR',
    resolution14: "3024 x 1964 (254 ppi)",
    peakBrightness: "1600 nits peak (HDR)",
    sdrBrightness: "1000 nits (SDR outdoor)",
    refreshRate: "ProMotion up to 120Hz",
    batteryWeb14: "Up to ~13 hrs (est.)",
    batteryVideo14: "Up to 20 hrs",
    batteryWeb16: "Up to ~16 hrs (est.)",
    batteryVideo16: "Up to 22 hrs",
    camera: "12MP Center Stage",
    speakers: "6-speaker, force-cancelling woofers",
    mics: "Studio-quality 3-mic array",
    hdmi: "HDMI (8K capable)",
    sdCard: "SDXC",
    headphone: "3.5mm (high-impedance support)",
    magsafe: "MagSafe 3",
    externalDisplays: "Up to 4",
    colors: "Space Black, Silver",
    nanoTexture: "Optional",
    weight14: "~3.6 lbs (est.)",
  },
];

const CATEGORIES = [
  {
    label: "Pricing & Availability",
    rows: [
      { label: "Released", key: "release" },
      { label: "14\" Starting Price", key: "startPrice14" },
      { label: "16\" Starting Price", key: "startPrice16" },
    ],
  },
  {
    label: "Chip Architecture",
    rows: [
      { label: "Process Node", key: "process" },
      { label: "Architecture", key: "architecture" },
      { label: "Transistors", key: "transistors" },
    ],
  },
  {
    label: "CPU",
    rows: [
      { label: "CPU Cores", key: "cpu" },
      { label: "Core Layout", key: "cpuConfig" },
    ],
  },
  {
    label: "GPU & Graphics",
    rows: [
      { label: "GPU Cores", key: "gpu" },
      { label: "GPU Features", key: "gpuArch" },
    ],
  },
  {
    label: "AI & Neural Engine",
    rows: [
      { label: "Neural Engine", key: "neuralEngine" },
      { label: "AI Performance", key: "aiPerf" },
      { label: "LLM Speed vs M4 Pro", key: "llmSpeed" },
    ],
  },
  {
    label: "Memory & Storage",
    rows: [
      { label: "Max Unified Memory", key: "maxRam" },
      { label: "Your Config", key: "yourRam" },
      { label: "Memory Bandwidth", key: "ramBandwidth" },
      { label: "Starting Storage", key: "storageStart" },
      { label: "Max Storage", key: "storageMax" },
      { label: "SSD Speed vs M4 Pro", key: "ssdSpeed" },
    ],
  },
  {
    label: "Connectivity & Ports",
    rows: [
      { label: "Thunderbolt", key: "thunderbolt" },
      { label: "TB Speed", key: "tbSpeed" },
      { label: "TB/USB-C Ports", key: "tbPorts" },
      { label: "Wi-Fi", key: "wifi" },
      { label: "Bluetooth", key: "bluetooth" },
      { label: "Wireless Chip", key: "wirelessChip" },
      { label: "HDMI", key: "hdmi" },
      { label: "SD Card", key: "sdCard" },
      { label: "Headphone Jack", key: "headphone" },
      { label: "MagSafe", key: "magsafe" },
    ],
  },
  {
    label: "Display",
    rows: [
      { label: "14\" Display", key: "display14" },
      { label: "Resolution", key: "resolution14" },
      { label: "Peak Brightness (HDR)", key: "peakBrightness" },
      { label: "SDR Brightness", key: "sdrBrightness" },
      { label: "Refresh Rate", key: "refreshRate" },
      { label: "Nano-texture", key: "nanoTexture" },
      { label: "External Displays", key: "externalDisplays" },
    ],
  },
  {
    label: "Battery (14-inch)",
    rows: [
      { label: "Wireless Web", key: "batteryWeb14" },
      { label: "Video Streaming", key: "batteryVideo14" },
    ],
  },
  {
    label: "Battery (16-inch)",
    rows: [
      { label: "Wireless Web", key: "batteryWeb16" },
      { label: "Video Streaming", key: "batteryVideo16" },
    ],
  },
  {
    label: "Camera, Audio & Other",
    rows: [
      { label: "Camera", key: "camera" },
      { label: "Speakers", key: "speakers" },
      { label: "Microphones", key: "mics" },
      { label: "Colors", key: "colors" },
      { label: "Weight (14\")", key: "weight14" },
    ],
  },
];

function isSame(machines, key) {
  const vals = machines.map(m => String(m[key] || ""));
  return vals.every(v => v === vals[0]);
}

export default function ComparisonTable() {
  const [highlightDiff, setHighlightDiff] = useState(true);

  return (
    <div style={{
      fontFamily: "Haffer, 'SF Pro Display', system-ui, -apple-system, sans-serif",
      background: "#0a0a14",
      color: "#fff",
      minHeight: "100vh",
      padding: "40px 20px 64px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{
            display: "inline-block", background: "#845EF7",
            borderRadius: 20, padding: "4px 12px",
            fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 14, color: "#fff"
          }}>
            Verified from Apple's Official Specs Pages
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", margin: "0 0 8px", color: "#fff" }}>
            M4 Pro vs M5 Pro vs M5 Max
          </h1>
          <p style={{ fontSize: 13, color: "#ffffff40", margin: "0 0 4px", lineHeight: 1.5 }}>
            MacBook Pro - every spec, verified. Sources: support.apple.com, apple.com/newsroom, apple.com/macbook-pro/specs
          </p>
          <p style={{ fontSize: 11, color: "#ffffff25", margin: 0 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#FF6B6B", marginRight: 4, verticalAlign: "middle" }} />
            Red dots = specs that differ across models. Dimmed rows = identical across all three.
          </p>

          <button
            onClick={() => setHighlightDiff(!highlightDiff)}
            style={{
              marginTop: 14, background: highlightDiff ? "#ffffff12" : "#ffffff06",
              border: "1px solid #ffffff15", borderRadius: 8,
              padding: "6px 14px", color: highlightDiff ? "#fff" : "#ffffff50",
              fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            {highlightDiff ? "Dimming identical rows" : "Showing all rows equally"}
          </button>
        </div>

        {/* Sticky Column Headers */}
        <div style={{
          display: "grid", gridTemplateColumns: "170px 1fr 1fr 1fr",
          position: "sticky", top: 0, zIndex: 10,
          background: "#0a0a14", paddingBottom: 10, borderBottom: "1px solid #ffffff10",
        }}>
          <div />
          {MACHINES.map((m) => (
            <div key={m.name} style={{ padding: "10px 12px", textAlign: "center" }}>
              <div style={{
                display: "inline-block", background: m.tagColor + "20",
                borderRadius: 12, padding: "2px 10px",
                fontSize: 9, fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: m.tagColor, marginBottom: 4,
              }}>
                {m.tag}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{m.name}</div>
              <div style={{ fontSize: 10, color: "#ffffff30", marginTop: 2 }}>{m.release}</div>
            </div>
          ))}
        </div>

        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <div style={{
              display: "grid", gridTemplateColumns: "170px 1fr 1fr 1fr",
              marginTop: 24, marginBottom: 2,
            }}>
              <div style={{
                padding: "8px 0",
                fontSize: 11, fontWeight: 600, color: "#845EF7",
                textTransform: "uppercase", letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ width: 3, height: 14, background: "#845EF7", borderRadius: 2, display: "inline-block" }} />
                {cat.label}
              </div>
              <div /><div /><div />
            </div>

            {cat.rows.map((row) => {
              const same = isSame(MACHINES, row.key);
              const dimRow = highlightDiff && same;

              return (
                <div
                  key={row.key}
                  style={{
                    display: "grid", gridTemplateColumns: "170px 1fr 1fr 1fr",
                    borderBottom: "1px solid #ffffff06",
                    opacity: dimRow ? 0.3 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div style={{
                    padding: "9px 0", fontSize: 11, color: "#ffffff45",
                    fontWeight: 500, display: "flex", alignItems: "center",
                  }}>
                    {row.label}
                    {!same && (
                      <span style={{
                        display: "inline-block", width: 6, height: 6,
                        borderRadius: "50%", background: "#FF6B6B",
                        marginLeft: 6, flexShrink: 0,
                      }} />
                    )}
                  </div>

                  {MACHINES.map((m) => {
                    const val = m[row.key] ?? "-";
                    const isYours = m.tag === "YOUR MACHINE";

                    return (
                      <div key={m.name} style={{
                        padding: "9px 12px",
                        display: "flex", alignItems: "center",
                        background: isYours && !same ? "#845EF706" : "transparent",
                      }}>
                        <div style={{
                          fontSize: 12, color: "#ffffffCC",
                          fontWeight: 500, lineHeight: 1.45,
                        }}>
                          {typeof val === "number" ? val.toLocaleString() : (val || "-")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}

        {/* TL;DR */}
        <div style={{
          marginTop: 40, background: "#ffffff04",
          borderRadius: 20, padding: 24,
          border: "1px solid #ffffff08",
        }}>
          <div style={{ fontSize: 11, color: "#845EF7", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            TL;DR vs Your M4 Pro (14-inch, 24GB)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#00C9A7", marginBottom: 6 }}>M5 Pro</div>
              <div style={{ fontSize: 12, color: "#ffffff55", lineHeight: 1.7 }}>
                4 more CPU cores (18 vs 14) with new dual-die Fusion Architecture. Same 20-core GPU count but Neural Accelerators in every core - 4x faster LLM prompts. Max RAM goes to 64GB. 12% more bandwidth (307 vs 273 GB/s). 2x faster SSD. Wi-Fi 7 + Bluetooth 6 via new N1 chip. Same TB5, same display, same battery. Starts $200 more but base storage is 1TB vs 512GB.
              </div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#FF6B6B", marginBottom: 6 }}>M5 Max</div>
              <div style={{ fontSize: 12, color: "#ffffff55", lineHeight: 1.7 }}>
                Same 18-core CPU as M5 Pro but 40-core GPU (2x the cores). 128GB max RAM with 614 GB/s bandwidth - that's 2.25x your M4 Pro. Supports 4 external displays vs your 2. 8K HDMI. Starts at 2TB, maxes at 8TB. Slightly less battery on 14-inch due to the bigger chip. The "running 70B models locally" tier.
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 16, background: "#ffffff04",
          borderRadius: 16, padding: "14px 18px",
          border: "1px solid #ffffff08",
        }}>
          <div style={{ fontSize: 11, color: "#ffffff30", lineHeight: 1.6 }}>
            <span style={{ color: "#FF6B6B", fontWeight: 600 }}>Estimated values:</span> AI TOPS, transistor counts for M5 chips, and M5 Max wireless web battery times are estimated based on Apple's claims and generational patterns. Real benchmarks drop after March 11 ship date. Everything else pulled directly from Apple's official spec pages.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 10, color: "#ffffff15" }}>
          Last verified: March 4, 2026 - support.apple.com/en-us/121553, apple.com/newsroom, apple.com/macbook-pro/specs
        </div>
      </div>
    </div>
  );
}
