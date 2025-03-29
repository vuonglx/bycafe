import React, { useState, useEffect } from 'react';

const HeroBanner = ({ slides, autoPlayInterval = 5000, pauseOnHover = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length, autoPlayInterval]);

  return (
    <div 
      className="hero-banner"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            opacity: index === currentSlide ? 1 : 0
          }}
        >
          <div className="banner-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <a href={slide.ctaLink} className="cta-button">{slide.ctaText}</a>
          </div>
        </div>
      ))}
      <div className="banner-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
