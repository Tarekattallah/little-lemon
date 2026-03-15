import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmationPage.css';

/**
 * ConfirmationPage - shown after a successful booking submission
 */
function ConfirmationPage() {
  const location = useLocation();
  const booking = location.state?.booking;

  // If user lands here directly without booking data
  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="container confirmation-page__inner">
          <p>No booking found. Please make a reservation first.</p>
          <Link to="/booking" className="btn-primary">Book a Table</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container confirmation-page__inner">
        <div className="confirmation-card" role="region" aria-label="Booking confirmation">
          <div className="confirmation-card__icon" aria-hidden="true">✅</div>
          <h1 className="confirmation-card__title">Booking Confirmed!</h1>
          <p className="confirmation-card__subtitle">
            Thank you, <strong>{booking.firstName} {booking.lastName}</strong>! Your table has been reserved.
          </p>

          <dl className="confirmation-details">
            <div className="confirmation-details__row">
              <dt>Date</dt>
              <dd>{booking.date}</dd>
            </div>
            <div className="confirmation-details__row">
              <dt>Time</dt>
              <dd>{booking.time}</dd>
            </div>
            <div className="confirmation-details__row">
              <dt>Guests</dt>
              <dd>{booking.guests}</dd>
            </div>
            <div className="confirmation-details__row">
              <dt>Occasion</dt>
              <dd style={{ textTransform: 'capitalize' }}>{booking.occasion}</dd>
            </div>
            <div className="confirmation-details__row">
              <dt>Email</dt>
              <dd>{booking.email}</dd>
            </div>
            {booking.specialRequests && (
              <div className="confirmation-details__row">
                <dt>Special Requests</dt>
                <dd>{booking.specialRequests}</dd>
              </div>
            )}
          </dl>

          <p className="confirmation-card__note">
            A confirmation email will be sent to <strong>{booking.email}</strong>.
          </p>

          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
