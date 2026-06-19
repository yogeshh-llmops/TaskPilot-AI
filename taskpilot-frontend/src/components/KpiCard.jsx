export default function KpiCard({ title, value, icon, gradient }) {
  return (
    <div
      style={{
        background: gradient,
        padding: "20px",
        borderRadius: "16px",
        color: "white",
        transition: "0.3s",
      }}
    >
      {icon}
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}