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
    background: "#111",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 18px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },

  logout: {
    background: "#ff4d4f",
    border: "none",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};