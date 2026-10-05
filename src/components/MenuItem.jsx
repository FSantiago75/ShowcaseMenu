function MenuItem({ item, index }) {
  return (
    <article className="menu-item" style={{ "--item-delay": `${Math.min(index * 55, 280)}ms` }}>
      <p className="menu-item__number">{String(index + 1).padStart(2, "0")}</p>
      <div className="menu-item__image"><img alt={item.name} loading="lazy" src={item.image} /></div>
      <div className="menu-item__content">
        <p className="menu-item__meta">{item.category} · {item.note}</p>
        <div className="menu-item__title"><h3>{item.name}</h3><span>${item.price}</span></div>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export default MenuItem;
