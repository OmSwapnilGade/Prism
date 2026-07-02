#  Prism Design System

> A modern, highly-polished React component library built with TypeScript, Tailwind CSS v4, and Framer Motion. Featuring "Theme Roulette"—a signature tool that proves design tokens and variant architecture can be completely decoupled from styling.

---

##  Features

- **Theme Roulette:** A slot-machine style feature that instantly morphs the entire application's visual personality with a single click. Showcases true decoupling of component structure and CSS tokens.
- **Command Palette (`Cmd+K`):** A fully keyboard-accessible, fuzzy-searchable global command palette to instantly navigate between components and themes.
- **Interactive Playground:** A dedicated sandbox route to stress-test form components, feedback dialogs, and interactive elements in real-time under different themes.
- **Cinematic Intro Splash:** A beautiful, Framer Motion-powered light refraction SVG animation that sets a premium tone on the first load.
- **Class Variance Authority (CVA):** Every component utilizes CVA for strict, type-safe variant management. No messy inline ternaries or prop-drilling for styles.
- **Accessible by Default:** Built with keyboard navigation, ARIA attributes, semantic HTML, and focus-trapped modals.
- **Recently Viewed:** Smart sidebar tracking that stores your most visited components locally for quick access.

##  Benefits

- **Decoupled Architecture:** Prism demonstrates how to build structural UI components that don't hardcode their styles. The underlying tokens handle the visuals, allowing the same component to look completely different in "Ocean", "Forest", "Light", or "Dark" themes.
- **Developer Experience (DX):** Full strict-mode TypeScript coverage means props derive from `VariantProps`, ensuring types and styles never drift apart. 
- **Premium Aesthetics:** Moving away from flat, generic libraries, Prism incorporates glassmorphism, dynamic Framer Motion micro-interactions, smooth gradients, and curated color palettes out of the box.
- **Zero Configuration Theming:** Themes are handled via standard CSS variables leveraging Tailwind v4's new `@theme` directive, making them blisteringly fast and easy to extend.

##  Technology Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4 (CSS-first config) + `clsx` & `tailwind-merge`
- **Animations:** Framer Motion
- **Variants:** Class Variance Authority (`cva`)
- **Syntax Highlighting:** Prism React Renderer

##  Getting Started

### Prerequisites
Make sure you have Node.js installed.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/yourusername/prism.git
   cd prism
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173` to view the documentation and playground!

##  Component Architecture

Prism components follow a strict internal structure:
1. **Types (`Component.types.ts`):** Interface definitions extending native HTML props + VariantProps.
2. **Styles (`Component.tsx`):** CVA definitions for base styles, variants, and sizes.
3. **Logic (`Component.tsx`):** The React component itself, managing state, refs, and accessibility (ARIA).
4. **Docs (`ComponentDoc.tsx`):** A dedicated live-preview documentation page automatically registered in the sidebar.

##  Accessibility Checklist
All Prism components adhere to the following standards:
- [x] Semantic HTML elements (`<button>`, `<dialog>`, etc.)
- [x] Keyboard operable (Tab, Space, Enter, Arrow Keys, Escape)
- [x] Visible focus indicators (`focus-visible`)
- [x] Appropriate ARIA roles (`role="tablist"`, `aria-live="polite"`, `aria-expanded`)
- [x] Focus trapping inside Modals and Palettes

---

*Built with ❤️ as an advanced front-end portfolio piece.*
