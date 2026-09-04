export function Terminal() {
  const lines = [
    { type: "prompt", text: "saferun npm install lodash" },
    { type: "blank" },
    { type: "info", text: "Resolving package: lodash" },
    { type: "info", text: "Package: lodash@4.17.21" },
    { type: "blank" },
    { type: "step", text: "Downloading package..." },
    { type: "step", text: "Extracted package" },
    { type: "blank" },
    { type: "step", text: "Starting sandbox..." },
    { type: "step", text: "Running behavior analysis..." },
    { type: "step", text: "Running process analysis..." },
    { type: "step", text: "Running network analysis..." },
    { type: "blank" },
    { type: "header", text: "Security Report" },
    { type: "low", text: "Risk:     LOW" },
    { type: "info", text: "Score:    0" },
    { type: "info", text: "Findings: 0" },
    { type: "blank" },
    { type: "allow", text: "Policy Decision: ALLOW" },
    { type: "blank" },
    { type: "question", text: "Install package? [y/N] y" },
    { type: "blank" },
    { type: "success", text: "✓ lodash@4.17.21 installed successfully" },
  ]

  const colorMap: Record<string, string> = {
    prompt: "#e2e8f0",
    info: "#8b949e",
    step: "#93c5fd",
    header: "#f0f0f4",
    low: "#10d078",
    allow: "#10d078",
    question: "#fbbf24",
    success: "#10d078",
  }

  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl"
      style={{
        background: "var(--terminal-bg)",
        border: "1px solid var(--border)",
      }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#28c840" }}
          />
        </div>
        <span
          className="text-xs mono mx-auto"
          style={{ color: "var(--terminal-dim)" }}
        >
          zsh — saferun
        </span>
      </div>

      {/* content */}
      <div className="p-5 font-mono text-sm leading-6 overflow-x-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color:
                line.type === "blank"
                  ? "transparent"
                  : colorMap[line.type] || "#e2e8f0",
              minHeight: "1.5rem",
            }}
          >
            {line.type === "prompt" && (
              <span>
                <span style={{ color: "var(--terminal-green)" }}>❯ </span>
                {line.text}
              </span>
            )}
            {line.type === "header" && (
              <span style={{ fontWeight: 600, color: "#f0f0f4" }}>
                {line.text}
              </span>
            )}
            {!["prompt", "header", "blank"].includes(line.type) && line.text}
            {line.type === "blank" && " "}
          </div>
        ))}
      </div>
    </div>
  )
}
