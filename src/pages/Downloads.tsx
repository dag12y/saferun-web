import { useEffect, useState } from 'react';
import { CopyButton } from '../components/CopyButton';
import { CodeBlock } from '../components/CodeBlock';

interface Release {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: { name: string; browser_download_url: string; size: number }[];
}

const REPO = 'dag12y/saferun';

const platforms = [
  {
    os: 'Linux',
    icon: '🐧',
    arches: [
      { arch: 'amd64', file: 'saferun-linux-amd64', label: 'x86-64' },
      { arch: 'arm64', file: 'saferun-linux-arm64', label: 'ARM64' },
    ],
    install: `curl -fsSL https://www.saferun.tech/install.sh | sh`,
    manual: `mkdir -p ~/.local/bin
install -m 0755 saferun-linux-amd64 ~/.local/bin/saferun`,
  },
  {
    os: 'macOS',
    icon: '🍎',
    arches: [
      { arch: 'amd64', file: 'saferun-darwin-amd64', label: 'Intel x86-64' },
      { arch: 'arm64', file: 'saferun-darwin-arm64', label: 'Apple Silicon' },
    ],
    install: `curl -fsSL https://www.saferun.tech/install.sh | sh`,
    manual: `mkdir -p ~/.local/bin
install -m 0755 saferun-darwin-arm64 ~/.local/bin/saferun`,
  },
  {
    os: 'Windows',
    icon: '🪟',
    arches: [
      { arch: 'amd64', file: 'saferun-windows-amd64.exe', label: 'x86-64' },
      { arch: 'arm64', file: 'saferun-windows-arm64.exe', label: 'ARM64' },
    ],
    install: `Invoke-Expression (Invoke-WebRequest -Uri https://www.saferun.tech/install.ps1 -UseBasicParsing).Content`,
    manual: `# Place binary in a directory on PATH, e.g.:
# %LOCALAPPDATA%\\SafeRun\\bin\\saferun.exe`,
  },
];

function fmtBytes(n: number) {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function Downloads() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then(r => {
        if (!r.ok) throw new Error('not found');
        return r.json();
      })
      .then(setRelease)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-5 py-16">
      <div className="mb-12">
        <p className="text-xs mono mb-3" style={{ color: 'var(--accent)' }}>DOWNLOADS</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>Download SafeRun</h1>
        <p className="text-sm" style={{ color: 'var(--fg2)' }}>
          Pre-built binaries for Linux, macOS, and Windows. All releases are available on GitHub.
        </p>
      </div>

      {/* Latest release badge */}
      <div
        className="flex items-center justify-between flex-wrap gap-4 p-5 rounded-xl border mb-12"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div>
          <p className="text-xs mono mb-1" style={{ color: 'var(--fg3)' }}>LATEST RELEASE</p>
          {loading && <p className="text-sm" style={{ color: 'var(--fg3)' }}>Fetching release info…</p>}
          {error && <p className="text-sm" style={{ color: 'var(--fg3)' }}>Could not load release info. Check GitHub.</p>}
          {release && (
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold mono" style={{ color: 'var(--fg)' }}>{release.tag_name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full mono" style={{ background: 'var(--accent-dim)', color: 'var(--accent-text)' }}>Latest</span>
              <span className="text-xs" style={{ color: 'var(--fg3)' }}>
                {new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          )}
        </div>
        <a
          href={release?.html_url || `https://github.com/${REPO}/releases`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm"
          style={{ borderColor: 'var(--border2)', color: 'var(--fg)', textDecoration: 'none', background: 'var(--card2)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          View on GitHub
        </a>
      </div>

      {/* Platform cards */}
      <div className="flex flex-col gap-8">
        {platforms.map(platform => (
          <div key={platform.os} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-6 py-4 border-b flex items-center gap-3" style={{ borderColor: 'var(--border)', background: 'var(--card2)' }}>
              <span className="text-xl">{platform.icon}</span>
              <h2 className="font-semibold" style={{ color: 'var(--fg)' }}>{platform.os}</h2>
            </div>

            <div className="p-6" style={{ background: 'var(--card)' }}>
              {/* quick install */}
              <p className="text-xs mono mb-2" style={{ color: 'var(--fg3)' }}>QUICK INSTALL</p>
              <div className="mb-6">
                <CodeBlock lang="bash" code={platform.install} />
              </div>

              {/* binaries */}
              <p className="text-xs mono mb-3" style={{ color: 'var(--fg3)' }}>DOWNLOAD BINARY</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {platform.arches.map(({ arch, file, label }) => {
                  const asset = release?.assets.find(a => a.name === file);
                  const url = asset?.browser_download_url
                    || `https://github.com/${REPO}/releases/latest/download/${file}`;
                  return (
                    <a
                      key={arch}
                      href={url}
                      className="flex items-center justify-between p-3 rounded-lg border transition-colors group"
                      style={{ borderColor: 'var(--border2)', background: 'var(--card2)', textDecoration: 'none' }}
                    >
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{label}</p>
                        <p className="text-xs mono mt-0.5" style={{ color: 'var(--fg3)' }}>{file}</p>
                        {asset && <p className="text-xs mt-0.5" style={{ color: 'var(--fg3)' }}>{fmtBytes(asset.size)}</p>}
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--accent)' }}>
                        <path d="M7 1v9M3 7l4 4 4-4M1 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  );
                })}
              </div>

              {/* checksums */}
              <p className="text-xs mono mb-2" style={{ color: 'var(--fg3)' }}>CHECKSUMS</p>
              <div
                className="flex items-center justify-between p-3 rounded-lg border text-sm"
                style={{ borderColor: 'var(--border)', background: 'var(--card2)' }}
              >
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--accent)' }}>
                    <path d="M7 1l1.5 4.5H13l-3.75 2.75 1.5 4.5L7 10 3.25 12.75l1.5-4.5L1 5.5h4.5L7 1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  </svg>
                  <span style={{ color: 'var(--fg2)' }}>SHA-256 checksums for all binaries</span>
                </div>
                <a
                  href={`https://github.com/${REPO}/releases/latest/download/SHA256SUMS`}
                  className="text-xs mono flex items-center gap-1 hover:underline"
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SHA256SUMS ↗
                </a>
              </div>

              {/* manual install note */}
              <details className="mt-5">
                <summary className="text-xs mono cursor-pointer select-none" style={{ color: 'var(--fg3)' }}>
                  Manual installation
                </summary>
                <div className="mt-3">
                  <CodeBlock lang="bash" code={platform.manual} />
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>

      {/* verify install */}
      <div className="mt-12 p-6 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--fg)' }}>After installation</h3>
        <p className="text-sm mb-4" style={{ color: 'var(--fg2)' }}>
          Verify the installation and check that Docker is accessible:
        </p>
        <div className="flex flex-col gap-3">
          <CodeBlock lang="bash" code={`saferun --version`} />
          <CodeBlock lang="bash" code={`saferun setup`} />
        </div>
      </div>
    </div>
  );
}
