import { useEffect, useRef, useState } from "react";

export function useAnimatedCategory(initialCategory: string, transitionDuration = 220) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const transitionTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    },
    [],
  );

  const changeCategory = (category: string) => {
    if (category === selectedCategory) return;

    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    setSelectedCategory(category);
    setIsChangingCategory(true);

    transitionTimer.current = window.setTimeout(() => {
      setActiveCategory(category);
      setIsChangingCategory(false);
    }, transitionDuration);
  };

  return { activeCategory, selectedCategory, isChangingCategory, changeCategory };
}
