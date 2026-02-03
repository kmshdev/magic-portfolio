# Once UI 1.5 Enhancements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enhance KMSH portfolio with Once UI 1.5 components to create modern, interactive, tech-forward user experience with separate PRs for each phase.

**Architecture:** Three-phase approach implementing new Once UI 1.5 components (MatrixFx, TypeFx, HoverCard, Timeline, ShineFx, Animation) with progressive enhancement strategy. Each phase is independently testable and deployable.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript 5.9.3, Once UI 1.5.14, Biome 2.3.13

---

## Phase 1: Visual Foundation (PR #6)
**Branch:** `feat/once-ui-phase-1-visual-foundation`
**Goal:** Add background effects and animated text for immediate visual impact
**Estimated Time:** 1-2 hours
**Components:** MatrixFx, TypeFx, ShineFx

### Task 1.1: Add MatrixFx Background to Hero Section

**Files:**
- Modify: `src/app/page.tsx:29-102`

**Step 1: Import MatrixFx component**

```typescript
import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  MatrixFx, // Add this
} from "@once-ui-system/core";
```

**Step 2: Add MatrixFx to hero section**

Add after line 45 (inside first Column):

```typescript
<Column fillWidth horizontal="center" gap="m">
  {/* Add MatrixFx background */}
  <MatrixFx
    density="medium"
    color="brand"
    opacity={0.3}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "600px",
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
  
  <Column maxWidth="s" horizontal="center" align="center" style={{ position: "relative", zIndex: 1 }}>
    {/* Existing content */}
  </Column>
</Column>
```

**Step 3: Test visual rendering**

Run: `npm run dev`
Navigate to: `http://localhost:3000`
Expected: Cyan dot pattern background visible behind hero text

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(hero): add MatrixFx background effect"
```

### Task 1.2: Add TypeFx to Headline

**Files:**
- Modify: `src/app/page.tsx:68-72`
- Modify: `src/resources/content.tsx` (if headline needs adjustment)

**Step 1: Import TypeFx**

```typescript
import {
  // ... existing imports
  TypeFx, // Add this
} from "@once-ui-system/core";
```

**Step 2: Replace static headline with TypeFx**

Replace lines 68-72:

```typescript
<RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
  <TypeFx
    text={home.headline}
    speed={80}
    cursor={true}
    cursorChar="|"
    loop={false}
  >
    <Heading wrap="balance" variant="display-strong-l" />
  </TypeFx>
</RevealFx>
```

**Step 3: Test typewriter effect**

Run: `npm run dev`
Navigate to: `http://localhost:3000`
Expected: Headline types out character by character with cursor

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(hero): add TypeFx animation to headline"
```

### Task 1.3: Add ShineFx to Primary CTA

**Files:**
- Modify: `src/app/page.tsx:78-100`

**Step 1: Import ShineFx**

```typescript
import {
  // ... existing imports
  ShineFx, // Add this
} from "@once-ui-system/core";
```

**Step 2: Wrap Button with ShineFx**

Replace lines 78-100:

```typescript
<RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
  <ShineFx
    color="brand"
    intensity="medium"
    speed="slow"
  >
    <Button
      id="about"
      data-border="rounded"
      href={about.path}
      variant="secondary"
      size="m"
      weight="default"
      arrowIcon
    >
      <Row gap="8" vertical="center" paddingRight="4">
        {about.avatar.display && (
          <Avatar
            marginRight="8"
            style={{ marginLeft: "-0.75rem" }}
            src={person.avatar}
            size="m"
          />
        )}
        {about.title}
      </Row>
    </Button>
  </ShineFx>
</RevealFx>
```

**Step 3: Test shine effect**

Run: `npm run dev`
Navigate to: `http://localhost:3000`
Expected: Subtle shine animation on CTA button

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(hero): add ShineFx to primary CTA"
```

### Task 1.4: Build and Test Phase 1

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 2: Test Lighthouse performance**

Run: `npm run build && npm start`
Open Chrome DevTools → Lighthouse
Expected: Performance score >90

**Step 3: Test on mobile**

Use Chrome DevTools device emulation
Expected: All effects render correctly, no layout shift

**Step 4: Commit and push**

```bash
git add -A
git commit -m "test: verify Phase 1 enhancements"
git push origin feat/once-ui-phase-1-visual-foundation
```

### Task 1.5: Create PR for Phase 1

**Step 1: Create pull request**

```bash
gh pr create \
  --title "feat: Phase 1 - Visual Foundation (MatrixFx, TypeFx, ShineFx)" \
  --body "## Phase 1: Visual Foundation

