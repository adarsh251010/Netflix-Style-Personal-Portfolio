import Card from "./Card";

export default function Row({ title, description, items = [] }) {
  return (
    <div className="row">
      <h2 className="section-title-xl title-texture">{title}</h2>
      {description ? (
        <p className="section-subtitle">{description}</p>
      ) : null}

      <div className="row-cards">
        {items.length === 0 ? (
          <p style={{ color: "#999" }}>No items to display</p>
        ) : (
          items.map((item, index) => (
            <Card key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
