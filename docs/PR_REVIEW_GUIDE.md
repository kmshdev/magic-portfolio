# PR Review Guide for Magic Portfolio

## Overview

This document provides comprehensive guidelines for reviewing pull requests in the Magic Portfolio project. The portfolio is built with **Once UI Core** and **Next.js App Router**, requiring strict adherence to component-first architecture, semantic styling, and accessibility standards.

---

## Quick Reference

| Category | Priority | Key Focus |
|----------|----------|-----------|
| Once UI Compliance | 🚨 Critical | Component usage, theme tokens, no hardcoded styles |
| Accessibility | 🚨 Critical | WCAG 2.1 AA, keyboard navigation, semantic HTML |
| Build & TypeScript | 🚨 Critical | Must pass build, zero TS errors |
| Next.js Patterns | ⚠️ Important | Server/Client components, routing, metadata |
| Design Consistency | ⚠️ Important | Dark theme, brand colors, responsive |
| Performance | 💡 Minor | Bundle size, optimization opportunities |

---

## Project-Specific Context

### Tech Stack
The Magic Portfolio is built with a carefully selected technology stack that emphasizes design consistency and developer experience. The foundation is **Once UI Core**, a component-first design system that provides semantic styling through configuration rather than ad-hoc CSS. This is paired with **Next.js 14+ App Router**, which enables server-side rendering, optimized routing, and modern React patterns. Content is managed through **MDX**, allowing rich, component-enhanced markdown for project case studies and blog posts. The entire codebase is written in **TypeScript**, ensuring type safety and better developer tooling.

### Design Philosophy
The portfolio follows a strict component-first philosophy inherited from Once UI. Rather than building custom UI primitives, developers should leverage the extensive component library provided by `@once-ui-system/core`. Styling is achieved through semantic tokens and global theme configuration defined in `once-ui.config.ts`, not through scattered Tailwind classes or inline styles. The design system uses data-attributes and providers for theming, ensuring consistent dark mode support and brand color application across all pages.

### Brand Identity
The portfolio represents a professional LLM and ML engineer with a carefully crafted visual identity. The primary theme is **dark mode**, optimized for technical audiences. The brand colors are **cyan** (representing AI/tech aesthetic) and **violet** (representing AI/ML purple), applied consistently through the theme configuration. All design decisions should reinforce this professional, tech-forward identity.

---

## Detailed Review Checklist

### 1. Once UI Compliance (Critical Priority)

Once UI provides a comprehensive component library designed to eliminate the need for custom primitives. Every PR must demonstrate proper use of these components and adherence to the design system's principles.

**Component Usage**: Verify that the code uses existing Once UI Core components rather than recreating functionality. For example, if the PR introduces a card-like structure, it should use the `<Card>` component from Once UI, not a custom `<div>` with manual styling. Common components include `<Stack>`, `<Flex>`, `<Grid>`, `<Text>`, `<Heading>`, `<Button>`, `<Card>`, and `<Avatar>`. Check the Once UI documentation to confirm component availability before approving custom implementations.

**Styling & Theming**: All styling must come from Once UI's semantic token system and component props. The `once-ui.config.ts` file defines colors, spacing, typography, and other design tokens. Components should reference these tokens through props (e.g., `<Text variant="body-default-m">`) rather than using hardcoded values. Absolutely **no hardcoded colors, spacing, or font sizes** should appear in the codebase. If you see `#3B82F6` or `16px` in the code, flag it as a critical issue.

**Data-Attribute Theming**: Once UI uses data-attributes for global styling and theme switching. Components should respect these attributes and not override them with inline styles or CSS classes. The dark theme is controlled through data-attributes on the root HTML element, and all components must work seamlessly in this mode.

**Tailwind Usage**: While Tailwind CSS is available in the project, it should be used **sparingly** and only for layout utilities that Once UI doesn't provide. Prefer Once UI's `<Stack>`, `<Flex>`, and `<Grid>` components over Tailwind's flexbox and grid utilities. If you see extensive Tailwind class usage (e.g., `className="flex items-center justify-between p-4 bg-blue-500"`), flag it as an important issue and suggest the Once UI equivalent.

**Critical Issues**:
- Recreating primitives that exist in Once UI (e.g., custom button, card, or modal components)
- Hardcoded colors, spacing, or typography values
- Breaking the global theme system by overriding data-attribute styles
- Using CSS-in-JS or styled-components instead of Once UI patterns

