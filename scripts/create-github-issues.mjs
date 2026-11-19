import { execSync } from 'child_process';

const issues = [
  {
    title: "bug(contact): Contact form crashes on submission with 'contactSchema.safeParse is not a function'",
    labels: ["bug", "ux-ui"],
    category: "Runtime Bugs & Logic Errors",
    body: `### Category
Runtime Bugs & Logic Errors

### Summary
When submitting the Contact form with valid input, the browser crashes with an uncaught runtime TypeError: \`contactSchema.safeParse is not a function\`.

### Affected File
- \`src/pages/Contact.tsx\` (lines 14, 44, 81)

### Root Cause
At line 14, the Zod validation schema is declared at module scope:
\`\`\`typescript
const contactSchema = z.object({ ... });
\`\`\`
However, inside the \`Contact\` component at line 81, a JSON-LD structured data object is declared with the exact same identifier name:
\`\`\`typescript
const contactSchema = {
  "@context": "https://schema.org",
  ...
};
\`\`\`
Due to JavaScript variable shadowing in the component scope, \`handleSubmit\` references the JSON-LD object literal rather than the Zod validation schema. Because plain objects do not have a \`.safeParse()\` method, submitting the form crashes with an uncaught TypeError and prevents form submission.

### Steps to Reproduce
1. Navigate to \`/contact\` in a web browser.
2. Fill out Name, Email, and Message.
3. Click "Send Inquiry".
4. Open Chrome DevTools Console; observe \`Uncaught TypeError: contactSchema.safeParse is not a function\`.

### Recommended Fix
Rename the JSON-LD schema variable inside the component to \`contactJsonLdSchema\` or \`contactStructuredData\`:
\`\`\`typescript
const contactJsonLdSchema = {
  "@context": "https://schema.org",
  ...
};
\`\`\`
And pass \`contactJsonLdSchema\` into the \`<SEO schema={contactJsonLdSchema} />\` prop.`
  },
  {
    title: "fix(lint): ESLint fails CI with empty interface errors in command.tsx and textarea.tsx",
    labels: ["bug", "code-quality"],
    category: "Code Quality & Linting",
    body: `### Category
Code Quality & Linting

### Summary
Running \`npm run lint\` produces 2 errors and 8 warnings, causing CI pipeline checks to exit with code 1.

### Affected Files
- \`src/components/ui/command.tsx\` (line 24:11)
- \`src/components/ui/textarea.tsx\` (line 5:18)

### Root Cause
Empty interfaces declaring no new members trigger ESLint rule \`@typescript-eslint/no-empty-object-type\`:
\`\`\`typescript
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface CommandDialogProps extends DialogProps {}
\`\`\`

### Steps to Reproduce
1. Run \`npm run lint\` in terminal.
2. Observe 2 errors and build check failure.

### Recommended Fix
Convert empty interfaces into TypeScript type aliases:
\`\`\`typescript
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type CommandDialogProps = DialogProps;
\`\`\``
  },
  {
    title: "security(dependencies): Update 23 vulnerable packages identified by npm audit (17 high, 6 moderate)",
    labels: ["security", "bug"],
    category: "Security & Dependencies",
    body: `### Category
Security & Dependencies

### Summary
\`npm audit\` reports 23 active security vulnerabilities (17 high severity, 6 moderate severity) across project dependencies, including open redirect vulnerabilities in \`@remix-run/router\`, prototype pollution in \`lodash\` / \`flatted\`, and Denial-of-Service vulnerabilities in \`glob\`, \`brace-expansion\`, and \`minimatch\`.

### Affected Packages
- \`@remix-run/router\` <= 1.23.2 (GHSA-2w69-qvjg-hvjx, GHSA-2j2x-hqr9-3h42)
- \`zod\` < 4.6.6 (GHSA-mrhx-c7xc-m3w5)
- \`postcss\` <= 8.5.22 (GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q)
- \`glob\` 9.0.0 - 14.0.1 (GHSA-5j98-mcp5-4vw2)
- \`esbuild\` <= 0.24.2 (GHSA-67mh-4wv8-2f99)
- \`lodash\` <= 4.17.23 (GHSA-r5fr-rjxr-66jc)

### Steps to Reproduce
1. Run \`npm audit\` in terminal.
2. Review 23 vulnerability advisories.

### Recommended Fix
Run:
\`\`\`bash
npm audit fix
\`\`\`
Verify that all updated dependencies maintain backwards compatibility with existing Vite and React 18 builds.`
  },
  {
    title: "perf(assets): High-resolution hero images exceed 24MB total payload and degrade LCP",
    labels: ["performance", "bug"],
    category: "Performance & Asset Optimization",
    body: `### Category
Performance & Asset Optimization

### Summary
The project bundles several raw, uncompressed photography assets exceeding 6MB to 7.5MB each. When building for production, the total image payload exceeds 30MB, which severely degrades Largest Contentful Paint (LCP), first load speed, and mobile bandwidth usage.

### Affected Files
- \`src/assets/projects/northlight-hero.jpg\` (7.48 MB)
- \`src/assets/projects/stillwater-hero.jpg\` (6.68 MB)
- \`src/assets/projects/meridian-hero.jpg\` (6.24 MB)
- \`src/assets/projects/ember-hero.jpg\` (2.19 MB)
- \`src/assets/portrait-main.jpg\` (2.06 MB)
- \`src/assets/projects/bharat-land-hero.jpg\` (1.61 MB)

### Steps to Reproduce
1. Run \`npm run build\`.
2. Inspect the output assets in \`dist/assets/\`.
3. Observe several images between 1.6MB and 7.48MB in production bundle.

### Recommended Fix
1. Compress and optimize images to modern formats (WebP/AVIF or compressed JPG at 80% quality).
2. Resize hero images to suitable dimensions (e.g. 1920x1080 max width).
3. Ensure no individual hero image exceeds 200-300KB.`
  },
  {
    title: "perf(favicon): Replace 1.63MB uncompressed favicon.ico with lightweight asset",
    labels: ["performance", "good first issue"],
    category: "Performance & Asset Optimization",
    body: `### Category
Performance & Asset Optimization

### Summary
\`public/favicon.ico\` has an excessive file size of 1.63 MB (1,635,518 bytes). Because web browsers request \`/favicon.ico\` on almost every initial site visit and tab open, a 1.6MB favicon creates significant latency and unnecessary bandwidth overhead.

### Affected File
- \`public/favicon.ico\`

### Steps to Reproduce
1. Inspect \`public/favicon.ico\` file size in file explorer or terminal.
2. Notice size is 1.63MB.

### Recommended Fix
Generate an optimized multi-resolution \`.ico\` (16x16, 32x32, 48x48) under 30KB, and provide a lightweight SVG favicon (\`favicon.svg\`) with modern browser support in \`index.html\`.`
  },
  {
    title: "refactor: Remove dead code (NavLink.tsx) and prune 43 unused boilerplate UI components",
    labels: ["enhancement", "code-quality"],
    category: "Code Quality & Maintenance",
    body: `### Category
Code Quality & Maintenance

### Summary
The repository contains unused dead code files and 43 unreferenced shadcn/ui components in \`src/components/ui/\`, which trigger Fast Refresh lint warnings, increase TypeScript compilation time, and pollute the project structure.

### Affected Files
- \`src/components/NavLink.tsx\` (unreferenced dead component)
- \`src/components/ui/\` (43 unused components: \`alert-dialog.tsx\`, \`alert.tsx\`, \`avatar.tsx\`, \`breadcrumb.tsx\`, \`calendar.tsx\`, \`carousel.tsx\`, \`chart.tsx\`, \`checkbox.tsx\`, \`command.tsx\`, \`context-menu.tsx\`, \`drawer.tsx\`, \`dropdown-menu.tsx\`, \`form.tsx\`, \`menubar.tsx\`, \`navigation-menu.tsx\`, \`pagination.tsx\`, \`sidebar.tsx\`, \`table.tsx\`, \`textarea.tsx\`, etc.)

### Steps to Reproduce
1. Search codebase for imports of \`NavLink\`.
2. Observe 0 occurrences outside its own file.
3. Compare \`src/components/ui/*.tsx\` against imports in \`src/pages\` and \`src/components/shared\`.

### Recommended Fix
1. Remove \`src/components/NavLink.tsx\`.
2. Prune unused UI component files, keeping only those utilized by the application (\`button.tsx\`, \`tooltip.tsx\`, \`accordion.tsx\`, \`toaster.tsx\`, \`toast.tsx\`, \`sonner.tsx\`).`
  },
  {
    title: "refactor(toast): Consolidate duplicate toast providers (Toaster vs Sonner) mounted in App.tsx",
    labels: ["enhancement", "code-quality"],
    category: "Code Quality & Architecture",
    body: `### Category
Code Quality & Architecture

### Summary
In \`src/App.tsx\`, both the Radix UI \`<Toaster />\` (from \`@/components/ui/toaster\`) and Sonner \`<Sonner />\` (from \`@/components/ui/sonner\`) are mounted simultaneously at the root level.

### Affected File
- \`src/App.tsx\` (lines 1, 2, 20, 21)

### Details
Mounting two distinct toast managers creates confusion over which notification API to use (\`useToast\` hook vs \`toast()\` from sonner), duplicates DOM overlay portals, and causes styling discrepancies.

### Recommended Fix
Standardize on either \`sonner\` or Radix \`use-toast\`, and remove the redundant provider and component from \`App.tsx\`.`
  },
  {
    title: "bug(contact): Contact form uses client simulation and drops submitted messages without backend/webhook dispatch",
    labels: ["bug", "enhancement"],
    category: "Bug / Functional",
    body: `### Category
Bug / Functional

### Summary
The Contact page form simulates submission via \`await new Promise(resolve => setTimeout(resolve, 1500))\` and clears form state without dispatching the message to an API route, email service, or webhook.

### Affected File
- \`src/pages/Contact.tsx\` (lines 55-70)

### Impact
Real clients and potential leads submitting inquiries through the form receive a "Message sent" confirmation, but their messages are dropped silently in memory.

### Recommended Fix
Integrate an endpoint or form service (e.g. Formspree, Resend API, Supabase Edge Function, or mailto fallback) so user messages are securely delivered to \`admin@ladestack.in\`.`
  },
  {
    title: "feat(estimator): Pass calculated investment estimate and selections into Contact form fields",
    labels: ["enhancement", "ux-ui", "good first issue"],
    category: "UX / Feature Integration",
    body: `### Category
UX / Feature Integration

### Summary
On \`/contact\`, users configure project type, business stage, timeline, and scope in the \`InvestmentEstimator\` component. When clicking "Start Your Project", the page scrolls down to \`#contact-form\`, but the chosen project type and calculated budget range are not populated into the contact form inputs.

### Affected Files
- \`src/components/shared/InvestmentEstimator.tsx\` (lines 125-130, 270-276)
- \`src/pages/Contact.tsx\` (lines 27-35, 180-205)

### Steps to Reproduce
1. Navigate to \`/contact\`.
2. Select all 4 options in the Investment Estimator to calculate a range (e.g. Frontend Web Application -> $8,000 - $20,000).
3. Click "Start Your Project".
4. Observe the Project Type and Budget Range select dropdowns in the form are still empty ("Select a project type", "Select a budget range").

### Recommended Fix
Add an \`onSelectEstimate?: (estimate: { projectType: string; budget: string }) => void\` prop to \`InvestmentEstimator\` or share state with \`Contact.tsx\` so the contact form fields automatically pre-populate upon clicking "Start Your Project".`
  },
  {
    title: "feat(projects): Add live demo URLs and GitHub repository links to project case studies in projects.ts",
    labels: ["enhancement", "documentation", "good first issue"],
    category: "Documentation & UX",
    body: `### Category
Documentation & UX

### Summary
In \`src/data/projects.ts\` and \`src/pages/ProjectDetail.tsx\`, showcase projects (such as LadeStack, GB Coder, LS PDF, MD2PDF, Swift Resume, GameHub) lack live external URL links and GitHub repository links.

### Affected Files
- \`src/data/projects.ts\`
- \`src/pages/ProjectDetail.tsx\`

### User Experience
Visitors reading case studies for developer tools have no direct way to test the live applications or review the open-source code on GitHub.

### Recommended Fix
1. Add \`liveUrl?: string\` and \`githubUrl?: string\` fields to the project data model in \`src/data/projects.ts\`.
2. Render "Live Demo" and "GitHub Repository" action buttons on \`ProjectDetail.tsx\` hero / metadata sections.`
  },
  {
    title: "feat(work): Implement category filter tabs on Work page as documented in README",
    labels: ["enhancement", "ux-ui", "good first issue"],
    category: "Feature / UX",
    body: `### Category
Feature / UX

### Summary
The project \`README.md\` claims:
> "Curated Work Showcase: Filterable portfolio grid with detailed project case study templates"

However, \`src/pages/Work.tsx\` simply maps over all projects without any category filter buttons or tabs.

### Affected Files
- \`README.md\` (line 12)
- \`src/pages/Work.tsx\` (lines 76-98)

### Recommended Fix
Add filter tabs (e.g. "All", "Developer Ecosystem", "Browser IDE", "Privacy Toolkit", "Publishing Engine", "Interactive Web") with active state styling and filter the rendered \`projects\` array accordingly.`
  },
  {
    title: "a11y(header): Add aria-expanded, aria-controls, Escape key dismissal, and focus trap to mobile navigation",
    labels: ["accessibility", "bug"],
    category: "Accessibility (WCAG 4.1.2 & 2.1.1)",
    body: `### Category
Accessibility (WCAG 4.1.2 Name, Role, Value & 2.1.1 Keyboard)

### Summary
The mobile navigation drawer in \`src/components/layout/Header.tsx\` lacks essential accessibility features:
1. The hamburger menu button has no \`aria-expanded\` attribute.
2. Missing \`aria-controls\` referencing the dialog container id.
3. The dialog does not listen for \`Escape\` key presses to dismiss the menu.
4. Focus is not trapped inside the overlay when open, allowing keyboard users to tab into background elements.

### Affected File
- \`src/components/layout/Header.tsx\` (lines 79-85, 90-103)

### Steps to Reproduce
1. Resize browser viewport to 375px width.
2. Inspect hamburger button: note missing \`aria-expanded\`.
3. Open menu and press \`Escape\`: menu does not close.

### Recommended Fix
1. Add \`aria-expanded={isMobileMenuOpen}\` and \`aria-controls="mobile-navigation-dialog"\` to the trigger button.
2. Add a \`keydown\` event listener in a \`useEffect\` to close the menu on \`Escape\`.
3. Manage focus on open/close to meet WCAG 2.1 keyboard guidelines.`
  },
  {
    title: "a11y(headings): Fix heading level skip violations across About page and Footer landmarks (WCAG 1.3.1)",
    labels: ["accessibility", "bug", "good first issue"],
    category: "Accessibility (WCAG 1.3.1)",
    body: `### Category
Accessibility (WCAG 1.3.1 Info and Relationships)

### Summary
Automated DOM inspection detected heading level hierarchy skips:
1. In \`src/components/layout/Footer.tsx\`, navigation sections use \`<h4>Navigation</h4>\` and \`<h4>Connect</h4>\` directly after pages ending in \`<h2>\`, skipping \`<h3>\`.
2. In \`src/pages/About.tsx\`, the Approach section skips from \`<h1>\` directly to \`<h3>\` (\`{value.title}\`), and Milestones skips from \`<h2>\` to \`<h4>\`.

### Affected Files
- \`src/components/layout/Footer.tsx\` (lines 38, 55)
- \`src/pages/About.tsx\` (lines 156, 181)

### Recommended Fix
Use sequential heading levels (\`h1\` -> \`h2\` -> \`h3\`) or replace non-section title headings in the footer with \`<p className="eyebrow font-medium ...">\`.`
  },
  {
    title: "a11y(gallery): Add keyboard navigation and visible focus rings to HorizontalScrollGallery items",
    labels: ["accessibility", "ux-ui"],
    category: "Accessibility & UX",
    body: `### Category
Accessibility & UX

### Summary
In \`src/components/shared/HorizontalScrollGallery.tsx\`, the horizontal gallery translates strictly based on page scroll offsets. For keyboard-only users who navigate via Tab or arrow keys, items do not scroll into view automatically when focused, and lack distinctive visible focus outline rings.

### Affected File
- \`src/components/shared/HorizontalScrollGallery.tsx\`

### Recommended Fix
1. Add \`focus-visible:ring-2 focus-visible:ring-ink\` styling to gallery links.
2. Add an \`onFocus\` handler on gallery items that adjusts track translation so focused items scroll into the visible viewport.`
  },
  {
    title: "a11y(estimator): Add proper ARIA radiogroup roles and keyboard arrow navigation to SelectionButton",
    labels: ["accessibility", "enhancement"],
    category: "Accessibility",
    body: `### Category
Accessibility (WCAG 4.1.2 & WAI-ARIA Radio Group Pattern)

### Summary
In \`src/components/shared/InvestmentEstimator.tsx\`, each selection category represents a single-select choice. While \`@radix-ui/react-radio-group\` is partially used, keyboard arrow key navigation (Up/Down/Left/Right) and roving tabindex should be verified to adhere strictly to the WAI-ARIA Radio Group pattern.

### Affected File
- \`src/components/shared/InvestmentEstimator.tsx\`

### Recommended Fix
Ensure each question group wraps in \`<RadioGroupPrimitive.Root>\` with an \`aria-labelledby\` referencing the question title, and each button is a \`<RadioGroupPrimitive.Item>\` with proper roving focus.`
  },
  {
    title: "a11y(motion): Support prefers-reduced-motion and ensure print visibility in ScrollReveal",
    labels: ["accessibility", "bug"],
    category: "Accessibility & Usability",
    body: `### Category
Accessibility & Usability

### Summary
In \`src/components/shared/ScrollReveal.tsx\`, components initialize with \`opacity-0 translate-y-8\`. If the user enables \`prefers-reduced-motion: reduce\`, animations should be suppressed and elements should display immediately. Furthermore, during printing (\`@media print\`), un-revealed elements risk remaining completely invisible.

### Affected File
- \`src/components/shared/ScrollReveal.tsx\`

### Recommended Fix
Add CSS / Tailwind rules to override opacity and transform under \`@media print\` and \`motion-reduce:opacity-100 motion-reduce:translate-y-0\`.`
  },
  {
    title: "fix(estimator): Cancel requestAnimationFrame on unmount and resolve missing dependency in AnimatedNumber",
    labels: ["bug", "code-quality"],
    category: "Bug / Code Quality",
    body: `### Category
Bug / Code Quality

### Summary
In \`src/components/shared/InvestmentEstimator.tsx\`, the \`AnimatedNumber\` component sets up an animation loop using \`requestAnimationFrame\`, but never cancels the animation handle when the component unmounts or when \`value\` updates rapidly. In addition, ESLint flags a missing dependency in \`useEffect\`: \`React Hook useEffect has a missing dependency: 'displayValue'\`.

### Affected File
- \`src/components/shared/InvestmentEstimator.tsx\` (lines 63-91)

### Impact
Rapidly switching selections can spawn overlapping \`requestAnimationFrame\` animation loops, leading to memory leaks and flickering numbers.

### Recommended Fix
Store the \`requestAnimationFrame\` ID and return a cleanup function from \`useEffect\`:
\`\`\`typescript
useEffect(() => {
  let animId: number;
  ...
  return () => cancelAnimationFrame(animId);
}, [value]);
\`\`\``
  },
  {
    title: "fix(project-detail): Remove duplicate image rendering and add fallback handling for missing project images",
    labels: ["bug", "ux-ui"],
    category: "Bug / UX",
    body: `### Category
Bug / UX

### Summary
In \`src/pages/ProjectDetail.tsx\`, \`images[0]\` is rendered 3 separate times on the same page (Hero section, first full-width showcase, and second full-width showcase). Additionally, accessing \`images[1]\` and \`images[2]\` assumes every project array has at least 3 entries; if fewer exist, \`src="undefined"\` can be rendered.

### Affected File
- \`src/pages/ProjectDetail.tsx\` (lines 40, 95, 177, 191, 203, 216)

### Recommended Fix
1. Ensure distinct images are used across the showcase sections (or adapt the layout based on \`images.length\`).
2. Add fallback image references so \`undefined\` is never passed to an \`<img>\` tag.`
  },
  {
    title: "fix(layout): Prevent horizontal layout overflow from HorizontalScrollGallery on viewports with scrollbars",
    labels: ["bug", "ux-ui"],
    category: "Bug / Layout",
    body: `### Category
Bug / Layout

### Summary
In \`src/components/shared/HorizontalScrollGallery.tsx\`, the section container uses:
\`\`\`tsx
className="relative w-screen -ml-[calc((100vw-100%)/2)]"
\`\`\`
On desktop browsers where the vertical scrollbar takes up 15-17px (standard on Windows Chrome/Edge/Firefox), \`100vw\` exceeds \`100%\` width, inducing an unintended horizontal scrollbar on the page.

### Affected File
- \`src/components/shared/HorizontalScrollGallery.tsx\` (line 146)

### Recommended Fix
Replace \`w-screen -ml-[calc((100vw-100%)/2)]\` with \`w-full overflow-hidden\` or add \`overflow-x-clip\` on parent containers to prevent horizontal page overflow.`
  }
];

const results = [];
console.log(`Starting creation of ${issues.length} distinct GitHub issues...\n`);

for (let i = 0; i < issues.length; i++) {
  const issue = issues[i];
  console.log(`[${i + 1}/${issues.length}] Creating issue: "${issue.title}"...`);
  
  const cmd = ['gh', 'issue', 'create',
    '--repo', 'girishlade111/editorial-studio-site',
    '--title', JSON.stringify(issue.title),
    '--body', JSON.stringify(issue.body),
    '--label', JSON.stringify(issue.labels.join(','))
  ].join(' ');

  try {
    const output = execSync(cmd, { encoding: 'utf8' }).trim();
    console.log(`  ✅ Created: ${output}`);
    results.push({
      number: i + 1,
      title: issue.title,
      category: issue.category,
      labels: issue.labels,
      url: output
    });
  } catch (err) {
    console.error(`  ❌ Failed to create issue: ${err.message}`);
    results.push({
      number: i + 1,
      title: issue.title,
      category: issue.category,
      labels: issue.labels,
      error: err.message
    });
  }
}

console.log('\n=== ISSUE CREATION SUMMARY ===');
console.log(JSON.stringify(results, null, 2));
