import { initializeTimes, updateTimes, validateBookingForm } from '../pages/BookingPage';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingPage from '../pages/BookingPage';

/* ===== Tests for initializeTimes ===== */
describe('initializeTimes', () => {
  test('returns an array of time slots', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test('all times are in HH:MM format', () => {
    const times = initializeTimes();
    times.forEach((t) => {
      expect(t).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});

/* ===== Tests for updateTimes ===== */
describe('updateTimes', () => {
  test('returns updated times for a weekday (Monday)', () => {
    // Monday = 2026-03-16
    const result = updateTimes([], { type: 'UPDATE_TIMES', payload: '2026-03-16' });
    expect(result.length).toBeGreaterThan(0);
  });

  test('returns fewer times for weekend (Saturday)', () => {
    // Saturday = 2026-03-14
    const weekdayTimes = updateTimes([], { type: 'UPDATE_TIMES', payload: '2026-03-16' });
    const weekendTimes = updateTimes([], { type: 'UPDATE_TIMES', payload: '2026-03-14' });
    expect(weekendTimes.length).toBeLessThanOrEqual(weekdayTimes.length);
  });

  test('returns current state for unknown action', () => {
    const currentState = ['17:00', '18:00'];
    const result = updateTimes(currentState, { type: 'UNKNOWN' });
    expect(result).toEqual(currentState);
  });
});

/* ===== Tests for validateBookingForm ===== */
describe('validateBookingForm', () => {
  const validData = {
    date: '2026-12-31',
    time: '19:00',
    guests: 4,
    occasion: 'birthday',
    firstName: 'Ahmed',
    lastName: 'Mohamed',
    email: 'ahmed@example.com',
    specialRequests: '',
  };

  test('returns no errors for valid data', () => {
    const errors = validateBookingForm(validData);
    expect(Object.keys(errors).length).toBe(0);
  });

  test('returns error when date is missing', () => {
    const errors = validateBookingForm({ ...validData, date: '' });
    expect(errors.date).toBeTruthy();
  });

  test('returns error when time is missing', () => {
    const errors = validateBookingForm({ ...validData, time: '' });
    expect(errors.time).toBeTruthy();
  });

  test('returns error when guests is 0', () => {
    const errors = validateBookingForm({ ...validData, guests: 0 });
    expect(errors.guests).toBeTruthy();
  });

  test('returns error when guests exceeds 10', () => {
    const errors = validateBookingForm({ ...validData, guests: 11 });
    expect(errors.guests).toBeTruthy();
  });

  test('returns error when occasion is missing', () => {
    const errors = validateBookingForm({ ...validData, occasion: '' });
    expect(errors.occasion).toBeTruthy();
  });

  test('returns error when firstName is empty', () => {
    const errors = validateBookingForm({ ...validData, firstName: '' });
    expect(errors.firstName).toBeTruthy();
  });

  test('returns error when lastName is empty', () => {
    const errors = validateBookingForm({ ...validData, lastName: '' });
    expect(errors.lastName).toBeTruthy();
  });

  test('returns error when email is invalid', () => {
    const errors = validateBookingForm({ ...validData, email: 'not-an-email' });
    expect(errors.email).toBeTruthy();
  });

  test('returns error when email is empty', () => {
    const errors = validateBookingForm({ ...validData, email: '' });
    expect(errors.email).toBeTruthy();
  });

  test('accepts valid email', () => {
    const errors = validateBookingForm({ ...validData, email: 'test@example.com' });
    expect(errors.email).toBeFalsy();
  });
});

/* ===== Tests for BookingPage component ===== */
describe('BookingPage component', () => {
  test('renders the booking form heading', () => {
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', () => {
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Confirm Reservation'));
    expect(screen.getByText('Please select a date.')).toBeInTheDocument();
  });

  test('submit button is present', () => {
    render(
      <MemoryRouter>
        <BookingPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeInTheDocument();
  });
});
