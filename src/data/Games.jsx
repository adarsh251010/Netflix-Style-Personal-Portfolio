export const games = [
  {
    id: "tic-tac-toe-ai",
    title: "Tic Tac Toe AI",
    description: "Minimax logic • State evaluation • Edge cases",
    badge: "Logic",
    image:
      "linear-gradient(135deg, rgba(229,9,20,0.25), rgba(20,20,20,0.9)), radial-gradient(1200px 300px at 20% 0%, rgba(255,255,255,0.08), transparent)",
    overview:
      "A focused AI module built around minimax evaluation, deterministic state scoring, and predictable move ordering.",
    highlights: [
      "Minimax scoring with terminal-state detection",
      "Immutable board state updates for safe evaluation",
      "Edge-case handling for draws and forced wins",
    ],
    decisions: [
      "Separated evaluation logic from UI for testability",
      "Optimized early exits for terminal states",
      "Consistent state transitions to avoid invalid moves",
    ],
    metrics: [
      { label: "Search Depth", value: "Up to 9 ply" },
      { label: "State Evaluations", value: "≤ 255 nodes" },
      { label: "Determinism", value: "Stable move ordering" },
    ],
    preview: [
      { label: "Current Turn", value: "AI (X)" },
      { label: "Evaluation", value: "+1.0 (Win Path)" },
      { label: "Recommended Move", value: "Center Control" },
    ],
    stack: "React • Pure Functions • Deterministic State",
  },
  {
    id: "memory-matching",
    title: "Memory Matching Game",
    description: "State management • UI consistency • Performance",
    badge: "State",
    image:
      "linear-gradient(135deg, rgba(0,180,216,0.25), rgba(20,20,20,0.9)), radial-gradient(1200px 300px at 20% 0%, rgba(255,255,255,0.08), transparent)",
    overview:
      "A timing-sensitive UI module focused on controlled state, predictable transitions, and smooth feedback.",
    highlights: [
      "State machine-driven flip logic",
      "Locking interaction during comparison windows",
      "Consistent UI updates to avoid flicker",
    ],
    decisions: [
      "Batching state updates for smoother re-renders",
      "Explicit phases to prevent invalid flips",
      "Lightweight animations that preserve FPS",
    ],
    metrics: [
      { label: "Render Strategy", value: "Minimal reflow" },
      { label: "State Phases", value: "Idle • Checking • Resolved" },
      { label: "Feedback", value: "Immediate + delayed" },
    ],
    preview: [
      { label: "Matches", value: "4 / 8" },
      { label: "Moves", value: "12" },
      { label: "State", value: "Checking Pair" },
    ],
    stack: "React • Controlled State • UI Timing",
  },
  {
    id: "typing-analyzer",
    title: "Typing Performance Analyzer",
    description: "Real-time metrics • Accuracy • UX feedback",
    badge: "Performance",
    image:
      "linear-gradient(135deg, rgba(255,170,0,0.25), rgba(20,20,20,0.9)), radial-gradient(1200px 300px at 20% 0%, rgba(255,255,255,0.08), transparent)",
    overview:
      "A performance-focused module capturing real-time metrics with clear, responsive feedback loops.",
    highlights: [
      "Live WPM and accuracy calculations",
      "Input buffering for responsive typing",
      "UX feedback tuned for clarity and focus",
    ],
    decisions: [
      "Separated input stream from metrics pipeline",
      "Optimized re-renders with derived state",
      "Accessible feedback hierarchy for readability",
    ],
    metrics: [
      { label: "Realtime Metrics", value: "WPM • Accuracy • Errors" },
      { label: "Update Interval", value: "Low-latency" },
      { label: "UX Focus", value: "Clear visual hierarchy" },
    ],
    preview: [
      { label: "WPM", value: "72" },
      { label: "Accuracy", value: "96%" },
      { label: "Error Rate", value: "2.3%" },
    ],
    stack: "React • Derived State • UX Metrics",
  },
];
