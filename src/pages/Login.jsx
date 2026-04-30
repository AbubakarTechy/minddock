import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await axios.post("/api/login", {
      username,
      password,
    });

    if (res.data.success) {
      localStorage.setItem("auth", "true");
      nav("/home");
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>MindDock</h1>

        <input style={styles.input} placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} />

        <input style={styles.input} type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button style={styles.btn} onClick={login}>Login</button>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    minHeight: "80vh",
    padding: "20px"
  },
  card: {
    padding: "40px",
    background: "var(--card-bg)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid var(--card-border)",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  input: {
    width: "100%",
    margin: "12px 0",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.2)",
    border: "1px solid var(--card-border)",
    color: "var(--text-main)",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.3s",
  },
  btn: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "var(--accent-gradient)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
    transition: "transform 0.2s",
  },
};
