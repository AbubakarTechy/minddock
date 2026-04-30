import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>All Posts</h1>

      <div style={styles.grid}>
        {posts.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => nav(`/post/${p.id}`)}
          >
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    padding: "24px",
    borderRadius: "20px",
    background: "var(--card-bg)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid var(--card-border)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    cursor: "pointer",
    transition: "transform 0.3s ease, border-color 0.3s ease",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    margin: "40px 0",
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
  },
  page: {
    padding: "0 20px 40px",
  }
};
