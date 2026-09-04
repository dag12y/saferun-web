import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 py-32 text-center">
      <p
        className="mono text-6xl font-bold mb-6"
        style={{ color: "var(--border2)" }}
      >
        404
      </p>
      <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
        Page not found
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--fg2)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 rounded-lg text-sm font-medium"
          style={{
            background: "var(--accent)",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Go home
        </Link>
        <Link
          to="/docs"
          className="px-5 py-2.5 rounded-lg text-sm font-medium border"
          style={{
            borderColor: "var(--border2)",
            color: "var(--fg)",
            textDecoration: "none",
            background: "var(--card)",
          }}
        >
          Documentation
        </Link>
      </div>
    </div>
  )
}
