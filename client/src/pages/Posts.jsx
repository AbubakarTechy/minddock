import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Posts</h1>

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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 15,
  },
  card: {
    padding: 15,
    borderRadius: 16,
    background: "white",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
};