### Changes
- ✅ MatrixFx background effect in hero section
- ✅ TypeFx typewriter animation for headline
- ✅ ShineFx emphasis on primary CTA

### Testing
- ✅ Build successful
- ✅ Lighthouse performance >90
- ✅ Mobile responsive
- ✅ No layout shift

### Visual Impact
- Tech-forward aesthetic with cyan dot pattern
- Engaging typewriter effect captures attention
- Subtle shine draws eye to CTA

### Next Phase
Phase 2 will add interactive HoverCard and Timeline components.

**Preview:** [Add screenshot]"
```

**Step 2: Add screenshot**

Take screenshot of homepage with effects
Upload to PR description

**Step 3: Request review**

Expected: PR ready for review and merge

---

## Phase 2: Interactive Components (PR #7)
**Branch:** `feat/once-ui-phase-2-interactive`
**Goal:** Add interactive hover effects and timeline for work experience
**Estimated Time:** 2-3 hours
**Components:** HoverCard, Hover, Timeline, Animation

### Task 2.1: Create HoverCard for Project Previews

**Files:**
- Create: `src/components/ProjectHoverCard.tsx`
- Modify: `src/components/ProjectCard.tsx`

**Step 1: Create ProjectHoverCard component**

Create `src/components/ProjectHoverCard.tsx`:

```typescript
"use client";

import {
  Column,
  Heading,
  Text,
  Badge,
  Row,
  Flex,
} from "@once-ui-system/core";

