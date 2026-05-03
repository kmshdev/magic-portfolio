# Quick Start Guide: Your Transformed Portfolio

## Immediate Next Steps

### 1. Add Your Professional Photo
Replace the avatar image with your professional headshot:

```bash
# Replace this file with your photo (square format recommended, 400x400px or larger)
/public/images/avatar.jpg
```

### 2. Add Project Images
Create cover images for your projects:

```bash
# Create these directories and add images:
/public/images/projects/genie/cover-01.jpg
/public/images/projects/rag-chatbot/cover-01.jpg
/public/images/projects/text2sql/cover-01.jpg
/public/images/projects/automl/cover-01.jpg
/public/images/projects/turbomachinery/cover-01.jpg
```

**Image Recommendations**:
- **Format**: JPG or PNG
- **Dimensions**: 1200x675px (16:9 aspect ratio) for best results
- **Size**: Keep under 500KB for fast loading
- **Content**: Screenshots, diagrams, or architectural illustrations

### 3. Update the Domain
Edit `src/resources/once-ui.config.ts`:

```typescript
// Line 17
const baseURL: string = "https://your-actual-domain.com";
```

### 4. Run Locally
```bash
cd magic-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### 5. Deploy to Cloudflare Workers

1. Push your changes to GitHub
2. Connect the repository in Cloudflare Workers Builds
3. Set the build command to `npm ci`
4. Set the deploy command to `npm run cf:deploy`
5. Add required secrets, including `PAGE_ACCESS_PASSWORD` for protected routes
6. Attach `kmsh.dev` and `www.kmsh.dev` as Worker custom domains

Preview locally with the Cloudflare runtime before deploying:

```bash
npm run cf:preview
```

## Content Customization

### Adding More Projects
Create a new `.mdx` file in `src/app/work/projects/`:

```mdx
---
title: "Your Project Title"
publishedAt: "2024-01-01"
summary: "Brief project description"
images:
  - "/images/projects/your-project/cover-01.jpg"
team:
  - name: "Keshav Mishra"
    role: "Your Role"
    avatar: "/images/avatar.jpg"
    linkedIn: "https://www.linkedin.com/in/keshav98"
---

## Overview
Your project content here...
```

### Adding Blog Posts
Create a new `.mdx` file in `src/app/blog/posts/`:

```mdx
---
title: "Your Blog Post Title"
publishedAt: "2024-01-01"
summary: "Brief post description"
author: "Keshav Mishra"
---

## Introduction
Your blog content here...
```

### Updating Personal Information
Edit `src/resources/content.tsx`:

```typescript
const person: Person = {
  firstName: "Keshav",
  lastName: "Mishra",
  name: `Keshav Mishra`,
  role: "LLM and ML Engineer",
  avatar: "/images/avatar.jpg",
  email: "me@kmsh.dev",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};
```

### Updating Work Experience
Edit the `work` section in `src/resources/content.tsx`:

```typescript
work: {
  display: true,
  title: "Work Experience",
  experiences: [
    {
      company: "Company Name",
      timeframe: "Start Date - End Date",
      role: "Your Role",
      achievements: [
        <>Achievement 1</>,
        <>Achievement 2</>,
      ],
      images: [],
    },
  ],
}
```

### Updating Technical Skills
Edit the `technical` section in `src/resources/content.tsx`:

```typescript
technical: {
  display: true,
  title: "Technical Skills",
  skills: [
    {
      title: "Skill Category",
      description: <>Description of your expertise</>,
      tags: [
        { name: "Technology 1", icon: "" },
        { name: "Technology 2", icon: "" },
      ],
      images: [],
    },
  ],
}
```

## Theme Customization

Edit `src/resources/once-ui.config.ts` to change the visual style:

```typescript
const style: StyleConfig = {
  theme: "dark",        // "dark" | "light" | "system"
  neutral: "slate",     // "sand" | "gray" | "slate"
  brand: "cyan",        // Main brand color
  accent: "violet",     // Accent color
  border: "rounded",    // "rounded" | "playful" | "conservative"
  surface: "translucent", // "filled" | "translucent"
};
```

## SEO Optimization

### Update Meta Tags
Each page automatically generates meta tags from the content configuration. To customize:

1. **Home Page**: Edit `home` object in `content.tsx`
2. **About Page**: Edit `about` object in `content.tsx`
3. **Work Page**: Edit `work` object in `content.tsx`
4. **Blog Page**: Edit `blog` object in `content.tsx`

### Add Custom Open Graph Images
Place custom OG images in `/public/images/og/`:
- `home.jpg` - Home page OG image
- `about.jpg` - About page OG image
- `work.jpg` - Work page OG image

## Optional Enhancements

### Enable Newsletter Signup
Edit `src/resources/content.tsx`:

```typescript
const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to my Newsletter</>,
  description: <>Monthly insights about LLM engineering</>,
};
```

Then configure Mailchimp in `once-ui.config.ts`:

```typescript
const mailchimp: MailchimpConfig = {
  action: "https://your-mailchimp-url.com/subscribe/post",
  // ... other config
};
```

### Add Password Protection
Create a `.env.local` file:

```env
PASSWORD=your_secure_password
```

Then enable protection in `once-ui.config.ts`:

```typescript
const protectedRoutes: ProtectedRoutesConfig = {
  "/work/project-name": true,
};
```

### Add Analytics
Add Google Analytics or Vercel Analytics:

```env
# .env.local
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors
Make sure all TypeScript types are correct. Check:
- `src/types/content.types.ts` for type definitions
- Ensure all required fields are provided in `content.tsx`

### Image Not Loading
- Check file paths are correct (case-sensitive)
- Ensure images are in `/public/` directory
- Verify image formats (JPG, PNG, WebP supported)

### Deployment Issues
- Ensure Node.js version is 22 or higher for Cloudflare deploy tooling
- Check all environment variables and secrets are set in Cloudflare
- Verify build completes successfully locally first

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## File Structure Reference

```
magic-portfolio/
├── public/
│   └── images/
│       ├── avatar.jpg          # Your profile photo
│       ├── og/                 # Open Graph images
│       └── projects/           # Project screenshots
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── about/page.tsx     # About page
│   │   ├── work/              # Projects section
│   │   │   └── projects/      # MDX project files
│   │   └── blog/              # Blog section
│   │       └── posts/         # MDX blog posts
│   ├── components/            # React components
│   ├── resources/
│   │   ├── content.tsx        # ⭐ Main content config
│   │   └── once-ui.config.ts  # ⭐ Theme config
│   └── types/                 # TypeScript types
├── .env.local                 # Environment variables (create this)
├── package.json
└── README.md
```

## Getting Help

- **Once UI Docs**: https://docs.once-ui.com
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

## What's Already Done ✅

- ✅ Personal information updated
- ✅ Work experience added
- ✅ Technical skills configured
- ✅ 5 project case studies created
- ✅ 1 blog post added
- ✅ Dark theme configured
- ✅ SEO metadata set up
- ✅ Build tested and working
- ✅ All routes functional

## What You Need to Do 📝

- [ ] Add your professional photo
- [ ] Add project cover images
- [ ] Update domain in config
- [ ] Deploy to Cloudflare Workers
- [ ] Test on mobile devices
- [ ] Share with your network!

---

**Need help?** All configuration is in `src/resources/content.tsx` and `src/resources/once-ui.config.ts`. Start there for any changes!
