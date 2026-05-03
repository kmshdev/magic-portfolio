# Keshav Mishra - Portfolio

A professional portfolio showcasing my work as an LLM and ML Engineer, built with Once UI and Next.js. Features include project case studies, technical blog posts, and an interactive CV.

![Portfolio Preview](public/images/og/home.jpg)

## About

This portfolio highlights my expertise in:
- **LLM Engineering**: Building autonomous agents, RAG systems, and production LLM applications
- **MLOps**: End-to-end ML pipelines, AutoML platforms, and model deployment
- **Predictive Analytics**: Machine learning for industrial applications and predictive maintenance
- **Open Source**: Published libraries on PyPI and npm for the AI community

## Featured Projects

1. **Genie Code Generation Platform** - LLM-driven agent scaffolding platform
2. **RAG Chatbot for Oil & Gas** - GPT-4 powered technical documentation assistant
3. **Text2SQL2Plot Agent** - Natural language to SQL with automated visualization
4. **AutoML Platform** - End-to-end automated ML pipeline with MLOps
5. **Turbomachinery Failure Prediction** - 96.5% accurate predictive maintenance system

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Once UI Core
- **Styling**: CSS Modules + Once UI theming system
- **Content**: MDX for blog posts and project case studies
- **Deployment**: Cloudflare Workers with OpenNext

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/keshav1998/magic-portfolio.git
cd magic-portfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

**4. Build for production**
```bash
npm run build
npm start
```

## Project Structure

```
magic-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx        # About/CV page
│   │   ├── work/
│   │   │   ├── page.tsx          # Projects listing
│   │   │   └── projects/         # MDX project files
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing
│   │       └── posts/            # MDX blog posts
│   ├── components/               # React components
│   └── resources/
│       ├── content.tsx           # Content configuration
│       └── once-ui.config.ts     # Theme configuration
├── public/
│   └── images/                   # Images and assets
└── package.json
```

## Customization

### Content Configuration

Edit `src/resources/content.tsx` to update:
- Personal information
- Work experience
- Technical skills
- Social links
- Page content

### Theme Configuration

Edit `src/resources/once-ui.config.ts` to customize:
- Color scheme (dark/light/system)
- Brand colors
- Typography
- Border styles
- Visual effects

### Adding Projects

Create a new `.mdx` file in `src/app/work/projects/`:

```mdx
---
title: "Project Title"
publishedAt: "2024-01-01"
summary: "Brief project description"
images:
  - "/images/projects/project-name/cover.jpg"
team:
  - name: "Your Name"
    role: "Your Role"
    avatar: "/images/avatar.jpg"
---

## Project content here...
```

### Adding Blog Posts

Create a new `.mdx` file in `src/app/blog/posts/`:

```mdx
---
title: "Blog Post Title"
publishedAt: "2024-01-01"
summary: "Brief post description"
author: "Your Name"
---

## Blog content here...
```

## Features

### Once UI Integration
- 100+ production-ready components
- Comprehensive theming system
- Responsive design out of the box
- Accessibility-first approach

### SEO Optimized
- Automatic Open Graph image generation
- Dynamic metadata based on content
- Structured data (Schema.org)
- Sitemap and robots.txt

### Performance
- Server-side rendering with Next.js
- Optimized images with next/image
- Minimal JavaScript bundle
- Fast page loads

### Content Management
- MDX for rich content with React components
- Syntax highlighting for code blocks
- Responsive images and media
- Easy content updates without code changes

## Environment Variables

Create a `.env.local` file for optional features:

```env
# Password protection (optional)
PASSWORD=your_secure_password

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Deployment

### Deploy to Cloudflare Workers

1. Connect the repository in Cloudflare Workers Builds
2. Set the build command to `npm ci`
3. Set the deploy command to `npm run cf:deploy`
4. Set `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`
5. Attach `kmsh.dev` and `www.kmsh.dev` as Worker custom domains

The Wrangler config builds `.open-next/worker.js` when it is missing, so PR preview
uploads work without rebuilding after OpenNext has populated production cache assets.

### Manual Deployment

```bash
npm run cf:deploy
```

Use `npm run cf:preview` to verify the OpenNext Worker locally before deploying.

## Documentation

- [Once UI Documentation](https://docs.once-ui.com)
- [Magic Portfolio Guide](https://docs.once-ui.com/products/magic-portfolio/quick-start)
- [Next.js Documentation](https://nextjs.org/docs)

## Connect

- **Email**: [me@kmsh.dev](mailto:me@kmsh.dev)
- **LinkedIn**: [linkedin.com/in/keshav98](https://www.linkedin.com/in/keshav98)
- **GitHub**: [github.com/keshav1998](https://github.com/keshav1998)

## Open Source Contributions

- **genie-cli** (PyPI): LLM-powered agent scaffolding platform
- **plugin-memeooorr** (npm): Meme-centric agent plugin
- **agents-fun-eliza**: Autonomous conversational agent framework

## License

This portfolio is built on the Magic Portfolio template by Once UI.

**Template License**: CC BY-NC 4.0
- Attribution required
- Personal use allowed
- Commercial use requires [Once UI Pro](https://once-ui.com/pricing)

**Content License**: All project descriptions, blog posts, and personal content © 2025 Keshav Mishra

## Acknowledgments

Built with [Once UI](https://once-ui.com) and [Next.js](https://nextjs.org).

Template created by [Lorant One](https://www.linkedin.com/in/lorant-one/).
