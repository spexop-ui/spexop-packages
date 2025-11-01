# @spexop/cli

Unified command-line interface for Spexop Design System.

> **Version: v0.6.2** (Latest stable release)

## Installation

No installation needed! Use npx:

```bash
npx @spexop/cli create my-app
```

Or install globally:

```bash
npm install -g @spexop/cli

# Then use anywhere
spexop create my-app
```

## Commands

### `spexop tokens`

Generate beautiful, interactive HTML documentation for design tokens with dark mode support.

```bash
# Generate docs for a built-in preset
spexop tokens tech

# Generate with custom output path
spexop tokens minimal --output my-tokens.html

# Use a custom theme file
spexop tokens --theme ./my-theme.ts

# Skip contrast checking for faster generation
spexop tokens tech --no-contrast

# Open in browser after generation
spexop tokens tech --open
```

**Options:**

- `[preset]` - Built-in preset name (tech, minimal, dark, etc.)
- `-o, --output <file>` - Output HTML file path (default: tokens-doc.html)
- `-t, --theme <path>` - Path to custom theme file
- `--no-contrast` - Skip contrast checking
- `--open` - Open in browser after generation

**Features:**

**Visual Documentation:**
- Color swatches with hex, RGB, HSL, and CSS variable syntax
- Interactive spacing scale with visual bars (12+ tokens)
- Typography samples with live text rendering (24+ tokens)
- Border tokens with visual width/radius previews
- Shadow tokens with elevation samples
- Live button previews showing actual appearance with hover effects

