function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="eyebrow">Seasonal kitchen · Open fire</p>
        <h1>Gather<br />around<br /><em>the good stuff.</em></h1>
        <div className="hero__footer"><p>A neighborhood kitchen shaped by flame, season and the simple pleasure of eating together.</p><a href="#menu">Explore the menu <span>↓</span></a></div>
      </div>
      <div className="hero__visual" aria-label="Seasonal dish plated at Ember and Oak">
        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=90" alt="Seasonal roasted vegetables on a shared table" />
        <p className="hero__caption">Dinner, Tuesday — Sunday<br />From 5:30 pm</p>
        <span className="hero__edition">E/O<br />No. 01</span>
      </div>
      <p className="hero__marquee" aria-hidden="true">Fire · Field · Table · Fire · Field · Table ·</p>
    </section>
  );
}

export default Hero;
