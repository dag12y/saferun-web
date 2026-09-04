import { useEffect, useState } from 'react';

interface Asset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: Asset[];
  prerelease: boolean;
}

const REPO = 'dag12y/saferun';

function fmtBytes(n: number) {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}d ago`;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function ReleaseCard({ release, latest }: { release: Release; latest: boolean }) {
  const [open, setOpen] = useState(latest);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: latest ? 'var(--accent)' : 'var(--border)' }}
    >
      <button
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
        style={{ background: 'var(--card)', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-lg font-bold mono" style={{ color: 'var(--fg)' }}>{release.tag_name}</span>
          {latest && (
            <span className="text-xs px-2 py-0.5 rounded-full mono" style={{ background: 'var(--accent-dim)', color: 'var(--accent-text)' }}>Latest</span>
          )}
          {release.prerelease && (
            <span className="text-xs px-2 py-0.5 rounded-full mono" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>Pre-release</span>
          )}
          <span className="text-sm" style={{ color: 'var(--fg3)' }}>{timeAgo(release.published_at)}</span>
          <span className="text-xs" style={{ color: 'var(--fg3)' }}>
            {new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ color: 'var(--fg3)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms', flexShrink: 0, marginTop: 3 }}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="border-t px-6 py-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          {/* release notes */}
          {release.body && (
            <div className="mb-6">
              <p className="text-xs mono mb-3" style={{ color: 'var(--fg3)' }}>RELEASE NOTES</p>
              <div
                className="text-sm leading-7 whitespace-pre-wrap p-4 rounded-lg border"
                style={{ background: 'var(--card2)', borderColor: 'var(--border)', color: 'var(--fg2)' }}
              >
                {release.body}
              </div>
            </div>
          )}

          {/* assets */}
          {release.assets.length > 0 && (
            <div className="mb-5">
              <p className="text-xs mono mb-3" style={{ color: 'var(--fg3)' }}>ASSETS</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {release.assets.map(asset => (
                  <a
                    key={asset.name}
                    href={asset.browser_download_url}
                    className="flex items-center justify-between p-3 rounded-lg border text-sm hover:border-[var(--accent)] transition-colors"
                    style={{ borderColor: 'var(--border)', background: 'var(--card2)', textDecoration: 'none' }}
                  >
                    <span className="mono text-xs" style={{ color: 'var(--fg)' }}>{asset.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: 'var(--fg3)' }}>{fmtBytes(asset.size)}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--accent)' }}>
                        <path d="M6 1v7M3 5.5l3 3 3-3M1 11h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1.5 hover:underline"
              style={{ color: 'var(--fg2)', textDecoration: 'none' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              View on GitHub ↗
            </a>
            <a
              href={`https://github.com/${REPO}/releases/download/${release.tag_name}/SHA256SUMS`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline mono"
              style={{ color: 'var(--fg3)', textDecoration: 'none' }}
            >
              SHA256SUMS ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Releases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setReleases)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <div className="mb-12">
        <p className="text-xs mono mb-3" style={{ color: 'var(--accent)' }}>RELEASES</p>
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--fg)' }}>Release history</h1>
        <p className="text-sm" style={{ color: 'var(--fg2)' }}>
          All SafeRun releases are published on GitHub.{' '}
          <a href={`https://github.com/${REPO}/releases`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            View on GitHub ↗
          </a>
        </p>
      </div>

      {loading && (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 rounded-xl border animate-pulse" style={{ borderColor: 'var(--border)', background: 'var(--card)' }} />
          ))}
        </div>
      )}

      {error && (
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--fg2)' }}>Could not load release data from GitHub.</p>
          <a
            href={`https://github.com/${REPO}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            View releases on GitHub ↗
          </a>
        </div>
      )}

      {!loading && !error && releases.length === 0 && (
        <div className="p-6 rounded-xl border text-center" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <p className="text-sm" style={{ color: 'var(--fg3)' }}>No releases found.</p>
        </div>
      )}

      {!loading && !error && releases.length > 0 && (
        <div className="flex flex-col gap-4">
          {releases.map((r, i) => (
            <ReleaseCard key={r.id} release={r} latest={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
