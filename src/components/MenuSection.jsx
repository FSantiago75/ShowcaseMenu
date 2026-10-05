import MenuItem from "./MenuItem";

function MenuSection({ items }) {
  if (!items.length) return <div className="menu-empty page-shell" role="status"><p>No dishes found.</p><span>Try another search or category.</span></div>;

  return <div className="menu-list page-shell" aria-live="polite">{items.map((item, index) => <MenuItem index={index} item={item} key={item.id} />)}</div>;
}

export default MenuSection;
