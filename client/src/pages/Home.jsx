import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/posts");
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

    await axios.post("http://localhost:5000/posts", {
      text,
      image: imageBase64,
    });

    setText("");
    setImageBase64("");
    fetchPosts();
  };

  // 🗑️ delete
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
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
    padding: "20px",
    fontFamily: "Arial",
    background: "#f6f7fb",
    minHeight: "100vh",
  },

  title: {
    textAlign: "center",
    fontSize: "30px",
    marginBottom: "20px",
  },

  createBox: {
    maxWidth: "600px",
    margin: "0 auto",
    background: "white",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  textarea: {
    width: "100%",
    height: "90px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },

  preview: {
    width: "100%",
    maxHeight: "250px",
    objectFit: "cover",
    marginTop: "10px",
    borderRadius: "12px",
  },

  postBtn: {
    width: "100%",
    marginTop: "10px",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },

  grid: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "12px",
    color: "#666",
  },

  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },

  text: {
    fontSize: "14px",
    marginBottom: "10px",
    lineHeight: "1.4",
  },

  image: {
    width: "100%",
    maxHeight: "220px",
    objectFit: "cover",
    borderRadius: "12px",
  },
};