import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [posts, setPosts] = useState([]);

  // 📦 Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🖼️ Convert image → base64
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  // ➕ Create post
  const createPost = async () => {
    if (!text && !imageBase64) {
      alert("Write something or add image");
      return;
    }

    try {
      await axios.post("/api/posts", {
        text,
        image: imageBase64,
      });

      setText("");
      setImageBase64("");
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑️ Delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts?id=${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>MindDock</h1>

      {/* CREATE BOX */}
      <div style={styles.createBox}>
        <textarea
          style={styles.textarea}
          placeholder="Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        {imageBase64 && (
          <img src={imageBase64} style={styles.preview} alt="preview" />
        )}

        <button style={styles.postBtn} onClick={createPost}>
          Post
        </button>
      </div>

      {/* POSTS */}
      <div style={styles.grid}>
        {posts.map((p) => (
          <div key={p.id} style={styles.card}>
            <div style={styles.topRow}>
              <small>{p.created_at}</small>

              <button
                style={styles.deleteBtn}
                onClick={() => deletePost(p.id)}
              >
                Delete
              </button>
            </div>

            <p style={styles.text}>{p.text}</p>

            {p.image && (
              <img src={p.image} style={styles.image} alt="post" />
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
    background: "#f6f7fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
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
    marginBottom: "10px",
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "5px 8px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  text: {
    fontSize: "14px",
  },

  image: {
    width: "100%",
    maxHeight: "220px",
    objectFit: "cover",
    borderRadius: "12px",
    marginTop: "10px",
  },
};