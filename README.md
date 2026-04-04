# Deep Shah - Software Engineer Portfolio

A modern, responsive portfolio website showcasing professional experience, education, certifications, and articles

## Features

- **Hero Section**: Professional introduction with name, title, and summary
- **Experience Timeline**: Career history with company details and descriptions
- **Education Timeline**: Academic background and qualifications
- **Certifications Grid**: Professional credentials and achievements
- **Articles Section**: Links to LinkedIn and Medium articles
- **Responsive Design**: Mobile-first approach with elegant styling
- **Fast Performance**: Static site generation with Vite

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **Wouter** - Lightweight routing

## Local Development

### Prerequisites

- Node.js 22+
- pnpm 10+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server will start at `http://localhost:5173`

## GitHub Pages Deployment

This site is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Initial Setup

1. Push this repository to `https://github.com/deepshah22/deepshah22.github.io`
2. Go to repository Settings → Pages
3. Ensure "Build and deployment" source is set to "GitHub Actions"
4. The deployment workflow will run automatically on every push to `main`

### Manual Deployment

To build and deploy manually:

```bash
# Build the project
pnpm build

# The `dist` folder contains the static site ready for deployment
```

## Project Structure

```
deep-shah-portfolio/
├── client/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── contexts/    # React contexts
│   │   ├── lib/         # Utilities and data
│   │   ├── pages/       # Page components
│   │   ├── App.tsx      # Main app component
│   │   ├── main.tsx     # Entry point
│   │   └── index.css    # Global styles
│   └── index.html       # HTML template
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Customization

### Update Portfolio Data

Edit `client/src/lib/portfolioData.ts` to update:
- Personal information (name, title, location)
- Experience entries
- Education details
- Certifications
- Social media links

### Styling

Global styles are defined in `client/src/index.css`. The design uses:
- Elegant teal/navy color palette
- Professional typography
- Smooth animations and transitions

### Navigation

Update navigation items in `client/src/components/Navigation.tsx`

## Performance

- **Static Site Generation**: Pre-built HTML for fast loading
- **Optimized Assets**: Minified CSS and JavaScript
- **Responsive Images**: Mobile-optimized design
- **SEO Ready**: Semantic HTML structure

## License

MIT

## Contact

- LinkedIn: [linkedin.com/in/deepshah22](https://linkedin.com/in/deepshah22)
- GitHub: [github.com/deepshah22](https://github.com/deepshah22)

