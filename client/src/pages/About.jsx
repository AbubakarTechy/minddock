export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>About MindDock</h1>
        <p>
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
    marginTop: 40,
  },
  card: {
    width: 500,
    padding: 25,
    borderRadius: 16,
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
};