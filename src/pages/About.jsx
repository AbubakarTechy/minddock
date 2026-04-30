export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>About MindDock</h1>
        <p style={styles.text}>
          MindDock is a personal space to store thoughts, ideas, reminders,
          and memories in a clean modern interface.
        </p>
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
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "40px",
    borderRadius: "24px",
    background: "var(--card-bg)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid var(--card-border)",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "24px",
    background: "var(--accent-gradient)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "var(--text-muted)",
  }
};
