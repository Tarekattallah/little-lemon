import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

/**
 * HomePage - Hero section for Little Lemon restaurant
 */
function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 id="hero-heading" className="hero__title">Little Lemon</h1>
            <h2 className="hero__subtitle">Chicago</h2>
            <p className="hero__description">
              We are a family owned Mediterranean restaurant, focused on traditional
              recipes served with a modern twist. Enjoy fresh ingredients and flavors
              from the heart of the Mediterranean.
            </p>
            <Link to="/booking" className="btn-primary" aria-label="Reserve a table at Little Lemon">
              Reserve a Table
            </Link>
          </div>
          <div className="hero__image" role="img" aria-label="Delicious Mediterranean food at Little Lemon">
            <div className="hero__image-placeholder">🍋</div>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="specials" aria-labelledby="specials-heading">
        <div className="container">
          <div className="specials__header">
            <h2 id="specials-heading">This Week's Specials</h2>
            <Link to="/booking" className="btn-primary">Online Menu</Link>
          </div>
          <div className="specials__grid">
            {specials.map((item) => (
              <article key={item.id} className="special-card" aria-label={item.name}>
                <div className="special-card__emoji" role="img" aria-label={item.name}>{item.emoji}</div>
                <div className="special-card__body">
                  <div className="special-card__header">
                    <h3>{item.name}</h3>
                    <span className="special-card__price">{item.price}</span>
                  </div>
                  <p className="special-card__desc">{item.description}</p>
                  <a href="#order" className="special-card__link">Order a delivery 🛵</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const specials = [
  {
    id: 1,
    name: 'Greek Salad',
    price: '$12.99',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.',
    emoji: '🥗',
  },
  {
    id: 2,
    name: 'Bruschetta',
    price: '$5.99',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    emoji: '🍞',
  },
  {
    id: 3,
    name: 'Lemon Dessert',
    price: '$5.00',
    description: "This comes straight from grandma's recipe book. Every ingredient has been sourced and is as authentic as can be imagined.",
    emoji: '🍋',
  },
];

export default HomePage;