**Example Violation**:
```tsx
// ❌ BAD: Hardcoded styling, custom primitive
<div className="p-4 bg-blue-500 rounded-lg">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// ✅ GOOD: Once UI components with semantic props
<Card padding="4" background="brand">
  <Heading variant="heading-strong-l">Title</Heading>
</Card>
```

---

### 2. Next.js App Router Best Practices (Important Priority)

The portfolio uses Next.js 14+ with the App Router, which introduces new patterns for component types, data fetching, and routing. Proper understanding and application of these patterns is essential for performance and maintainability.

**Server vs Client Components**: Next.js App Router defaults to Server Components, which render on the server and send HTML to the client. Client Components (marked with `'use client'`) should only be used when necessary for interactivity, browser APIs, or React hooks like `useState` and `useEffect`. Review each new component to ensure it's using the correct type. If a component doesn't need client-side interactivity, it should remain a Server Component.

**Data Fetching**: Server Components can fetch data directly using async/await without the need for `useEffect` or client-side state management. Client Components should use React hooks or libraries like SWR for data fetching. Verify that data fetching patterns match the component type and follow Next.js best practices.

**Routing & File Structure**: The App Router uses file-based routing with special files like `page.tsx`, `layout.tsx`, `loading.tsx`, and `error.tsx`. Ensure that new routes follow this structure and that metadata (title, description) is properly configured for SEO. Each page should export metadata or use the `generateMetadata` function.

**Loading & Error States**: User experience is critical in a portfolio. Every route should have proper loading and error handling. Check for `loading.tsx` files for loading states and `error.tsx` files for error boundaries. If a page fetches data, it should show a loading state while data is being retrieved.

**Important Issues**:
- Using Client Components unnecessarily (e.g., a static card that could be a Server Component)
- Missing or incorrect metadata for SEO
- No loading or error states for data-fetching pages
- Inefficient data fetching patterns (e.g., fetching in a loop instead of parallel)

**Example**:
```tsx
// ❌ BAD: Client Component for static content
'use client'
export default function ProjectCard() {
  return <Card>Static content</Card>
}

// ✅ GOOD: Server Component (default)
export default function ProjectCard() {
  return <Card>Static content</Card>
}
```

---

### 3. Content & MDX Structure (Important Priority)

The portfolio's content is managed through MDX files for projects and blog posts. These files must follow a consistent schema to ensure proper rendering and data integrity.

**Frontmatter Schema**: Each MDX file should have frontmatter with required fields. For project pages, this typically includes `title`, `description`, `date`, `tags`, and `image`. For blog posts, it includes `title`, `description`, `date`, `author`, and `tags`. Verify that all required fields are present and correctly formatted.

**Image Optimization**: All images must use the Next.js `<Image>` component from `next/image` to enable automatic optimization, lazy loading, and responsive sizing. Each image should have `width`, `height`, and `alt` attributes. Never use plain `<img>` tags. Images should be stored in the `public` directory or imported from the `src` directory.

**Link Validation**: Check that all internal links use Next.js `<Link>` component and that external links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"` for security. Verify that all links are functional and point to the correct destinations.

**Critical Issues**:
- Missing or incorrect frontmatter schema
- Using `<img>` instead of Next.js `<Image>`
- Broken links or images
- Missing `alt` text on images (accessibility violation)

---

### 4. Accessibility (WCAG 2.1 AA) (Critical Priority)

Accessibility is non-negotiable for a professional portfolio. The site must be fully operable by keyboard, screen readers, and assistive technologies, and it must meet WCAG 2.1 AA standards.

**Keyboard Navigation**: All interactive elements (buttons, links, form inputs) must be fully operable via keyboard. Test the Tab key to ensure focus moves logically through the page. Ensure that custom interactive components have proper `tabIndex` and keyboard event handlers (e.g., Enter key to activate).

**Semantic HTML**: Use appropriate HTML5 semantic elements to provide structure and meaning. Navigation should use `<nav>`, main content should use `<main>`, articles should use `<article>`, and buttons should use `<button>` (not `<div onClick>`). Proper semantic structure helps screen readers understand the page hierarchy.

**Focus Management**: Focus indicators must be visible and styled appropriately. When a user tabs through the page, they should clearly see which element has focus. For modals and overlays, focus should be trapped within the component and returned to the trigger element when closed.

**Color Contrast**: All text must meet WCAG AA color contrast ratios (4.5:1 for normal text, 3:1 for large text). This is especially important in the dark theme. Use tools like the WebAIM Contrast Checker to verify. If custom colors are introduced, validate them against the background.

**ARIA Labels**: When semantic HTML isn't sufficient, use ARIA attributes to provide context. For example, icon-only buttons should have `aria-label`, and complex widgets should have appropriate ARIA roles and states.

