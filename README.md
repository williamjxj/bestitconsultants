# Best IT Consultants

This is a Next.js application for the Best IT Consultants project, built with modern technologies
and best practices.

## Project Overview

This project is structured using Next.js 15.2.4, React 19, TypeScript 5, and TailwindCSS 4. It
follows a component-based architecture and implements strict TypeScript configuration along with
ESLint for code quality.

## Features

- **Next.js App Directory Structure**: Utilizes the latest Next.js features with an organized app
  directory.
- **TypeScript Support**: Strict TypeScript configuration for type safety.
- **TailwindCSS**: Styled with TailwindCSS for responsive design and utility-first CSS.
- **ESLint**: Integrated ESLint with recommended rules for maintaining code quality.
- **Dark Mode**: Configured dark mode support using TailwindCSS.

## Project Structure

```
bestitconsultants
├── src
│   ├── app
│   ├── components
│   ├── lib
│   └── types
├── __tests__
├── public
├── docs
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── eslint.config.js
├── prettier.config.js
└── README.md
```

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd bestitconsultants
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

4. **Open in Browser**: Navigate to `http://localhost:3000` to view the application.

## Development Guidelines

### Code Quality & Formatting

This project uses ESLint, Prettier, and EditorConfig to maintain consistent code quality and
formatting:

- **ESLint**: Configured with TypeScript, React, and accessibility rules
- **Prettier**: Handles code formatting with consistent style
- **EditorConfig**: Ensures consistent coding styles across different editors

#### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint on source files
npm run lint:fix     # Auto-fix ESLint errors
npm run format       # Format code with Prettier
npm run format:check # Check if code is formatted
npm run type-check   # Run TypeScript type checking
npm run check-all    # Run all checks (type, lint, format)
```

#### VS Code Integration

The project includes VS Code settings for optimal development experience:

- Auto-format on save with Prettier
- Auto-fix ESLint errors on save
- Recommended extensions for optimal development

#### Development Rules

- Follow the component-based architecture for building UI components.
- Use TypeScript interfaces for defining data structures.
- Write unit tests for components and utilities.
- Maintain code quality with ESLint and format code with Prettier.
- All imports should be organized according to the ESLint import/order rule.
- Use meaningful variable and function names.
- Add proper TypeScript types for all functions and components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug
fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
