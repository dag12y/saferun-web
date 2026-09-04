import { Link } from "react-router"
import { CopyButton } from "../components/CopyButton"
import { Terminal } from "../components/Terminal"
import { Architecture } from "../components/Architecture"

function InstallCommand({ cmd }: { cmd: string }) {
  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border text-sm"
      style={{
        background: "var(--terminal-bg)",
        borderColor: "var(--border)",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      <span style={{ color: "var(--terminal-fg)" }}>
        <span style={{ color: "var(--terminal-dim)", userSelect: "none" }}>
          ${" "}
        </span>
        {cmd}
      </span>
      <CopyButton text={cmd} />
    </div>
  )
}

const pipelineSteps = [
  "Download",
  "Sandbox",
  "Analysis",
  "Risk Assessment",
  "Approval",
  "Install",
  "Verify",
  "Audit",
]

const policies = [
  {
    level: "LOW",
    action: "ALLOW",
    color: "#10d078",
    desc: "Package is permitted to install automatically.",
  },
  {
    level: "MEDIUM",
    action: "CONFIRM",
    color: "#fbbf24",
    desc: "User confirmation is required before proceeding.",
  },
  {
    level: "HIGH",
    action: "BLOCK",
    color: "#f87171",
    desc: "Installation is blocked automatically.",
  },
  {
    level: "CRITICAL",
    action: "BLOCK",
    color: "#f87171",
    desc: "Installation is blocked automatically.",
  },
]

const features = [
  {
    icon: "⬡",
    title: "Docker Sandbox",
    body: "Each package installs inside a disposable Docker container, ensuring host system isolation during analysis.",
  },
  {
    icon: "◈",
    title: "Risk Analysis",
    body: "SafeRun monitors filesystem activity, network calls, and spawned processes during sandbox execution.",
  },
  {
    icon: "⊕",
    title: "Policy Enforcement",
    body: "Four-tier policy (LOW / MEDIUM / HIGH / CRITICAL) determines whether packages install, prompt, or are blocked.",
  },
  {
    icon: "✓",
    title: "Integrity Verification",
    body: "SHA-256 checksums are verified before and after installation, and on every binary download.",
  },
  {
    icon: "↺",
    title: "Rollback",
    body: "SafeRun takes snapshots before host installation, enabling rollback if post-install verification fails.",
  },
  {
    icon: "≡",
    title: "Audit Logging",
    body: "Every operation is appended to ~/.saferun/audit.jsonl for forensics, compliance, and review.",
  },
]

const platforms = [
  "Linux x64",
  "Linux ARM64",
  "macOS x64",
  "macOS ARM64",
  "Windows x64",
  "Windows ARM64",
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)",
          }}
        />
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 relative">
          <div className="max-w-2xl">
            {/* badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs mono mb-8"
              style={{
                borderColor: "var(--border2)",
                color: "var(--fg3)",
                background: "var(--card)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>●</span>
              Open source · MIT License · Go CLI
            </div>

            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5"
              style={{ color: "var(--fg)" }}
            >
              Install packages
              <br />
              <span style={{ color: "var(--accent)" }}>
                without blindly
                <br />
                trusting them.
              </span>
            </h1>

            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "var(--fg2)" }}
            >
              SafeRun downloads npm packages, analyzes them inside an isolated
              Docker sandbox, evaluates risk, and only installs them to the host
              after your security policy and explicit approval allow it.
            </p>

            {/* install commands */}
            <div className="flex flex-col gap-3 mb-8 max-w-xl">
              <InstallCommand cmd="curl -fsSL https://www.saferun.tech/install.sh | sh" />
              <InstallCommand cmd="saferun npm install lodash" />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/docs"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "var(--accent)",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                Get Started →
              </Link>
              <Link
                to="/docs"
                className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--border2)",
                  color: "var(--fg)",
                  textDecoration: "none",
                  background: "var(--card)",
                }}
              >
                Documentation
              </Link>
              <Link
                to="/downloads"
                className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--border2)",
                  color: "var(--fg)",
                  textDecoration: "none",
                  background: "var(--card)",
                }}
              >
                Download
              </Link>
              <a
                href="https://github.com/dag12y/saferun"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2"
                style={{
                  borderColor: "var(--border2)",
                  color: "var(--fg)",
                  textDecoration: "none",
                  background: "var(--card)",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline flow */}
      <section
        className="border-y"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div className="max-w-6xl mx-auto px-5 py-8">
          <p
            className="text-xs mono mb-5 text-center"
            style={{ color: "var(--fg3)" }}
          >
            THE SAFERUN PIPELINE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-0">
            {pipelineSteps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span
                    className="text-sm font-medium px-3 py-1.5 rounded"
                    style={{
                      color: "var(--fg)",
                      background: "var(--card2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {step}
                  </span>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <span
                    className="mx-1 text-sm"
                    style={{ color: "var(--fg3)" }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal demo + Architecture */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs mono mb-3" style={{ color: "var(--accent)" }}>
              LIVE DEMO
            </p>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              See it in action
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--fg2)" }}
            >
              SafeRun wraps the npm install command. The package installs inside
              a Docker sandbox, behavior is captured, a risk report is
              generated, and you decide what happens next.
            </p>
            <Terminal />
          </div>

          <div>
            <p className="text-xs mono mb-3" style={{ color: "var(--accent)" }}>
              ARCHITECTURE
            </p>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--fg)" }}
            >
              How it works
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--fg2)" }}
            >
              Every SafeRun invocation follows a deterministic pipeline from
              package download through sandboxed analysis to policy-gated host
              installation.
            </p>
            <Architecture />
          </div>
        </div>
      </section>

      {/* Policy levels */}
      <section
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-16">
          <div className="max-w-xl mb-10">
            <p className="text-xs mono mb-3" style={{ color: "var(--accent)" }}>
              SECURITY POLICY
            </p>
            <h2
              className="text-2xl font-bold mb-3"
              style={{ color: "var(--fg)" }}
            >
              Four-tier risk policy
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--fg2)" }}
            >
              SafeRun classifies each package into a risk tier and applies the
              corresponding policy automatically. You control whether to
              confirm, override, or rely on automatic block behavior.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {policies.map((p) => (
              <div
                key={p.level}
                className="p-5 rounded-lg border"
                style={{
                  background: "var(--card2)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs mono font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: `${p.color}22`,
                      color: p.color,
                      border: `1px solid ${p.color}44`,
                    }}
                  >
                    {p.level}
                  </span>
                  <span style={{ color: "var(--fg3)" }}>→</span>
                  <span
                    className="text-xs mono font-semibold"
                    style={{ color: p.color }}
                  >
                    {p.action}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--fg2)" }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="max-w-xl mb-12">
          <p className="text-xs mono mb-3" style={{ color: "var(--accent)" }}>
            CAPABILITIES
          </p>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ color: "var(--fg)" }}
          >
            Everything you need to install safely
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--fg2)" }}
          >
            SafeRun is not a magic bullet — it reduces package-installation risk
            through sandboxing, analysis, and policy enforcement, but cannot
            guarantee absolute security.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-lg border"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div
                className="text-xl mb-3 mono"
                style={{ color: "var(--accent)" }}
              >
                {f.icon}
              </div>
              <h3
                className="font-semibold text-sm mb-2"
                style={{ color: "var(--fg)" }}
              >
                {f.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--fg2)" }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--card)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <p className="text-xs mono mb-2" style={{ color: "var(--accent)" }}>
              PLATFORMS
            </p>
            <h3 className="font-semibold" style={{ color: "var(--fg)" }}>
              Cross-platform support
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--fg2)" }}>
              Pre-built binaries for major OS and architecture combinations.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <span
                key={p}
                className="px-3 py-1.5 rounded text-xs mono border"
                style={{
                  color: "var(--fg2)",
                  borderColor: "var(--border2)",
                  background: "var(--card2)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-5 py-24 text-center">
        <p className="text-xs mono mb-4" style={{ color: "var(--accent)" }}>
          OPEN SOURCE
        </p>
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--fg)" }}>
          Start installing packages safely today.
        </h2>
        <p
          className="text-base mb-10 max-w-lg mx-auto"
          style={{ color: "var(--fg2)" }}
        >
          SafeRun is free, open source, and runs entirely on your machine. No
          accounts, no cloud, no telemetry.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/downloads"
            className="px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              background: "var(--accent)",
              color: "#000",
              textDecoration: "none",
            }}
          >
            Download SafeRun
          </Link>
          <Link
            to="/docs"
            className="px-6 py-3 rounded-lg text-sm font-medium border"
            style={{
              borderColor: "var(--border2)",
              color: "var(--fg)",
              textDecoration: "none",
              background: "var(--card)",
            }}
          >
            Read the Docs
          </Link>
        </div>
      </section>
    </div>
  )
}