**Critical Issues**:
- Keyboard navigation broken or incomplete
- Missing `alt` text on images
- Color contrast failures (text not readable)
- Using `<div onClick>` instead of `<button>`
- Focus traps or lost focus

**Example**:
```tsx
// ❌ BAD: Div as button, no keyboard support, no ARIA
<div onClick={handleClick}>
  <Icon name="close" />
</div>

// ✅ GOOD: Semantic button with ARIA label
<button onClick={handleClick} aria-label="Close dialog">
  <Icon name="close" />
</button>
```

---

### 5. Design Consistency & Responsiveness (Important Priority)

The portfolio has a carefully crafted visual identity that must be maintained across all pages and components. Consistency in design reinforces professionalism and brand recognition.

**Theme Adherence**: All new components must respect the established dark theme and brand colors (cyan and violet). These colors are defined in `once-ui.config.ts` and should be referenced through Once UI's semantic tokens, not hardcoded. If a PR introduces new colors, question whether they're necessary and whether they fit the brand.

**Typography**: Typography should follow the global theme's font family, sizes, and weights. Once UI provides a comprehensive typography system through the `<Text>` and `<Heading>` components with predefined variants. Use these variants rather than custom font styling.

**Spacing**: Spacing should be consistent and follow the design system's spacing scale. Once UI provides spacing tokens (e.g., `gap="4"`, `padding="8"`) that map to a consistent scale. Avoid arbitrary spacing values.

**Responsive Behavior**: The portfolio must work flawlessly on all screen sizes (mobile, tablet, desktop). Once UI components are responsive by default, but custom layouts should be tested. Use Once UI's responsive props or CSS media queries to adjust layouts for different breakpoints.

**Important Issues**:
- Introducing colors that don't match the brand (cyan/violet)
- Inconsistent typography or spacing
- Layouts that break on mobile or tablet
- Not respecting the dark theme (e.g., assuming light background)

---

### 6. Build & Performance (Critical Priority)

The portfolio must build successfully and perform well. Build failures or TypeScript errors are blocking issues that must be resolved before merge.

**Build Success**: Run `npm run build` to verify that the project builds without errors. The build process compiles TypeScript, bundles assets, and generates static pages. Any build failure is a critical issue that blocks the PR.

**TypeScript**: The codebase must be type-safe with zero TypeScript errors. Run `npm run type-check` or rely on the build process to catch type errors. Common issues include missing type annotations, incorrect prop types, or using `any` excessively.

**Bundle Size**: Monitor the bundle size impact of new dependencies. Adding large libraries (e.g., a heavy charting library) can significantly increase load times. Question whether new dependencies are necessary and whether lighter alternatives exist.

**Performance**: While not always measurable in code review, be aware of performance anti-patterns like unnecessary re-renders, large images without optimization, or blocking the main thread with heavy computations.

**Critical Issues**:
- Build fails
- TypeScript errors
- Introducing a large dependency without justification

---

## Output Format

When reviewing a PR, structure your feedback using the following format to ensure clarity and actionability.

### ✅ Strengths
Acknowledge what was done well, especially regarding Once UI patterns, clean architecture, and accessibility. Be specific and reference files. For example: "Excellent use of Once UI's `<Stack>` component for layout in `src/components/ProjectCard.tsx`, maintaining theme consistency."

### 🔍 Issues

#### 🚨 Critical (Must Fix Before Merge)
List blocking issues such as build failures, accessibility violations, or direct violations of Once UI's core principles (e.g., hardcoded theme values). Each issue should include:
- **File & Line**: `src/components/Button.tsx:L42`
- **Issue**: "Hardcoded color `#3B82F6` instead of using theme token"
- **Impact**: "Breaks the global theme system and dark mode consistency"
- **Suggestion**: "Replace with Once UI's `<Button color='brand'>` or reference the theme token"

#### ⚠️ Important (Should Fix)
List significant issues such as architectural problems, poor component design, or missing loading/error states. Use the same format as Critical issues.

#### 💡 Minor (Nice to Have)
List code style suggestions, minor refactoring opportunities, or documentation improvements.

### 💬 Recommendations
Suggest high-level improvements for architecture, process, or future development. For example: "Consider extracting the project card logic into a reusable hook for better testability."

### ✅ Assessment

**Ready to merge?**: [Yes / No / With fixes]

**Reasoning**: Provide a 1-2 sentence technical summary of the PR's quality and the reasoning for your verdict. For example: "The implementation is solid with good Once UI compliance and accessibility. However, the hardcoded color values in the hero section must be fixed before merge."

