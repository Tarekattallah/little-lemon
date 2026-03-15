import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

/* ===== Available times logic ===== */

/**
 * Returns available time slots based on the selected date.
 * Different days have different availability to simulate real data.
 */
export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
}

export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') {
    const date = new Date(action.payload);
    const day = date.getDay(); // 0=Sun, 6=Sat
    // Weekends have fewer slots (simulate busy restaurant)
    if (day === 0 || day === 6) {
      return ['18:00', '19:00', '20:00'];
    }
    return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  }
  return state;
}

/* ===== Validation ===== */

/**
 * Validates the booking form fields.
 * Returns an object with error messages, empty string = no error.
 */
export function validateBookingForm(formData) {
  const errors = {};

  if (!formData.date) {
    errors.date = 'Please select a date.';
  } else {
    const selected = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = 'Date cannot be in the past.';
    }
  }

  if (!formData.time) {
    errors.time = 'Please select a time.';
  }

  if (!formData.guests || formData.guests < 1 || formData.guests > 10) {
    errors.guests = 'Number of guests must be between 1 and 10.';
  }

  if (!formData.occasion) {
    errors.occasion = 'Please select an occasion.';
  }

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
}

/* ===== Booking Page Component ===== */

function BookingPage() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    firstName: '',
    lastName: '',
    email: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  /* Handle input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Update available times when date changes
    if (name === 'date') {
      dispatch({ type: 'UPDATE_TIMES', payload: value });
      setFormData((prev) => ({ ...prev, time: '' })); // reset time
    }
  };

  /* Get today's date as min value for date input */
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  /* Handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validateBookingForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus on first error field for accessibility
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    // Success - navigate to confirmation page with booking data
    navigate('/confirmation', { state: { booking: formData } });
  };

  return (
    <div className="booking-page">
      <div className="container">
        <section aria-labelledby="booking-heading">
          <h1 id="booking-heading" className="booking-page__title">Reserve a Table</h1>
          <p className="booking-page__subtitle">
            Book your table at Little Lemon and enjoy an unforgettable Mediterranean experience.
          </p>

          <form
            className="booking-form"
            onSubmit={handleSubmit}
            aria-label="Table reservation form"
            noValidate
          >
            {/* ---- Date & Time ---- */}
            <fieldset className="booking-form__fieldset">
              <legend className="booking-form__legend">Date & Time</legend>

              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Date <span aria-hidden="true">*</span>
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className={`form-input ${errors.date ? 'form-input--error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                  min={getTodayString()}
                  aria-required="true"
                  aria-describedby={errors.date ? 'date-error' : undefined}
                  aria-invalid={!!errors.date}
                />
                {errors.date && (
                  <span id="date-error" className="form-error" role="alert">
                    {errors.date}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="time" className="form-label">
                  Time <span aria-hidden="true">*</span>
                </label>
                <select
                  id="time"
                  name="time"
                  className={`form-input ${errors.time ? 'form-input--error' : ''}`}
                  value={formData.time}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.time ? 'time-error' : undefined}
                  aria-invalid={!!errors.time}
                >
                  <option value="">-- Select a time --</option>
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.time && (
                  <span id="time-error" className="form-error" role="alert">
                    {errors.time}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="guests" className="form-label">
                  Number of Guests <span aria-hidden="true">*</span>
                </label>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  className={`form-input ${errors.guests ? 'form-input--error' : ''}`}
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  aria-required="true"
                  aria-describedby={errors.guests ? 'guests-error' : 'guests-hint'}
                  aria-invalid={!!errors.guests}
                />
                <span id="guests-hint" className="form-hint">Between 1 and 10 guests</span>
                {errors.guests && (
                  <span id="guests-error" className="form-error" role="alert">
                    {errors.guests}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="occasion" className="form-label">
                  Occasion <span aria-hidden="true">*</span>
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  className={`form-input ${errors.occasion ? 'form-input--error' : ''}`}
                  value={formData.occasion}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.occasion ? 'occasion-error' : undefined}
                  aria-invalid={!!errors.occasion}
                >
                  <option value="">-- Select occasion --</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meal</option>
                  <option value="other">Other</option>
                </select>
                {errors.occasion && (
                  <span id="occasion-error" className="form-error" role="alert">
                    {errors.occasion}
                  </span>
                )}
              </div>
            </fieldset>

            {/* ---- Personal Info ---- */}
            <fieldset className="booking-form__fieldset">
              <legend className="booking-form__legend">Your Details</legend>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${errors.firstName ? 'form-input--error' : ''}`}
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    aria-required="true"
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <span id="firstName-error" className="form-error" role="alert">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${errors.lastName ? 'form-input--error' : ''}`}
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    aria-required="true"
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <span id="lastName-error" className="form-error" role="alert">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-required="true"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests" className="form-label">
                  Special Requests <span className="form-optional">(optional)</span>
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  className="form-input form-textarea"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Allergies, accessibility needs, seating preferences..."
                  aria-describedby="specialRequests-hint"
                />
                <span id="specialRequests-hint" className="form-hint">
                  Let us know about any dietary restrictions or special needs.
                </span>
              </div>
            </fieldset>

            {/* Required note */}
            <p className="form-required-note">
              <span aria-hidden="true">*</span> Required fields
            </p>

            <button type="submit" className="btn-primary booking-form__submit">
              Confirm Reservation
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default BookingPage;
