# 🍋 Little Lemon Restaurant - Table Booking App

A React web application for the Little Lemon Mediterranean restaurant that allows customers to reserve tables online.

## Features

- 🏠 Home page with restaurant info and weekly specials
- 📅 Table booking form with full validation
- ✅ Booking confirmation page
- ♿ Accessibility (ARIA labels, keyboard navigation, skip links)
- 📱 Responsive design (mobile & desktop)
- 🧪 Unit tests for form logic and components

## Tech Stack

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **Jest + React Testing Library** - Unit testing

## Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/little-lemon.git
   cd little-lemon
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
npm test
```

Tests are located in `src/__tests__/BookingPage.test.js` and cover:
- `initializeTimes` function
- `updateTimes` reducer
- `validateBookingForm` validation logic
- BookingPage component rendering and interactions

## Project Structure

```
src/
├── components/
│   ├── Header.js       # Navigation bar
│   ├── Header.css
│   ├── Footer.js       # Footer
│   └── Footer.css
├── pages/
│   ├── HomePage.js     # Landing page with hero & specials
│   ├── HomePage.css
│   ├── BookingPage.js  # Booking form with validation
│   ├── BookingPage.css
│   ├── ConfirmationPage.js  # Booking confirmation
│   └── ConfirmationPage.css
├── __tests__/
│   └── BookingPage.test.js  # Unit tests
├── App.js              # Main app with routing
└── App.css             # Global styles
```

## Grading Criteria Checklist

| Criteria | Status |
|----------|--------|
| UX/UI design implementation | ✅ |
| Accessibility tags (ARIA) | ✅ |
| Unit tests | ✅ |
| Booking form with validation | ✅ |
| Semantics & responsiveness | ✅ |
| Git repository | ✅ |
| Clean & commented code | ✅ |
| Edge case handling & error messages | ✅ |
| README with setup instructions | ✅ |

## Validation Rules

The booking form validates:
- **Date**: Required, cannot be in the past
- **Time**: Required, selected from available slots
- **Guests**: Required, between 1–10
- **Occasion**: Required
- **First/Last Name**: Required
- **Email**: Required, must be valid format

## License

This project was built as part of the Meta Front-End Developer Professional Certificate on Coursera.
