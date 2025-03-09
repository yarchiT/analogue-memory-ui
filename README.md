# Analogue Memory Frontend

Analogue Memory is a platform that allows users to catalog and compare their nostalgic memories with others. This frontend application provides an intuitive interface for users to browse memory items, build their personal libraries, and find connections with other users through shared memories.

## Project Overview

The Analogue Memory Frontend is built with:
- React 18
- TypeScript
- Vite
- TailwindCSS (for styling)
- React Router (for navigation)
- Cloudflare Pages (for deployment)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/analogue-memory-frontend.git
cd analogue-memory-frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
analogue-memory-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, and other assets
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services and utilities
│   ├── store/           # Global state management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .gitignore           # Git ignore file
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn lint` - Run ESLint to check for code issues
- `yarn preview` - Preview the production build locally
- `yarn deploy` - Deploy the application to Cloudflare Pages

## Deployment

The application is deployed to Cloudflare Pages. Each commit to the main branch triggers a new deployment.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
