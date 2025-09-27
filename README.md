# 🛒 React Shopping App

A modern React single page application for shopping products with advanced filtering, cart management, and detailed product views. Built with TypeScript, Vite, and comprehensive testing.

## ✨ Features

- 🏪 **Product Catalog** - Browse products with responsive grid layout
- 🔍 **Smart Filtering** - Filter by brand and price range
- 🛒 **Shopping Cart** - Add/remove products with real-time updates
- 📄 **Product Details** - Detailed product information pages
- 🎯 **Type Safety** - Full TypeScript implementation

## 🚀 Technologies Used

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Redux Toolkit** - Efficient state management with modern Redux patterns
- **React Router v6** - Client-side routing with latest API
- **Vite** - Lightning-fast build tool and dev server
- **Vitest** - Fast unit testing framework
- **Testing Library** - Comprehensive component testing utilities

## 🏗️ Architecture

- **Component-based** - Modular, reusable React components
- **Redux Store** - Centralized state management for products, cart, and filters
- **TypeScript Interfaces** - Strongly typed props and state
- **Modern Hooks** - Functional components with React hooks

## 📦 Installation & Setup

### Prerequisites

- Node.js (v20 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jagadish404/react-shopping-app
   cd react-shopping-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

### Development

**Start the development server:**

```bash
pnpm dev
```

or

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Testing

**Run tests:**

```bash
pnpm test
```

**Run tests with coverage:**

```bash
pnpm test:coverage
```

### Production Build

**Build for production:**

```bash
pnpm build
```

**Preview production build:**

```bash
pnpm preview
```

## 🧪 Testing

This project includes comprehensive test coverage:

- Unit tests for most of the components
- Integration tests for Redux store
- ~~User interaction testing~~
- TypeScript type checking

## 🔧 Development Scripts

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start development server |
| `pnpm build`         | Build for production     |
| `pnpm preview`       | Preview production build |
| `pnpm test`          | Run tests                |
| `pnpm test:ui`       | Run tests with UI        |
| `pnpm test:coverage` | Run tests with coverage  |

## 📁 Project Structure

```
src/
├── components/         # React components
├── js/
│   ├── components/    # Feature components
│   ├── reducers/      # Redux slices
│   ├── types/         # TypeScript definitions
│   └── utils/         # Utility functions
├── css/               # Stylesheets
└── store.ts          # Redux store configuration
```

## 🌟 Recent Updates

This app has been modernized with:

- ⚡ **Vite** for faster development and builds
- 🛡️ **Full TypeScript** migration for type safety
- 🧪 **Vitest** for modern testing
- ⚛️ **React 18** with latest patterns
- 🔄 **Redux Toolkit** for efficient state management