interface ProjectHoverCardProps {
  title: string;
  description: string;
  tags: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const ProjectHoverCard: React.FC<ProjectHoverCardProps> = ({
  title,
  description,
  tags,
  metrics,
}) => {
  return (
    <Column
      gap="m"
      padding="l"
      background="surface"
      border="neutral-medium"
      radius="l"
      maxWidth="20"
    >
      <Heading variant="heading-strong-m">{title}</Heading>
      <Text variant="body-default-s" onBackground="neutral-weak">
        {description}
      </Text>
      
      {tags && tags.length > 0 && (
        <Flex gap="8" wrap>
          {tags.map((tag) => (
            <Badge
              key={tag}
              size="s"
              variant="neutral"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      )}
      
      {metrics && metrics.length > 0 && (
        <Column gap="8" paddingTop="s">
          {metrics.map((metric) => (
            <Row key={metric.label} gap="8" vertical="center">
              <Text variant="label-default-s" onBackground="neutral-weak">
                {metric.label}:
              </Text>
              <Text variant="label-default-s" onBackground="brand-strong">
                {metric.value}
              </Text>
            </Row>
          ))}
        </Column>
      )}
    </Column>
  );
};
```

**Step 2: Test component renders**

Run: `npm run dev`
Expected: Component compiles without errors

**Step 3: Commit**

```bash
git add src/components/ProjectHoverCard.tsx
git commit -m "feat(components): add ProjectHoverCard component"
```

### Task 2.2: Integrate HoverCard into ProjectCard

**Files:**
- Modify: `src/components/ProjectCard.tsx`

**Step 1: Import HoverCard and ProjectHoverCard**

```typescript
import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  HoverCard, // Add this
} from "@once-ui-system/core";
import { ProjectHoverCard } from "./ProjectHoverCard"; // Add this
```

**Step 2: Add props for hover card data**

Update interface:

```typescript
interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  // Add these
  tags?: string[];
  metrics?: { label: string; value: string }[];
}
```

**Step 3: Wrap Carousel with HoverCard**

Replace Carousel section (lines 35-41):

```typescript
<HoverCard
  trigger={
    <Carousel
      sizes="(max-width: 960px) 100vw, 960px"
      items={images.map((image) => ({
        slide: image,
        alt: title,
      }))}
    />
  }
  content={
    <ProjectHoverCard
      title={title}
      description={description}
      tags={tags || []}
      metrics={metrics}
    />
  }
  side="right"
  align="start"
/>
```

**Step 4: Test hover interaction**

Run: `npm run dev`
Navigate to homepage
Hover over project image
Expected: HoverCard appears with project details

**Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat(project-card): integrate HoverCard for previews"
```

### Task 2.3: Update content.tsx with Project Metadata

**Files:**
- Modify: `src/resources/content.tsx`

**Step 1: Add tags and metrics to projects**

Update each project in work section:

```typescript
{
  slug: "genie-cli",
  // ... existing fields
  tags: ["Python", "CLI", "Autonomous Agents", "Olas"],
  metrics: [
    { label: "Stars", value: "150+" },
    { label: "Downloads", value: "5K+" },
  ],
},
```

**Step 2: Test data flows to components**

Run: `npm run dev`
Expected: HoverCard shows tags and metrics

**Step 3: Commit**

```bash
git add src/resources/content.tsx
git commit -m "feat(content): add project tags and metrics"
```

### Task 2.4: Create Timeline for Work Experience

**Files:**
- Create: `src/components/about/WorkTimeline.tsx`
- Modify: `src/app/about/page.tsx`

**Step 1: Create WorkTimeline component**

Create `src/components/about/WorkTimeline.tsx`:

```typescript
"use client";

import { Timeline } from "@once-ui-system/core";

interface WorkTimelineProps {
  experiences: {
    company: string;
    role: string;
    period: string;
    description: string;
    achievements?: string[];
  }[];
}

export const WorkTimeline: React.FC<WorkTimelineProps> = ({ experiences }) => {
  const timelineItems = experiences.map((exp) => ({
    title: exp.role,
    subtitle: `${exp.company} • ${exp.period}`,
    description: exp.description,
    items: exp.achievements,
  }));

  return (
    <Timeline
      items={timelineItems}
      variant="vertical"
      showDates={true}
    />
  );
};
```

**Step 2: Add work experience data to content.tsx**

Add to `src/resources/content.tsx`:

```typescript
export const workExperience = [
  {
    company: "Vimele/Zurich",
    role: "Lead LLM Engineer",
    period: "Apr 2024 - Aug 2025",
    description: "Leading LLM engineering initiatives for insurance and healthcare applications",
    achievements: [
      "Architected RAG-based chatbot system",
      "Improved response accuracy by 40%",
      "Led team of 3 engineers",
    ],
  },
  {
    company: "Mechatomy Engineering Solutions",
    role: "LLM and MLOps Engineer",
    period: "Feb 2020 - Mar 2024",
    description: "Developed ML solutions across retail, finance, and oil & gas sectors",
    achievements: [
      "20% efficiency improvement in turbomachinery workflows",
      "Deployed 15+ production ML models",
      "Built MLOps infrastructure from scratch",
    ],
  },
];
```

**Step 3: Integrate Timeline into about page**

Modify `src/app/about/page.tsx`:

```typescript
import { WorkTimeline } from "@/components/about/WorkTimeline";
import { workExperience } from "@/resources";

// Add in appropriate section
<WorkTimeline experiences={workExperience} />
```

**Step 4: Test timeline rendering**

Run: `npm run dev`
Navigate to: `http://localhost:3000/about`
Expected: Timeline shows work experience with dates

**Step 5: Commit**

```bash
git add src/components/about/WorkTimeline.tsx src/app/about/page.tsx src/resources/content.tsx
git commit -m "feat(about): add work experience timeline"
```

### Task 2.5: Replace RevealFx with Animation Component

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/blog/Posts.tsx`

**Step 1: Import Animation component**

```typescript
import {
  // ... existing imports
  Animation,
} from "@once-ui-system/core";
```

**Step 2: Wrap ProjectCard with Animation**

In parent component that renders ProjectCard:

```typescript
<Animation
  type="fadeInUp"
  duration={600}
  delay={index * 100}
>
  <ProjectCard {...props} />
</Animation>
```

**Step 3: Test staggered animation**

Run: `npm run dev`
Expected: Cards fade in sequentially

**Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/blog/Posts.tsx
git commit -m "feat(animation): replace RevealFx with Animation component"
```

### Task 2.6: Build and Test Phase 2

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds

**Step 2: Test interactions**

- Hover over project images → HoverCard appears
- Navigate to /about → Timeline displays correctly
- Scroll homepage → Staggered animations work

**Step 3: Test accessibility**

- Keyboard navigation works for HoverCard
- Screen reader announces timeline items
- Focus indicators visible

**Step 4: Commit and push**

```bash
git add -A
git commit -m "test: verify Phase 2 enhancements"
git push origin feat/once-ui-phase-2-interactive
```

### Task 2.7: Create PR for Phase 2

**Step 1: Create pull request**

```bash
gh pr create \
  --title "feat: Phase 2 - Interactive Components (HoverCard, Timeline, Animation)" \
  --body "## Phase 2: Interactive Components

### Changes
- ✅ HoverCard for project previews
- ✅ Timeline for work experience
- ✅ Animation component for staggered reveals
- ✅ Project metadata (tags, metrics)

### Testing
- ✅ Build successful
- ✅ Hover interactions work
- ✅ Keyboard navigation functional
- ✅ Mobile responsive

### UX Impact
- Faster project exploration (no navigation needed)
- Clear career progression visualization
- Smoother, more polished animations

### Next Phase
Phase 3 will add Swiper and advanced Flex features.

**Preview:** [Add screenshots]"
```

**Step 2: Add screenshots**

- HoverCard in action
- Timeline on about page
- Staggered animations

**Step 3: Request review**

Expected: PR ready for review and merge

---

## Phase 3: Advanced Features (PR #8)
**Branch:** `feat/once-ui-phase-3-advanced`
**Goal:** Replace Carousel with Swiper and implement custom Flex breakpoints
**Estimated Time:** 3-4 hours
**Components:** Swiper, Flex enhancements, Card improvements

### Task 3.1: Replace Carousel with Swiper

**Files:**
- Modify: `src/components/ProjectCard.tsx`

**Step 1: Import Swiper**

```typescript
import {
  AvatarGroup,
  Swiper, // Replace Carousel with this
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  HoverCard,
} from "@once-ui-system/core";
```

**Step 2: Replace Carousel with Swiper**

```typescript
<HoverCard
  trigger={
    <Swiper
      items={images.map((image, index) => ({
        src: image,
        alt: `${title} - Image ${index + 1}`,
      }))}
      gestures={true}
      autoplay={false}
      loop={images.length > 1}
      showControls={images.length > 1}
    />
  }
  content={<ProjectHoverCard {...} />}
/>
```

**Step 3: Test swipe gestures**

Run: `npm run dev`
Test on mobile or with touch emulation
Expected: Swipe gestures work, dragging is smooth

**Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat(project-card): replace Carousel with Swiper"
```

### Task 3.2: Implement Custom Flex Breakpoints

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/ProjectCard.tsx`

**Step 1: Add custom breakpoints to Flex**

In `src/app/page.tsx`, update blog section Flex:

```typescript
<Flex
  fillWidth
  gap="24"
  marginTop="40"
  breakpoints={{
    s: { direction: "column", gap: "16" },
    m: { direction: "row", gap: "24" },
    l: { direction: "row", gap: "32" },
  }}
>
  {/* Content */}
</Flex>
```

**Step 2: Add scrollbar customization**

```typescript
<Flex
  fillWidth
  overflow="auto"
  scrollbar={{
    width: "8px",
    trackColor: "neutral-alpha-weak",
    thumbColor: "brand-medium",
  }}
>
  {/* Content */}
</Flex>
```

**Step 3: Test responsive behavior**

Resize browser window
Expected: Layout adapts at custom breakpoints

**Step 4: Commit**

```bash
git add src/app/page.tsx src/components/ProjectCard.tsx
git commit -m "feat(layout): add custom Flex breakpoints and scrollbar styling"
```

### Task 3.3: Update Card Components with New Props

**Files:**
- Modify: `src/components/ProjectCard.tsx`
- Modify: `src/components/blog/Post.tsx`

**Step 1: Add improved border radius**

```typescript
<Column
  fillWidth
  gap="m"
  radius="l" // Updated in Once UI 1.5
  border="neutral-medium"
  background="surface"
>
  {/* Content */}
</Column>
```

**Step 2: Remove hover effect on tap for mobile**

```typescript
<Column
  fillWidth
  gap="m"
  data-hover="false" // Prevents tap hover on mobile
>
  {/* Content */}
</Column>
```

**Step 3: Test on mobile**

Use device emulation
Expected: No hover effect on tap, cleaner borders

**Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/blog/Post.tsx
git commit -m "feat(cards): update with Once UI 1.5 improvements"
```

### Task 3.4: Add Button Rounded Prop

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/Header.tsx`

**Step 1: Update primary CTA**

```typescript
<Button
  id="about"
  rounded={true} // New in Once UI 1.5
  href={about.path}
  variant="secondary"
  size="m"
  weight="default"
  arrowIcon
>
  {/* Content */}
</Button>
```

**Step 2: Test visual appearance**

Run: `npm run dev`
Expected: Button has fully rounded style

**Step 3: Commit**

```bash
git add src/app/page.tsx src/components/Header.tsx
git commit -m "feat(buttons): add rounded prop for fully rounded style"
```

### Task 3.5: Build and Test Phase 3

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds

**Step 2: Test all enhancements**

- Swiper gestures work on mobile
- Custom breakpoints adapt correctly
- Scrollbar styling applied
- Cards have improved borders
- Buttons are fully rounded

**Step 3: Performance testing**

Run Lighthouse
Expected: Performance score >90

**Step 4: Commit and push**

```bash
git add -A
git commit -m "test: verify Phase 3 enhancements"
git push origin feat/once-ui-phase-3-advanced
```

### Task 3.6: Create PR for Phase 3

**Step 1: Create pull request**

```bash
gh pr create \
  --title "feat: Phase 3 - Advanced Features (Swiper, Flex, Card improvements)" \
  --body "## Phase 3: Advanced Features

### Changes
- ✅ Swiper with gesture support
- ✅ Custom Flex breakpoints
- ✅ Scrollbar customization
- ✅ Card border improvements
- ✅ Button rounded prop

### Testing
- ✅ Build successful
- ✅ Swipe gestures work
- ✅ Responsive breakpoints functional
- ✅ Performance >90

### UX Impact
- Better mobile experience with gestures
- Finer responsive control
- Polished visual details
- Modern interaction patterns

### Complete Enhancement Series
This completes the Once UI 1.5 enhancement series:
- Phase 1: Visual Foundation ✅
- Phase 2: Interactive Components ✅
- Phase 3: Advanced Features ✅

**Preview:** [Add screenshots]"
```

**Step 2: Add screenshots**

- Swiper in action
- Custom breakpoints
- Improved card styling

**Step 3: Request review**

Expected: PR ready for review and merge

---

## Success Criteria

### Phase 1
- [ ] MatrixFx renders in hero
- [ ] TypeFx animates headline
- [ ] ShineFx emphasizes CTA
- [ ] Build succeeds
- [ ] Performance >90

### Phase 2
- [ ] HoverCard shows project previews
- [ ] Timeline displays work experience
- [ ] Animation component works
- [ ] Keyboard navigation functional
- [ ] Mobile responsive

### Phase 3
- [ ] Swiper replaces Carousel
- [ ] Custom breakpoints work
- [ ] Scrollbar styled
- [ ] Card improvements applied
- [ ] Performance maintained

## Rollback Plan

Each phase is independent:
- Phase 1 issues → Revert PR #6
- Phase 2 issues → Revert PR #7
- Phase 3 issues → Revert PR #8

## Post-Implementation

After all phases merged:
1. Update README with new features
2. Create blog post about enhancements
3. Share on social media
4. Monitor analytics for engagement improvements

---

**Plan complete. Ready for subagent-driven execution.**
