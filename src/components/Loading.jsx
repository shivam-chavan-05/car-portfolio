export default function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      <div style={{ marginTop: 16, color: "#fff", fontFamily: "monospace" }}>
        Loading 3D World...
      </div>
    </div>
  );
}