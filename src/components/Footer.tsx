import { Link } from "react-router"

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-black font-bold text-xs mono"
              style={{ background: "var(--accent)" }}
            >
              SR
            </div>
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--fg)" }}
            >
              SafeRun
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--fg3)" }}>
            Secure package installation sandbox
          </p>
          <p className="text-xs mt-2" style={{ color: "var(--fg3)" }}>
            © {year} SafeRun. MIT License.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: "Documentation", to: "/docs" },
            { label: "Downloads", to: "/downloads" },
            { label: "Releases", to: "/releases" },
            { label: "GitHub", href: "https://github.com/dag12y/saferun" },
            {
              label: "License",
              href: "https://github.com/dag12y/saferun/blob/main/LICENSE",
            },
          ].map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:underline"
                style={{ color: "var(--fg3)" }}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                className="text-sm transition-colors hover:underline"
                style={{ color: "var(--fg3)", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  )
}