**Component Tokens:**
- Resolves token references ({color.primary} → #3b82f6)
- Shows actual color swatches next to values
- Collapsible sections for each variant
- Buttons, forms, cards, navigation, modals
- Original reference shown for context

**Interactive Features:**
- Light/Dark mode toggle with localStorage persistence
- Sticky navigation sidebar with section tracking
- Full WCAG contrast analysis (AAA/AA/FAIL indicators)
- Copy-to-clipboard for all token values
- Search across all tokens
- Filter by category (7 filters)
- Mobile-optimized with hamburger menu
- Smooth scroll navigation
- Auto-detects system theme preference

**Output:**

The command generates a single self-contained HTML file (~150KB) containing:

- Complete token documentation with 161+ tokens
- Sticky table of contents for easy navigation
- Visual button previews showing actual styles
- Interactive dark mode with better contrast
- Responsive design (mobile, tablet, desktop)
- Works completely offline
- Zero external dependencies

**Example Tech Theme Output:**
- 47 color tokens with swatches
- 12 spacing values with visual scale
- 24 typography tokens (sizes, weights, line heights)
- 13 border tokens (widths, radius)
- 45 button tokens across 5 variants
- 903 contrast pairs analyzed
- All token references resolved to actual values

---

### `spexop audit a11y`

Audit theme accessibility for WCAG compliance.

```bash
# Audit a built-in preset
spexop audit a11y --preset tech

# Audit with WCAG AA level
spexop audit a11y --preset tech --level AA

# Show fix suggestions
spexop audit a11y --preset tech --fix

# Export to JSON
spexop audit a11y --preset tech --format json --output report.json

# Export to HTML
spexop audit a11y --preset tech --format html --output report.html

# Export to Markdown
spexop audit a11y --preset tech --format markdown --output report.md

# Strict mode (exit code 1 if issues found, for CI/CD)
spexop audit a11y --preset tech --strict
```

**Options:**

- `-l, --level <level>` - WCAG level (AA or AAA, default: AAA)
- `-f, --format <format>` - Output format (console, json, html, markdown, default: console)
- `-o, --output <file>` - Output file path
- `-s, --strict` - Exit with code 1 if issues found (for CI/CD)
- `--fix` - Show fix suggestions
- `-p, --preset <name>` - Audit a built-in preset theme

**Features:**

- Comprehensive WCAG 2.1 compliance checking
- Auto-detects semantic color pairs (buttons, badges, forms, cards)
- Multiple output formats for different workflows
- CI/CD integration with strict mode
- Detailed fix suggestions
- Validates contrast ratios for all component variants

---

### `spexop create`

Create a new Spexop application with automatic dependency installation.

**Interactive mode (Recommended):**

```bash
npx spexop create
```

**Non-interactive mode:**

```bash
npx spexop create my-app --theme=tech --router=hash --template=full-app
```

**Options:**

- `-t, --theme <theme>` - Theme preset (tech, minimal, dark, etc.)
- `-r, --router <router>` - Router type (hash, react-router, none)
- `--template <template>` - Template type (full-app, minimal)
- `--no-install` - Skip dependency installation
- `--no-git` - Skip git initialization

**Examples:**

```bash
# Full app with tech theme (auto-installs dependencies)
npx spexop create my-saas-app --theme=tech --template=full-app

# Minimal app with dark theme
npx spexop create my-app --theme=dark --template=minimal --no-git

# Interactive mode (recommended for beginners)
npx spexop create

# In a specific directory
cd projects
npx spexop create my-app
```

**Important Notes:**

- ✅ **Dependencies are automatically installed** unless `--no-install` is specified
- ✅ **Creates project in current directory** (e.g., `./my-app`)
- ✅ **Works outside of monorepos** - Project created where you run the command
- ⚠️ **pnpm workspace issue**: If running inside a pnpm monorepo workspace with `pnpm exec spexop`, the project may be created at the workspace root instead of the current directory. Use `npx` instead or call the CLI directly.

**Full-app Template Features:**

The `full-app` template includes:
- ✨ **AppLayout** with TopBar and Sidebar
- 🎨 **Hero component** with split variant and gradient background
- 🧭 **Static Sidebar** with NavSection and NavLink components (320px on desktop)
- 🔍 **SearchModal** with keyboard shortcut (Cmd+K / Ctrl+K)
- ⚙️ **SettingsPanel** with theme controls
- 🏠 **6 routes**: Home, About, Settings, Documentation, Examples, Help
- 🦶 **Footer** with 3 columns, social links, and copyright
- 🌗 **Theme toggle** (light/dark/auto)
- 🔔 **Toast notifications** ready to use
- ♿ **WCAG AA+ accessible** components

### `spexop add`

Add component templates to your existing project.

**Requirements:**

- Must be run inside a Spexop project
- Requires `@spexop/react` v0.6.0+ (for template support)

**Interactive mode:**

```bash
cd my-spexop-app
npx spexop add
```

**Direct mode:**

```bash
npx spexop add hero-centered
npx spexop add pricing-tiers
npx spexop add contact-form
```

**Options:**

- `-p, --path <path>` - Target directory (default: auto-detected)
- `-y, --yes` - Skip confirmation prompts

**Examples:**

```bash
# Browse all templates interactively
cd my-app
npx spexop add

# Add specific template
npx spexop add hero-centered

# Custom save path
npx spexop add pricing-tiers --path src/features/pricing

# Skip overwrite confirmation
npx spexop add contact-form --yes
```

**How it works:**

1. Loads templates from your installed `@spexop/react` package
2. Lets you browse and select templates (or use direct mode)
3. Auto-detects best save path (`src/components`, `app/components`, etc.)
4. Generates component code using `renderTemplateToReact`
5. Saves as `ComponentName.tsx` with proper imports

### `spexop doctor`

Check your Spexop setup for common issues and auto-fix them.

**Requirements:**

- Must be run inside a Spexop project

**Basic usage:**

```bash
cd my-spexop-app
npx spexop doctor
```

**With auto-fix:**

```bash
npx spexop doctor --fix
```

**Options:**

- `--check <type>` - Run specific check (react, css, typescript, etc.)
- `--fix` - Automatically fix issues when possible
- `--verbose` - Show detailed diagnostic information
- `--json` - Output results as JSON (for CI)

**Examples:**

```bash
# Check everything
npx spexop doctor

# Show detailed diagnostics
npx spexop doctor --verbose

# Auto-fix issues interactively
npx spexop doctor --fix

# JSON output for CI
npx spexop doctor --json
```

**What it checks:**

1. **React Version** - Validates React and @types/react compatibility
2. **CSS Imports** - Ensures required CSS is imported
3. **TypeScript** - Checks tsconfig.json configuration
4. **Dependencies** - Validates Spexop package versions

**Output example:**

```bash
🏥 Spexop Doctor - Checking your setup...

✅ React Version: 18.3.1 (Stable)
✅ React Types: 18.3.26 (Match)
✅ CSS Imports: All loaded
✅ TypeScript: Configured
⚠️  Dependencies: Outdated

  • @spexop/react 0.4.7 is outdated (latest: 0.5.0)

⚠️  1 warning

Run 'npx spexop doctor --fix' to auto-fix issues
```

### `spexop theme` (Coming Soon)

Manage themes interactively.

```bash
npx spexop theme           # Open theme manager
npx spexop theme list      # List available themes
npx spexop theme export    # Export current theme
```

## Available Themes

- `tech` - Modern blue & purple (SaaS, tech startups)
- `minimal` - Clean monochrome
- `dark` - Dark-first theme
- `finance` - Green & gold
- `healthcare` - Blue & teal
- `ecommerce` - Orange & red
- `education` - Yellow & blue
- `corporate` - Navy & gray
- `agency` - Vibrant creative
- `vibrant` - High-energy
- `pastel` - Soft gentle
- `startup` - Modern gradients

## Templates

### Full Application

Complete app with:

- TopBar with logo, search, theme toggle
- Sidebar with navigation
- Command Palette (Ctrl/Cmd+K)
- Search Modal
- Settings Panel
- Toast Notifications
- Hash-based routing
- Multiple pages (Home, Settings)

### Minimal

Bare-bones setup with:

- Basic utilities
- Single page
- Theme support
- No routing

## Quick Start

```bash
# Create your app
npx spexop@^0.6.0 create my-app

# Follow the interactive prompts or use flags
npx spexop@^0.6.0 create my-app --theme=tech --template=full-app

# Start development server
cd my-app
pnpm dev
```

## Troubleshooting

### Project Created in Wrong Directory (pnpm Monorepos)

**Issue**: When running `pnpm exec spexop create` inside a pnpm monorepo, the project may be created at the workspace root instead of the current directory.

**Why**: `pnpm exec` changes `process.cwd()` to the workspace root before executing commands. This is standard pnpm behavior for workspace management.

**Solutions**:

1. **Use `npx` instead** (Recommended):
   ```bash
   cd apps
   npx spexop create my-app  # Creates ./apps/my-app ✅
   ```

2. **Call CLI directly**:
   ```bash
   cd apps
   node /path/to/@spexop/cli/dist/index.js create my-app
   ```

3. **Accept workspace behavior and move manually**:
   ```bash
   cd apps
   pnpm exec spexop create my-app  # Creates at workspace root
   mv ../my-app ./my-app           # Move to desired location
   ```

### Dependencies Not Installing in Monorepo

**Issue**: Running CLI inside a pnpm workspace may install dependencies at the workspace level instead of the project level.

**Solution**: Run `pnpm install` in the project directory after creation:
```bash
cd my-app
pnpm install
pnpm dev
```

### Module Not Found Errors

**Issue**: Vite cannot find `@vitejs/plugin-react` or other dependencies.

**Solution**: Ensure dependencies are installed in the project directory:
```bash
cd my-app
pnpm install  # or npm install
pnpm dev
```

## Changelog

### v0.6.2 (2025-11-01)

**Bug Fixes:**
- Fixed `workspace:*` dependency issue causing installation failures
- Fixed linting error with string concatenation in error messages
- All dependencies now properly resolved for npm installation

**Changes:**
- Updated `@spexop/theme` dependency from `workspace:*` to `^0.6.0`
- Improved error message formatting in template file operations

### v0.6.1 (2025-11-01)

**Bug Fixes:**
- Fixed TypeScript DTS build error (`TS5103: Invalid value for '--ignoreDeprecations'`)
- Updated TypeScript configuration for compatibility with TypeScript 5.9.3

**⚠️ Note:** This version had a dependency issue and should not be used. Use v0.6.2 instead.

### v0.6.0 (2025-10-29)

**Initial synchronized release** - First public release aligned with other Spexop packages.

**Features:**
- `spexop create` - Scaffold new Spexop applications
- `spexop add` - Add component templates to existing projects
- `spexop doctor` - Health check and diagnostics
- `spexop audit` - Accessibility and quality audits
- `spexop tokens` - Generate interactive token documentation
- Full template system with minimal and full-app variants
- Interactive CLI with beautiful prompts

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Test locally
node dist/index.js create test-app

# Test in current directory
cd /tmp/test-dir
node /path/to/cli/dist/index.js create my-test-app
```

## License

MIT
