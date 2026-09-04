import { useState, useEffect } from 'react';
import { CodeBlock } from '../components/CodeBlock';

const NAV = [
  {
    section: 'Introduction',
    items: [
      { id: 'what-is-saferun', label: 'What is SafeRun?' },
      { id: 'why-saferun', label: 'Why SafeRun?' },
      { id: 'how-it-works', label: 'How it works' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'security-model', label: 'Security model' },
    ],
  },
  {
    section: 'Getting Started',
    items: [
      { id: 'install-linux', label: 'Installation — Linux' },
      { id: 'install-macos', label: 'Installation — macOS' },
      { id: 'install-windows', label: 'Installation — Windows' },
      { id: 'quick-start', label: 'Quick start' },
    ],
  },
  {
    section: 'CLI Reference',
    items: [
      { id: 'cli-overview', label: 'CLI overview' },
      { id: 'saferun-setup', label: 'saferun setup' },
      { id: 'saferun-npm-install', label: 'saferun npm install' },
      { id: 'saferun-version', label: 'saferun --version' },
      { id: 'saferun-help', label: 'saferun --help' },
    ],
  },
  {
    section: 'Security',
    items: [
      { id: 'sandbox', label: 'Sandbox' },
      { id: 'behavior-analysis', label: 'Behavior analysis' },
      { id: 'risk-scoring', label: 'Risk scoring' },
      { id: 'security-policy', label: 'Security policy' },
      { id: 'fail-closed', label: 'Fail-closed behavior' },
    ],
  },
  {
    section: 'Configuration',
    items: [
      { id: 'env-vars', label: 'Environment variables' },
      { id: 'install-dir', label: 'Installation directory' },
      { id: 'proxy', label: 'Proxy configuration' },
    ],
  },
  {
    section: 'Audit',
    items: [
      { id: 'audit-logs', label: 'Audit logs' },
      { id: 'audit-structure', label: 'Event structure' },
    ],
  },
  {
    section: 'Troubleshooting',
    items: [
      { id: 'ts-docker', label: 'Docker not running' },
      { id: 'ts-network', label: 'Network / proxy issues' },
      { id: 'ts-permissions', label: 'Permission problems' },
    ],
  },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="pt-2 pb-12 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>{title}</h2>
      <div className="prose-docs">{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-7 mb-4" style={{ color: 'var(--fg2)' }}>{children}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-base mb-2 mt-6" style={{ color: 'var(--fg)' }}>{children}</h3>;
}

function Callout({ type, children }: { type: 'info' | 'warn' | 'note'; children: React.ReactNode }) {
  const colors = { info: 'var(--accent)', warn: 'var(--warn)', note: 'var(--fg3)' };
  return (
    <div
      className="flex gap-3 p-4 rounded-lg my-4 text-sm"
      style={{ background: 'var(--card2)', borderLeft: `3px solid ${colors[type]}`, color: 'var(--fg2)' }}
    >
      {children}
    </div>
  );
}

function EnvTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: 'var(--card2)', borderBottom: '1px solid var(--border)' }}>
            {['Variable', 'Purpose', 'Default'].map(h => (
              <th key={h} className="text-left px-4 py-2.5 font-medium mono text-xs" style={{ color: 'var(--fg3)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, purpose, def], i) => (
            <tr key={name} style={{ background: i % 2 ? 'var(--card)' : 'transparent', borderBottom: '1px solid var(--border)' }}>
              <td className="px-4 py-3 mono text-xs" style={{ color: 'var(--accent)' }}>{name}</td>
              <td className="px-4 py-3" style={{ color: 'var(--fg2)' }}>{purpose}</td>
              <td className="px-4 py-3 mono text-xs" style={{ color: 'var(--fg3)' }}>{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Docs() {
  const [active, setActive] = useState('what-is-saferun');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    document.querySelectorAll('[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 flex gap-10">
      {/* sidebar desktop */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)] scrollbar-thin pr-2">
          {NAV.map(group => (
            <div key={group.section} className="mb-6">
              <p className="text-xs mono font-semibold mb-2 px-2" style={{ color: 'var(--fg3)' }}>{group.section.toUpperCase()}</p>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-2 py-1.5 rounded text-sm transition-colors block"
                  style={{
                    color: active === item.id ? 'var(--accent)' : 'var(--fg2)',
                    background: active === item.id ? 'var(--accent-dim)' : 'transparent',
                    fontWeight: active === item.id ? 500 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: 'var(--accent)', color: '#000' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        {sidebarOpen && (
          <div
            className="absolute bottom-14 right-0 w-56 rounded-xl border shadow-2xl p-3 overflow-y-auto"
            style={{ background: 'var(--card)', borderColor: 'var(--border)', maxHeight: '70vh' }}
          >
            {NAV.map(group => (
              <div key={group.section} className="mb-4">
                <p className="text-xs mono font-semibold mb-1.5 px-2" style={{ color: 'var(--fg3)' }}>{group.section.toUpperCase()}</p>
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left px-2 py-1.5 rounded text-sm block"
                    style={{ color: active === item.id ? 'var(--accent)' : 'var(--fg2)', background: active === item.id ? 'var(--accent-dim)' : 'transparent' }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* main content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* breadcrumb */}
        <p className="text-xs mono mb-8" style={{ color: 'var(--fg3)' }}>SafeRun / Documentation</p>

        {/* Introduction */}
        <Section id="what-is-saferun" title="What is SafeRun?">
          <P>
            SafeRun is a command-line tool written in Go that intercepts npm package installation
            and runs the package inside a disposable Docker container before allowing it onto your
            host system. It monitors behavior during sandbox execution and produces a security report
            that determines whether installation proceeds.
          </P>
          <P>
            Instead of running <code className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>npm install lodash</code> directly,
            you run <code className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>saferun npm install lodash</code>.
            SafeRun handles the rest.
          </P>
        </Section>

        <Section id="why-saferun" title="Why SafeRun?">
          <P>
            npm packages execute arbitrary code during installation through lifecycle scripts
            (preinstall, install, postinstall). Malicious packages have used these hooks to exfiltrate
            credentials, establish persistence, or tamper with host files.
          </P>
          <P>
            SafeRun reduces the attack surface by running the full installation — including lifecycle
            scripts — inside an isolated Docker container where behavior can be observed before any
            host-side changes are made.
          </P>
          <Callout type="note">
            SafeRun reduces risk. It does not eliminate it. Sufficiently sophisticated packages may
            detect sandbox environments or exploit vulnerabilities in the analysis layer.
          </Callout>
        </Section>

        <Section id="how-it-works" title="How it works">
          <P>When you run <code className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>saferun npm install &lt;package&gt;</code>, SafeRun:</P>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-sm" style={{ color: 'var(--fg2)' }}>
            <li>Downloads the package tarball from the npm registry</li>
            <li>Verifies the SHA-256 checksum of the downloaded archive</li>
            <li>Starts a disposable Docker container with the SafeRun sandbox image</li>
            <li>Runs npm install inside the container, monitoring behavior</li>
            <li>Collects filesystem, network, and process activity</li>
            <li>Scores and classifies risk based on observed behavior</li>
            <li>Reports the result and applies the configured policy</li>
            <li>Asks for confirmation (if required by policy) before installing to the host</li>
            <li>Appends an audit event to <code className="mono text-xs" style={{ color: 'var(--accent)' }}>~/.saferun/audit.jsonl</code></li>
          </ol>
        </Section>

        <Section id="architecture" title="Architecture">
          <P>
            SafeRun is organized into internal Go packages covering CLI parsing, sandbox management,
            behavior analysis, risk scoring, and reporting.
          </P>
          <CodeBlock
            lang="text"
            showCopy={false}
            code={`cmd/saferun/main.go          — CLI entry point
internal/
  cli/                       — Command parsing and dispatch
  sandbox/docker.go          — Docker container lifecycle
  monitor/                   — Filesystem, network, process monitors
  analyzer/                  — Behavior analysis
  risk/                      — Risk scoring and classification
  report/                    — Report generation
  package_manager/           — npm adapter
sandbox/images/node/         — Sandbox Docker image (Node.js + npm)`}
          />
        </Section>

        <Section id="security-model" title="Security model">
          <P>
            SafeRun's security model is based on sandbox-first installation: no package code runs
            on the host before analysis. The Docker container is disposed of after analysis regardless
            of outcome.
          </P>
          <P>
            SafeRun does not query external threat intelligence services, package reputation databases,
            or vulnerability feeds. All analysis is local and behavioral.
          </P>
        </Section>

        {/* Getting Started */}
        <Section id="install-linux" title="Installation — Linux">
          <P>Install SafeRun on Linux (amd64) using the curl installer:</P>
          <CodeBlock lang="bash" code={`curl -fsSL https://www.saferun.tech/install.sh | sh`} />
          <P>The installer places the binary at <code className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>~/.local/bin/saferun</code> and verifies the SHA-256 checksum before installation. No root access is required.</P>
          <H3>Manual installation</H3>
          <CodeBlock
            lang="bash"
            code={`mkdir -p ~/.local/bin
install -m 0755 saferun-linux-amd64 ~/.local/bin/saferun`}
          />
          <Callout type="info">Ensure ~/.local/bin is in your PATH. Add <code className="mono text-xs">export PATH="$HOME/.local/bin:$PATH"</code> to your shell profile if needed.</Callout>
          <H3>Requirements</H3>
          <P>Docker must be installed and the Docker daemon must be running. SafeRun uses Docker to create and manage sandbox containers.</P>
        </Section>

        <Section id="install-macos" title="Installation — macOS">
          <P>Install SafeRun on macOS using the curl installer:</P>
          <CodeBlock lang="bash" code={`curl -fsSL https://www.saferun.tech/install.sh | sh`} />
          <P>Binaries are available for both amd64 (Intel) and arm64 (Apple Silicon). The installer selects the correct architecture automatically.</P>
          <Callout type="warn">Docker Desktop for Mac must be running before using SafeRun.</Callout>
        </Section>

        <Section id="install-windows" title="Installation — Windows">
          <P>Install SafeRun on Windows using the PowerShell installer:</P>
          <CodeBlock lang="powershell" code={`Invoke-Expression (Invoke-WebRequest -Uri https://www.saferun.tech/install.ps1 -UseBasicParsing).Content`} />
          <P>
            The installer places SafeRun in <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>%LOCALAPPDATA%\SafeRun\bin</code> and
            adds it to the user PATH. No administrator rights are required. Open a new PowerShell session after installation.
          </P>
          <H3>Environment variables</H3>
          <EnvTable rows={[
            ['SAFERUN_INSTALL_DIR', 'Override the installation directory', '%LOCALAPPDATA%\\SafeRun\\bin'],
          ]} />
        </Section>

        <Section id="quick-start" title="Quick start">
          <P>After installation, verify SafeRun works and Docker is accessible:</P>
          <CodeBlock lang="bash" code={`saferun setup`} />
          <P>Then install a package:</P>
          <CodeBlock lang="bash" code={`saferun npm install lodash`} />
          <P>SafeRun will sandbox the installation, show you the security report, and ask for confirmation before installing to the host.</P>
        </Section>

        {/* CLI Reference */}
        <Section id="cli-overview" title="CLI overview">
          <P>SafeRun's top-level commands:</P>
          <CodeBlock
            lang="text"
            showCopy={false}
            code={`saferun setup              Verify Docker and prepare the sandbox image
saferun npm install <pkg>  Install an npm package via the sandbox
saferun --help             Show usage information
saferun --version          Print the SafeRun version`}
          />
        </Section>

        <Section id="saferun-setup" title="saferun setup">
          <P>Verifies that Docker is running and that the SafeRun sandbox image is available. Run this once after installation to confirm the environment is ready.</P>
          <CodeBlock lang="bash" code={`saferun setup`} />
        </Section>

        <Section id="saferun-npm-install" title="saferun npm install">
          <P>Installs an npm package through the SafeRun sandbox pipeline.</P>
          <CodeBlock lang="bash" code={`saferun npm install <package>[@version]`} />
          <P>Example:</P>
          <CodeBlock lang="bash" code={`saferun npm install express
saferun npm install lodash@4.17.21`} />
        </Section>

        <Section id="saferun-version" title="saferun --version">
          <P>Prints the SafeRun version. Release builds report the injected Git tag. Local development builds report <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--fg3)' }}>SafeRun dev</code>.</P>
          <CodeBlock lang="bash" code={`saferun --version`} />
        </Section>

        <Section id="saferun-help" title="saferun --help">
          <CodeBlock lang="bash" code={`saferun --help`} />
        </Section>

        {/* Security */}
        <Section id="sandbox" title="Sandbox">
          <P>
            SafeRun runs each package installation inside a disposable Docker container built from
            the SafeRun sandbox image. The image contains Node.js and npm, isolated from the host
            network and filesystem by default Docker security settings.
          </P>
          <P>The container is created fresh for each SafeRun invocation and destroyed after analysis completes, regardless of outcome.</P>
          <Callout type="note">
            Full sandbox hardening (seccomp, AppArmor profiles, read-only mounts, network namespace isolation) is planned but not yet implemented in the current release.
          </Callout>
        </Section>

        <Section id="behavior-analysis" title="Behavior analysis">
          <P>During sandbox execution, SafeRun monitors:</P>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4" style={{ color: 'var(--fg2)' }}>
            <li><strong style={{ color: 'var(--fg)' }}>Filesystem activity</strong> — files created, modified, or deleted outside expected npm directories</li>
            <li><strong style={{ color: 'var(--fg)' }}>Network activity</strong> — outbound connections made during package installation</li>
            <li><strong style={{ color: 'var(--fg)' }}>Process activity</strong> — subprocesses spawned by lifecycle scripts</li>
          </ul>
          <Callout type="note">
            Behavior monitoring is under active development. Not all monitors are fully implemented in the current release.
          </Callout>
        </Section>

        <Section id="risk-scoring" title="Risk scoring">
          <P>After sandbox execution, SafeRun's risk engine assigns a numeric score and classifies the result into one of four tiers:</P>
          <EnvTable rows={[
            ['LOW', 'No suspicious behavior observed', 'ALLOW'],
            ['MEDIUM', 'Some anomalies detected', 'CONFIRM'],
            ['HIGH', 'Clearly suspicious behavior', 'BLOCK'],
            ['CRITICAL', 'Dangerous behavior observed', 'BLOCK'],
          ]} />
        </Section>

        <Section id="security-policy" title="Security policy">
          <P>The policy tier determines what SafeRun does after analysis:</P>
          <ul className="list-disc list-inside space-y-2 text-sm mb-4" style={{ color: 'var(--fg2)' }}>
            <li><strong style={{ color: '#10d078' }}>ALLOW</strong> — proceed with host installation automatically</li>
            <li><strong style={{ color: '#fbbf24' }}>CONFIRM</strong> — display report and ask user to approve or reject</li>
            <li><strong style={{ color: '#f87171' }}>BLOCK</strong> — reject installation automatically</li>
          </ul>
        </Section>

        <Section id="fail-closed" title="Fail-closed behavior">
          <P>
            If the Docker daemon is not running, the sandbox image is unavailable, or analysis
            fails for any other reason, SafeRun fails closed: installation does not proceed.
            This ensures that bypassing the sandbox (accidentally or deliberately) is not the
            path of least resistance.
          </P>
        </Section>

        {/* Configuration */}
        <Section id="env-vars" title="Environment variables">
          <EnvTable rows={[
            ['SAFERUN_VERSION', 'Release tag to download during installation', 'current release'],
            ['SAFERUN_RELEASE_BASE_URL', 'Base URL for release binary downloads', 'GitHub releases URL'],
            ['SAFERUN_INSTALL_DIR', 'Installation directory (Windows only)', '%LOCALAPPDATA%\\SafeRun\\bin'],
          ]} />
        </Section>

        <Section id="install-dir" title="Installation directory">
          <P>On Linux and macOS, SafeRun installs to <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>~/.local/bin/saferun</code> by default.</P>
          <P>On Windows, SafeRun installs to <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>%LOCALAPPDATA%\SafeRun\bin</code> by default. Override with the <code className="mono text-xs" style={{ color: 'var(--accent)' }}>SAFERUN_INSTALL_DIR</code> environment variable.</P>
        </Section>

        <Section id="proxy" title="Proxy configuration">
          <P>
            SafeRun respects standard HTTP proxy environment variables: <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>HTTP_PROXY</code>, <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>HTTPS_PROXY</code>, and <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>NO_PROXY</code>.
          </P>
        </Section>

        {/* Audit */}
        <Section id="audit-logs" title="Audit logs">
          <P>
            Every SafeRun operation appends a structured JSON event to <code className="mono text-xs px-1 py-0.5 rounded" style={{ background: 'var(--card2)', color: 'var(--accent)' }}>~/.saferun/audit.jsonl</code>.
            The log is append-only and human-readable (one JSON object per line).
          </P>
          <CodeBlock lang="bash" code={`cat ~/.saferun/audit.jsonl`} />
        </Section>

        <Section id="audit-structure" title="Event structure">
          <P>Each audit event contains at minimum:</P>
          <CodeBlock
            lang="json"
            code={`{
  "timestamp": "2025-09-04T10:23:11Z",
  "package": "lodash@4.17.21",
  "risk_level": "LOW",
  "risk_score": 0,
  "policy_decision": "ALLOW",
  "user_action": "approved",
  "installed": true
}`}
          />
        </Section>

        {/* Troubleshooting */}
        <Section id="ts-docker" title="Docker not running">
          <P>SafeRun requires Docker. If you see an error about Docker not being accessible:</P>
          <CodeBlock lang="bash" code={`# Check Docker daemon status
docker info

# Start Docker (Linux with systemd)
sudo systemctl start docker`} />
          <P>On macOS and Windows, start Docker Desktop before running SafeRun.</P>
        </Section>

        <Section id="ts-network" title="Network / proxy issues">
          <P>If SafeRun cannot download packages or the sandbox image, verify your network and proxy settings:</P>
          <CodeBlock lang="bash" code={`export HTTPS_PROXY=http://proxy.example.com:8080
saferun npm install lodash`} />
        </Section>

        <Section id="ts-permissions" title="Permission problems">
          <P>On Linux, if SafeRun cannot connect to Docker, add your user to the docker group:</P>
          <CodeBlock lang="bash" code={`sudo usermod -aG docker $USER
# Log out and back in for the group change to take effect`} />
        </Section>
      </div>
    </div>
  );
}
