const steps = [
  { label: "User", sub: "saferun npm install <package>", icon: "◎" },
  { label: "CLI", sub: "Command parsing & resolution", icon: "⌥" },
  { label: "Package Registry", sub: "Download from npm registry", icon: "↓" },
  {
    label: "Docker Sandbox",
    sub: "Disposable isolated container",
    icon: "⬡",
    accent: true,
  },
  { label: "Static Analysis", sub: "Scripts, metadata, structure", icon: "⊡" },
  {
    label: "Behavior Analysis",
    sub: "Filesystem · Network · Processes",
    icon: "⊠",
  },
  { label: "Risk Engine", sub: "Scoring and classification", icon: "◈" },
  {
    label: "Policy Decision",
    sub: "ALLOW · CONFIRM · BLOCK",
    icon: "⊕",
    accent: true,
  },
  { label: "Host Installation", sub: "Install to node_modules", icon: "⬇" },
  { label: "Verification", sub: "Integrity check post-install", icon: "✓" },
  { label: "Audit Log", sub: "~/.saferun/audit.jsonl", icon: "≡" },
]

export function Architecture() {
  return (
    <div className="flex flex-col items-center gap-0 w-full max-w-xs mx-auto select-none">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <div
            className="w-full px-4 py-3 rounded-lg flex items-center gap-3 border transition-all duration-150"
            style={{
              background: step.accent ? "var(--accent-dim)" : "var(--card2)",
              borderColor: step.accent ? "var(--accent)" : "var(--border)",
            }}
          >
            <span
              className="mono text-base w-6 text-center flex-shrink-0"
              style={{ color: "var(--accent)" }}
            >
              {step.icon}
            </span>
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--fg)" }}
              >
                {step.label}
              </div>
              <div
                className="text-xs mono mt-0.5"
                style={{ color: "var(--fg3)" }}
              >
                {step.sub}
              </div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className="w-px h-4"
              style={{ background: "var(--border2)" }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
