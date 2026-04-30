import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.text}>{post.text}</h2>
        <small style={styles.date}>{post.created_at}</small>
        {post.image && <img src={post.image} style={styles.img} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    minHeight: "80vh",
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    padding: "32px",
    borderRadius: "24px",
    background: "var(--card-bg)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid var(--card-border)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  img: {
    width: "100%",
    marginTop: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  text: {
    fontSize: "20px",
    lineHeight: "1.6",
    marginBottom: "16px",
    color: "var(--text-main)",
  },
  date: {
    color: "var(--text-muted)",
    fontSize: "14px",
  }
};
