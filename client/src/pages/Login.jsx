import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
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
        <h1>MindDock Login</h1>

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
  container: { display: "flex", justifyContent: "center", marginTop: 100 },
  card: {
    padding: 30,
    background: "white",
    borderRadius: 15,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: 300,
    textAlign: "center",
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  btn: {
    width: "100%",
    padding: 10,
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: 8,
  },
};