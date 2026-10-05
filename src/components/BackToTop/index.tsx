import { useEffect, useState } from "react";
import "./BackToTop.css";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = Math.min(1100, Math.max(550, start * 0.18));
    const startedAt = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, Math.round(start * (1 - eased)));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <button
      aria-label="Voltar ao topo"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      type="button"
    >
      <span>↑</span>
    </button>
  );
}

export default BackToTop;
