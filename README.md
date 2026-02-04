# Recruit AI

A modern, intelligent recruitment platform that leverages AI to analyze and match candidates with job positions. Recruit AI streamlines the hiring process by automatically evaluating resumes against job descriptions using advanced AI analysis.

## Features

- **Smart Resume Analysis**: Upload multiple resumes and get AI-powered analysis
- **Flexible Job Description Input**: Add job descriptions via text input or document upload (PDF/DOC)
- **Batch Processing**: Analyze multiple candidates simultaneously
- **Real-time Results**: View detailed matching scores and candidate analysis
- **Modern UI**: Built with React, TypeScript, and Shadcn UI components
- **Responsive Design**: Fully responsive design that works on desktop and mobile

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI based)
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router
- **Icons**: Lucide React
- **Testing**: Vitest
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kunal1325/Recruit-AI.git
cd Recruit-AI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Backend Setup

Ensure your backend API is running at `http://localhost:5678/webhook-test/recruit-ai/analyze`

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   └── NavLink.tsx     # Navigation component
├── pages/              # Page components
│   ├── Upload.tsx      # Resume & JD upload interface
│   ├── Processing.tsx  # Processing status page
│   ├── Results.tsx     # Analysis results display
│   ├── Confirmation.tsx # Confirmation page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## Usage

1. **Upload Phase**: 
   - Enter a job description manually or upload a file (PDF/DOC)
   - Upload one or multiple resume files

2. **Processing Phase**: 
   - The application sends data to the backend for AI analysis
   - Real-time status updates during processing

3. **Results Phase**: 
   - View detailed analysis and matching scores
   - Review candidate evaluations

## Development

### Code Quality

Run ESLint to check code quality:
```bash
npm run lint
```

### Testing

Run unit tests:
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

## Configuration Files

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite bundler configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `vitest.config.ts` - Test runner configuration
- `eslint.config.js` - Linting rules
- `postcss.config.js` - PostCSS configuration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software. All rights reserved.

## Contact

For more information about Recruit AI, please contact the development team.

---

**Built with ❤️ for modern recruitment**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
