import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useTheme } from '../context/ThemeContext';

const links = [
  { label: 'Docs', to: '/docs' },
  { label: 'Downloads', to: '/downloads' },
  { label: 'Releases', to: '/releases' },
];

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14 10.5a6.5 6.5 0 01-9-9 6.5 6.5 0 109 9z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.2 3.2l1 1M11.8 11.8l1 1M11.8 3.2l1-1M3.2 11.8l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-6">
        {/* logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" style={{ textDecoration: 'none' }}>
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-black font-bold text-xs mono"
            style={{ background: 'var(--accent)' }}
          >
            SR
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--fg)' }}>
            SafeRun
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 rounded text-sm transition-colors duration-100"
              style={{
                color: location.pathname.startsWith(link.to) ? 'var(--fg)' : 'var(--fg2)',
                background: location.pathname.startsWith(link.to) ? 'var(--card2)' : 'transparent',
                textDecoration: 'none',
                fontWeight: location.pathname.startsWith(link.to) ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded border transition-colors"
            style={{ color: 'var(--fg3)', borderColor: 'var(--border)', background: 'var(--card)' }}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="https://github.com/dag12y/saferun"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded border transition-colors"
            style={{ color: 'var(--fg3)', borderColor: 'var(--border)', background: 'var(--card)' }}
            title="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>

          <Link
            to="/docs"
            className="hidden md:flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors"
            style={{ background: 'var(--accent)', color: '#000', textDecoration: 'none' }}
          >
            Get Started
          </Link>

          {/* mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center rounded border"
            style={{ color: 'var(--fg3)', borderColor: 'var(--border)', background: 'var(--card)' }}
            onClick={() => setMobileOpen(o => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              {mobileOpen ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              ) : (
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-5 py-4 flex flex-col gap-2" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded text-sm"
              style={{ color: 'var(--fg)', textDecoration: 'none', background: 'var(--card2)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/dag12y/saferun"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded text-sm"
            style={{ color: 'var(--fg)', textDecoration: 'none', background: 'var(--card2)' }}
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}