---

## Critical Rules for This Project

The following rules are **non-negotiable** and must be enforced in every PR review:

1. **Once UI First**: Prioritize Once UI component-first principles above all else. If a component exists in Once UI, use it. Do not recreate primitives.

2. **No Hardcoded Styles**: Zero tolerance for hardcoded colors, fonts, or spacing. All styling must come from the Once UI theme config.

3. **Dark Mode Verification**: Every PR must be tested in dark mode (the primary theme). Visual regressions in dark mode are critical issues.

4. **Keyboard Navigation**: Test keyboard navigation for any new interactive element. If it's not keyboard accessible, it's a critical issue.

5. **Build Must Pass**: Do not approve PRs with build failures or TypeScript errors. These are blocking issues.

6. **Accessibility is Critical**: WCAG violations (missing alt text, poor contrast, broken keyboard nav) are critical issues, not minor suggestions.

7. **Be Specific**: Instead of "Improve styling," say "Replace Tailwind class `p-4` with Once UI's `<Stack gap='4'>` component for theme consistency."

8. **Acknowledge Strengths**: Always start with what was done well. Positive reinforcement encourages good practices.

---

## Example Review

### ✅ Strengths
- Excellent use of Once UI's `<Card>` and `<Stack>` components in `src/components/ProjectCard.tsx`, maintaining consistent spacing and theme adherence.
- Proper implementation of Server Component for static content, avoiding unnecessary client-side JavaScript.
- Good accessibility with semantic HTML (`<article>`, `<h2>`) and descriptive alt text on images.

### 🔍 Issues

#### 🚨 Critical (Must Fix Before Merge)
1. **Hardcoded color in hero section**
   - File: `src/app/page.tsx:L42`
   - Issue: Using hardcoded color `#3B82F6` for the call-to-action button
   - Impact: Breaks the global theme system and won't adapt to theme changes
   - Suggestion: Replace with `<Button color='brand'>` to use the theme's cyan brand color

2. **Missing alt text on project image**
   - File: `src/components/ProjectCard.tsx:L18`
   - Issue: `<Image>` component has empty `alt=""` attribute
   - Impact: Inaccessible to screen reader users (WCAG violation)
   - Suggestion: Add descriptive alt text: `alt="Screenshot of Genie Code Generation Platform interface"`

#### ⚠️ Important (Should Fix)
1. **Missing loading state**
   - File: `src/app/projects/page.tsx`
   - Issue: No `loading.tsx` file for the projects page
   - Impact: Users see a blank screen while projects load, poor UX
   - Suggestion: Add `src/app/projects/loading.tsx` with a skeleton loader using Once UI's `<Skeleton>` component

#### 💡 Minor (Nice to Have)
1. **Could extract project card logic**
   - File: `src/components/ProjectCard.tsx`
   - Issue: Component has inline data transformation logic
   - Suggestion: Extract to a `useProjectData` hook for better testability and reusability

### 💬 Recommendations
Consider creating a shared `<ProjectGrid>` component that encapsulates the layout logic for displaying multiple project cards. This would improve consistency across the projects page and the homepage.

### ✅ Assessment

**Ready to merge?**: With fixes

**Reasoning**: The implementation demonstrates good Once UI compliance and clean architecture. However, the hardcoded color and missing alt text are critical accessibility and theme consistency issues that must be resolved before merge.

---

## Quick Reference: Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Hardcoded color `#3B82F6` | Use `<Component color='brand'>` or theme token |
| Custom button component | Use Once UI's `<Button>` component |
| `<div onClick>` for button | Use semantic `<button>` element |
| Missing alt text | Add descriptive `alt` attribute to all images |
| Using `<img>` tag | Replace with Next.js `<Image>` component |
| Excessive Tailwind classes | Replace with Once UI components (`<Stack>`, `<Flex>`) |
| Client Component for static content | Remove `'use client'` directive |
| Missing loading state | Add `loading.tsx` file to route |
| No error handling | Add `error.tsx` file to route |
| TypeScript `any` type | Add proper type annotations |

---

## Conclusion

This guide ensures that all PRs maintain the high quality standards required for a production portfolio. By strictly enforcing Once UI compliance, accessibility, and Next.js best practices, we create a maintainable, professional, and inclusive web experience that represents the portfolio owner's expertise in LLM and ML engineering.

**Remember**: Every PR is an opportunity to reinforce good practices and maintain the integrity of the design system. Be thorough, be specific, and always explain *why* something matters.
