import { useEffect, useState } from "react";

function Header() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const updateHeader = () => setCondensed(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${condensed ? " site-header--condensed" : ""}`}>
      <a className="wordmark" href="#top" aria-label="Ember and Oak home">Ember <i>&</i> Oak</a>
      <nav className="site-header__nav" aria-label="Primary navigation"><a href="#story">Our story</a><a href="#menu">The menu</a></nav>
      <a className="reservation-link" href="#contact">Plan your visit <span>↗</span></a>
    </header>
  );
}

export default Header;
