/**
 * Generate Project Scaffold
 *
 * Emits all boilerplate files needed to run `npm install && npm run dev`
 * in the exported project: package.json, vite.config.ts, tsconfig files,
 * index.html, main.tsx, and App.tsx.
 */

import type { ExportFile } from "./exportTypes";
import type { Theme } from "@/types";

/** Generate all scaffold files for the exported project */
export function generateScaffold(
  theme: Theme,
  projectName: string
): ExportFile[] {
  return [
    packageJson(projectName),
    viteConfig(),
    tsconfigJson(),
    tsconfigAppJson(),
    indexHtml(projectName),
    mainTsx(),
    appTsx(theme),
  ];
}

// ── Individual file generators ────────────────────────────────────────────

function packageJson(projectName: string): ExportFile {
  const pkg = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      preview: "vite preview",
    },
    dependencies: {
      "@tailwindcss/vite": "^4.3.1",
      "class-variance-authority": "^0.7.1",
      clsx: "^2.1.1",
      "framer-motion": "^12.41.0",
      react: "^19.2.7",
      "react-dom": "^19.2.7",
      "tailwind-merge": "^3.6.0",
      tailwindcss: "^4.3.1",
    },
    devDependencies: {
      "@types/node": "^24.13.2",
      "@types/react": "^19.2.17",
      "@types/react-dom": "^19.2.3",
      "@vitejs/plugin-react": "^6.0.2",
      typescript: "~6.0.2",
      vite: "^8.1.0",
    },
  };

  return {
    path: "package.json",
    content: JSON.stringify(pkg, null, 2),
  };
}

function viteConfig(): ExportFile {
  return {
    path: "vite.config.ts",
    content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
`,
  };
}

function tsconfigJson(): ExportFile {
  return {
    path: "tsconfig.json",
    content: JSON.stringify(
      {
        files: [],
        references: [
          { path: "./tsconfig.app.json" },
          { path: "./tsconfig.node.json" },
        ],
      },
      null,
      2
    ),
  };
}

function tsconfigAppJson(): ExportFile {
  return {
    path: "tsconfig.app.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          tsBuildInfoFile: "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
          target: "ES2020",
          useDefineForClassFields: true,
          lib: ["ES2020", "DOM", "DOM.Iterable"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          isolatedModules: true,
          moduleDetection: "force",
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          noUncheckedSideEffectImports: true,
          baseUrl: ".",
          paths: { "@/*": ["./src/*"] },
        },
        include: ["src"],
      },
      null,
      2
    ),
  };
}

function tsconfigNodeJson(): ExportFile {
  return {
    path: "tsconfig.node.json",
    content: JSON.stringify(
      {
        compilerOptions: {
          tsBuildInfoFile: "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
          target: "ES2022",
          lib: ["ES2023"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          isolatedModules: true,
          moduleDetection: "force",
          noEmit: true,
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          noUncheckedSideEffectImports: true,
        },
        include: ["vite.config.ts"],
      },
      null,
      2
    ),
  };
}

function indexHtml(projectName: string): ExportFile {
  const title =
    projectName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "My Prism Page";

  return {
    path: "index.html",
    content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>

    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
  };
}

function mainTsx(): ExportFile {
  return {
    path: "src/main.tsx",
    content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  };
}

function appTsx(theme: Theme): ExportFile {
  return {
    path: "src/App.tsx",
    content: `import { Page } from './pages/Page';

/**
 * App root — wraps the exported Prism page.
 * Theme "${theme}" is baked into index.css as :root variables.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Page />
    </div>
  );
}
`,
  };
}

// Export the node tsconfig too so it's in scope
export { tsconfigNodeJson };
