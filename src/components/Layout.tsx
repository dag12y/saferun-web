import { Outlet } from "react-router"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
