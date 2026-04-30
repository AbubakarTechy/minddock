import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🖼️ image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  // ➕ create post
  const createPost = async () => {
    if (!text && !imageBase64) return;

    await axios.post("/api/posts", {
      text,
      image: imageBase64,
    });

    setText("");
    setImageBase64("");
    fetchPosts();
  };

  // 🗑️ delete
  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    fetchPosts();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🧠 MindDock</h1>

      {/* CREATE BOX */}
      <div style={styles.createBox}>
        <textarea
          style={styles.textarea}
          placeholder="✍️ Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        {imageBase64 && (
          <img src={imageBase64} style={styles.preview} />
        )}

        <button style={styles.postBtn} onClick={createPost}>
          🚀 Post
        </button>
      </div>

      {/* POSTS */}
      <div style={styles.grid}>
        {posts.map((p) => (
          <div key={p.id} style={styles.card}>

            {/* top row */}
            <div style={styles.topRow}>
              <small>📅 {p.created_at}</small>

              <button
                onClick={() => deletePost(p.id)}
                style={styles.deleteBtn}
              >
                ❌
              </button>
            </div>

            {/* text */}
            <p style={styles.text}>{p.text}</p>

            {/* image (FIXED SIZE) */}
            {p.image && (
              <img src={p.image} style={styles.image} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "30px",
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-1px",
  },
  createBox: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "var(--card-bg)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid var(--card-border)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "16px",
    borderRadius: "14px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid var(--card-border)",
    color: "var(--text-main)",
    outline: "none",
    fontSize: "16px",
    fontFamily: "inherit",
    resize: "none",
    transition: "border 0.2s",
  },
  preview: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "cover",
    marginTop: "16px",
    borderRadius: "14px",
    border: "1px solid var(--card-border)",
  },
  postBtn: {
    width: "100%",
    marginTop: "16px",
    padding: "14px",
    background: "var(--accent-gradient)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
    transition: "transform 0.2s",
  },
  grid: {
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "40px auto 0",
  },
  card: {
    background: "var(--card-bg)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "20px",
    borderRadius: "20px",
    border: "1px solid var(--card-border)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    fontSize: "13px",
    color: "var(--text-muted)",
  },
  deleteBtn: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "4px 8px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s",
  },
  text: {
    fontSize: "15px",
    marginBottom: "16px",
    lineHeight: "1.6",
    color: "var(--text-main)",
    whiteSpace: "pre-wrap",
  },
  image: {
    width: "100%",
    maxHeight: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
};
