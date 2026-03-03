# Apple Silicon Comparison Dashboard

An interactive React dashboard that visualizes every Apple Silicon chip from M1 to M5 across Base, Pro, and Max tiers - benchmarks, specs, and generation-over-generation trends all in one place.

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-FF6B6B)

## What's Inside

- **15 chips** compared side by side - M1 through M5, each in Base, Pro, and Max variants
- **Interactive chip cards** - click any chip to see detailed specs (single-core, multi-core, GPU Metal, bandwidth, RAM, AI TOPS)
- **Cross-generation bar charts** - toggle between single-core, multi-core, GPU, bandwidth, and max RAM comparisons
- **Trend line charts** - see how single-core, GPU Metal, memory bandwidth, and unified memory have evolved over 5 generations
- **Per-tier deep dives** - dedicated performance charts and full spec tables for Base, Pro, and Max series
- **M5 highlight section** - percentage gains from M1 to M5 across key metrics
- **Architecture evolution timeline** - side-by-side spec progression from M1 to M5

## Tech Stack

- **React** with hooks (`useState`)
- **Recharts** for all charts (BarChart, LineChart, AreaChart, RadarChart)

## Getting Started

### Prerequisites

A React project with Recharts installed:

```bash
npm install recharts
```

### Usage

Drop the component into your React app:

```jsx
import AppleSiliconDashboard from "./apple-silicon-comparison";

function App() {
  return <AppleSiliconDashboard />;
}
```

The component is fully self-contained - all chip data, styling, and chart configs live in the single JSX file.

## Chip Data

All benchmark scores are based on Geekbench 6. M5 Pro and M5 Max scores are estimated based on Apple's claims and early leaks.

| Tier | Chips | Generations |
|------|-------|-------------|
| Base | M1, M2, M3, M4, M5 | 2020 - 2025 |
| Pro | M1 Pro, M2 Pro, M3 Pro, M4 Pro, M5 Pro | 2021 - 2026 |
| Max | M1 Max, M2 Max, M3 Max, M4 Max, M5 Max | 2021 - 2026 |

## Metrics Tracked

- Single-core & multi-core CPU (Geekbench 6)
- GPU Metal score
- Memory bandwidth (GB/s)
- Max unified memory (GB)
- AI TOPS (Neural Engine)
- Transistor count
- Process node

## License

MIT
