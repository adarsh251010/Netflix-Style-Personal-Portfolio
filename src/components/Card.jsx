import { Link } from "react-router-dom";

export default function Card({ item }) {
  const backgroundImage = item.image
    ? item.image.includes("gradient(")
      ? item.image
      : `url(${item.image})`
    : undefined;

  return (
    <Link
      to={`/games/${item.id}`}
      className="card game-card"
      style={backgroundImage ? { backgroundImage } : undefined}
      aria-label={`Open ${item.title}`}
    >
      <div className="card-overlay">
        {item.badge ? <span className="card-badge">{item.badge}</span> : null}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className="card-cta">Open Module</span>
      </div>
    </Link>
  );
}
