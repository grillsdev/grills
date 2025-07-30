import { FileSystemTree } from "@webcontainer/api";

import dedent from "dedent";

const utilFile = `
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

const useMobileHookFile =
  'import * as React from "react"\n\n' +
  "const MOBILE_BREAKPOINT = 768\n\n" +
  "export function useIsMobile() {\n" +
  "  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)\n\n" +
  "  React.useEffect(() => {\n" +
  "    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)\n" +
  "    const onChange = () => {\n" +
  "      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)\n" +
  "    }\n" +
  '    mql.addEventListener("change", onChange)\n' +
  "    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)\n" +
  '    return () => mql.removeEventListener("change", onChange)\n' +
  "  }, [])\n\n" +
  "  return !!isMobile\n" +
  "}\n";

const tsconfigNodeJson = `
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
`;

const tsconfigJson = `
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`;
const tsconfigAppJson = `
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
     "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": ["src"]
}
`;

const shadcnComponentsJsonFile = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
`;

export const viteReactShadcnTemplate: FileSystemTree = {
  ".gitignore": {
    file: {
      contents: `
node_modules
dist
.DS_Store
*.local
      `,
    },
  },
  "package.json": {
    file: {
      contents: `
        {
        "name": "grill-development",
        "private": true,
        "version": "0.0.0",
        "type": "module",
        "scripts": {
            "dev": "vite --port 3000",
            "build": "tsc && vite build",
            "preview": "vite preview"
        },
        "dependencies": {
            "@tailwindcss/vite": "^4.1.5",
            "class-variance-authority": "^0.7.1",
            "clsx": "^2.1.1",
            "lucide-react": "^0.507.0",
            "react": "^19.0.0",
            "react-dom": "^19.0.0",
            "tailwind-merge": "^3.2.0"
            },
        "devDependencies": {
            "@types/node": "^22.15.3",
            "@types/react": "^19.0.10",
            "@types/react-dom": "^19.0.4",
            "@vitejs/plugin-react": "^4.3.4",
            "globals": "^16.0.0",
            "tw-animate-css": "^1.2.9",
            "typescript": "~5.7.2",
            "vite": "^6.3.1"
        }
        }
      `,
    },
  },
  "vite.config.ts": {
    file: {
      contents: `
        import path from "path"
        import { defineConfig } from 'vite';
        import react from '@vitejs/plugin-react';
        import tailwindcss from '@tailwindcss/vite'

        // https://vitejs.dev/config/
        export default defineConfig({
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
            "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            // Explicitly set port for consistency within WebContainer
            // The 'server-ready' event will give the proxied URL
            port: 3000,
            hmr: {
            // If HMR issues occur, clientPort might need to be configured
            // based on how WebContainer proxies WebSockets.
            // For now, rely on Vite's default behavior.
            }
        },
        // Optimize deps for faster cold starts in WebContainer
        optimizeDeps: {
            include: ['react', 'react-dom'],
        },
        });
            `,
    },
  },
  "index.html": {
    file: {
      contents: `
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React + TS + Vite (in WebContainer)</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
        </body>
        </html>
      `,
    },
  },
  "tsconfig.json": {
    file: {
      contents: tsconfigJson,
    },
  },
  "tsconfig.app.json": {
    file: {
      contents: tsconfigAppJson,
    },
  },
  "tsconfig.node.json": {
    file: {
      contents: tsconfigNodeJson,
    },
  },
  "components.json": {
    file: {
      contents: shadcnComponentsJsonFile,
    },
  },
  src: {
    directory: {
      lib: {
        directory: {
          "utils.ts": {
            file: {
              contents: utilFile,
            },
          },
        },
      },
      hooks: {
        directory: {
          "use-mobile.ts": {
            file: {
              contents: useMobileHookFile,
            },
          },
        },
      },
      components: {
        directory: {
          ui: {
            directory: {
              "nothing.tsx": {
                file: {
                  contents: dedent`const export nothing = thisIsNothingFile`,
                },
              },
          
            },
          },
        },
      },
      "main.tsx": {
        file: {
          contents: `
            import React from 'react';
            import ReactDOM from 'react-dom/client';
            import App from './App.tsx';
            import './index.css';

            ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            );
            `,
        },
      },
      "App.tsx": {
        // This will be our editable file
        file: {
          contents: dedent`
          import * as Component from "./Component"

          export default function App() {
            return <Component.default/>
          }`,
        },
      },
      // You can add a vite-env.d.ts if you use Vite's env variables, for now, it's simple.
      "vite-env.d.ts": {
        file: {
          contents: `/// <reference types="vite/client" />`,
        },
      },
      ".stackblitzrc": {
        file: {
          contents: `
            {
            "persist": [
                "node_modules"
            ]
            }
            `,
        },
      },
    },
  },
};
