import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetails";
import About from "./pages/About";

/* =========================
   PROTECTED ROUTE
========================= */
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("auth");
  return isAuth ? children : <Navigate to="/" replace />;
}

/* =========================
   NAVBAR (FIXED - NO EMOJI)
========================= */
function Navbar() {
  const isAuth = localStorage.getItem("auth");

  const logout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };

  if (!isAuth) return null;

  return (
    <div style={styles.nav}>
      <div style={styles.logo}>MindDock</div>

      <div style={styles.links}>
        <a href="/home" style={styles.link}>Home</a>
        <a href="/posts" style={styles.link}>Posts</a>
        <a href="/about" style={styles.link}>About</a>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* =========================
   APP
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

/* =========================
   NAVBAR STYLE (RESPONSIVE)
========================= */
const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(11, 15, 25, 0.75)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid var(--card-border)",
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "700",
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  link: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  logout: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "8px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
};