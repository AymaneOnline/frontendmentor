# Mortgage Repayment Calculator - React + Tailwind CSS

A modern, responsive mortgage calculator built with React and Tailwind CSS based on a Frontend Mentor design challenge.

## Features

- ✅ Calculate monthly mortgage repayments for both repayment and interest-only mortgages
- ✅ Form validation with clear error states
- ✅ Fully responsive design (mobile to desktop)
- ✅ Hover states for interactive elements
- ✅ Real-time calculation results
- ✅ Clear form functionality
- ✅ Accessible form inputs with proper labels

## Technologies Used

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **Plus Jakarta Sans** - Custom font

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Design Features

### Color Palette

- **Primary Colors:**
  - Lime: `hsl(61, 70%, 52%)`
  - Red: `hsl(4, 69%, 50%)`

- **Neutral Colors:**
  - White: `hsl(0, 0%, 100%)`
  - Slate 100: `hsl(202, 86%, 94%)`
  - Slate 300: `hsl(203, 41%, 72%)`
  - Slate 500: `hsl(200, 26%, 54%)`
  - Slate 700: `hsl(200, 24%, 40%)`
  - Slate 900: `hsl(202, 55%, 16%)`

### Typography

- Font Family: Plus Jakarta Sans
- Weights: 500 (Medium), 700 (Bold)
- Base Font Size: 16px

## Mortgage Calculation Formulas

### Repayment Mortgage
Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)

Where:
- P = Principal (loan amount)
- r = Monthly interest rate (annual rate / 12)
- n = Total number of payments (years × 12)

### Interest-Only Mortgage
Monthly Payment = P × r
Total Repayment = (Monthly Payment × n) + P

## Project Structure

```
mortgage-repayment-calculator-main/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports and custom styles
├── assets/
│   ├── fonts/           # Custom fonts
│   └── images/          # Icons and illustrations
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── postcss.config.js    # PostCSS configuration
```

## Features Implementation

### Form Validation
- All fields are required
- Real-time error clearing on input
- Visual error states with red borders
- Error messages below invalid fields

### Responsive Design
- Mobile-first approach
- Stacked layout on mobile
- Side-by-side layout on desktop
- Proper spacing and padding adjustments

### Interactive States
- Hover effects on buttons and inputs
- Focus states with lime border
- Selected radio button highlighting
- Active state for "Calculate" button

## License

This project is created for educational purposes as part of a Frontend Mentor challenge.

## Credits

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Coded by Aymane
