import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{post.text}</h2>
        <small>{post.created_at}</small>
        {post.image && <img src={post.image} style={styles.img} />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },
  card: {
    width: 500,
    padding: 20,
    borderRadius: 16,
    background: "white",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
  },
  img: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
  },
};