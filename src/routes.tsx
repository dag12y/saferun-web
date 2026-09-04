import { createBrowserRouter } from "react-router"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Docs from "./pages/Docs"
import Downloads from "./pages/Downloads"
import Releases from "./pages/Releases"
import NotFound from "./pages/NotFound"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "docs", Component: Docs },
      { path: "downloads", Component: Downloads },
      { path: "releases", Component: Releases },
      { path: "*", Component: NotFound },
    ],
  },
])
