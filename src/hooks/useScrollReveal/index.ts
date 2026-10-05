import { useEffect, type RefObject } from "react";

export function useScrollReveal(containerRef: RefObject<HTMLElement | null>, dependency: unknown) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");
    const delayTimers: number[] = [];

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const delay = Number.parseInt(target.dataset.revealDelay || "0", 10);
          target.classList.add("is-revealed");
          observer.unobserve(target);
          delayTimers.push(
            window.setTimeout(() => target.style.setProperty("--reveal-delay", "0ms"), 850 + delay),
          );
        });
      },
      { rootMargin: "0px 0px 100px", threshold: 0.01 },
    );

    elements.forEach((element, index) => {
      const delay = Math.min(index % 6, 2) * 90;
      element.classList.remove("is-revealed");
      element.dataset.revealDelay = String(delay);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      if (element.getBoundingClientRect().top <= window.innerHeight + 100) {
        element.classList.add("is-revealed");
      } else {
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      delayTimers.forEach(window.clearTimeout);
    };
  }, [containerRef, dependency]);
}
