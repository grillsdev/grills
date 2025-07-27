import { FileSystemTree } from "@webcontainer/api";
import * as shadcnComponents from "@/lib/shadcn-components";

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
            "tailwind-merge": "^3.2.0",
            "@hookform/resolvers": "^5.1.1",
            "@radix-ui/react-accordion": "^1.2.11",
            "@radix-ui/react-alert-dialog": "^1.1.14",
            "@radix-ui/react-aspect-ratio": "^1.1.7",
            "@radix-ui/react-avatar": "^1.1.10",
            "@radix-ui/react-checkbox": "^1.3.2",
            "@radix-ui/react-collapsible": "^1.1.11",
            "@radix-ui/react-context-menu": "^2.2.15",
            "@radix-ui/react-dialog": "^1.1.14",
            "@radix-ui/react-dropdown-menu": "^2.1.15",
            "@radix-ui/react-hover-card": "^1.1.14",
            "@radix-ui/react-label": "^2.1.7",
            "@radix-ui/react-menubar": "^1.1.15",
            "@radix-ui/react-navigation-menu": "^1.2.13",
            "@radix-ui/react-popover": "^1.1.14",
            "@radix-ui/react-progress": "^1.1.7",
            "@radix-ui/react-radio-group": "^1.3.7",
            "@radix-ui/react-scroll-area": "^1.2.9",
            "@radix-ui/react-select": "^2.2.5",
            "@radix-ui/react-separator": "^1.1.7",
            "@radix-ui/react-slider": "^1.3.5",
            "@radix-ui/react-slot": "^1.2.3",
            "@radix-ui/react-switch": "^1.2.5",
            "@radix-ui/react-tabs": "^1.1.12",
            "@radix-ui/react-toggle": "^1.1.9",
            "@radix-ui/react-toggle-group": "^1.1.10",
            "@radix-ui/react-tooltip": "^1.2.7",
            "cmdk": "^1.1.1",
            "date-fns": "^4.1.0",
            "embla-carousel-react": "^8.6.0",
            "input-otp": "^1.4.2",
            "react-day-picker": "^9.8.0",
            "react-hook-form": "^7.60.0",
            "react-resizable-panels": "^3.0.3",
            "recharts": "2.15.4",
            "sonner": "^2.0.6",
            "vaul": "^1.1.2",
            "zod": "^4.0.5"
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
              "button.tsx": {
                file: {
                  contents: shadcnComponents.button,
                },
              },
              "accordion.tsx": {
                file: {
                  contents: shadcnComponents.accordion,
                },
              },
              "alert-dialog.tsx": {
                file: {
                  contents: shadcnComponents.alertDialog,
                },
              },
              "alert.tsx": {
                file: {
                  contents: shadcnComponents.alert,
                },
              },
              "aspect-ratio.tsx": {
                file: {
                  contents: shadcnComponents.aspectRatio,
                },
              },
              "avatar.tsx": {
                file: {
                  contents: shadcnComponents.avatar,
                },
              },
              "badge.tsx": {
                file: {
                  contents: shadcnComponents.badge,
                },
              },
              "breadcrumb.tsx": {
                file: {
                  contents: shadcnComponents.breadcrumb,
                },
              },
              "calendar.tsx": {
                file: {
                  contents: shadcnComponents.calendar,
                },
              },
              "card.tsx": {
                file: {
                  contents: shadcnComponents.card,
                },
              },
              "carousel.tsx": {
                file: {
                  contents: shadcnComponents.carousel,
                },
              },
              "chart.tsx": {
                file: {
                  contents: shadcnComponents.chart,
                },
              },
              "checkbox.tsx": {
                file: {
                  contents: shadcnComponents.checkbox,
                },
              },
              "collapsible.tsx": {
                file: {
                  contents: shadcnComponents.collapsible,
                },
              },
              "command.tsx": {
                file: {
                  contents: shadcnComponents.command,
                },
              },
              "context-menu.tsx": {
                file: {
                  contents: shadcnComponents.contextMenu,
                },
              },
              "dialog.tsx": {
                file: {
                  contents: shadcnComponents.dialog,
                },
              },
              "drawer.tsx": {
                file: {
                  contents: shadcnComponents.drawer,
                },
              },
              "dropdown-menu.tsx": {
                file: {
                  contents: shadcnComponents.dropdown,
                },
              },
              "form.tsx": {
                file: {
                  contents: shadcnComponents.form,
                },
              },
              "hover-card.tsx": {
                file: {
                  contents: shadcnComponents.hoverCard,
                },
              },
              "input-otp.tsx": {
                file: {
                  contents: shadcnComponents.inputOtp,
                },
              },
              "input.tsx": {
                file: {
                  contents: shadcnComponents.input,
                },
              },
              "label.tsx": {
                file: {
                  contents: shadcnComponents.label,
                },
              },
              "menubar.tsx": {
                file: {
                  contents: shadcnComponents.menubar,
                },
              },
              "navigation-menu.tsx": {
                file: {
                  contents: shadcnComponents.navigationMenu,
                },
              },
              "pagination.tsx": {
                file: {
                  contents: shadcnComponents.pagination,
                },
              },
              "popover.tsx": {
                file: {
                  contents: shadcnComponents.popover,
                },
              },
              "progress.tsx": {
                file: {
                  contents: shadcnComponents.progress,
                },
              },
              "radio-group.tsx": {
                file: {
                  contents: shadcnComponents.radioGroup,
                },
              },
              "resizable.tsx": {
                file: {
                  contents: shadcnComponents.resizable,
                },
              },
              "scroll-area.tsx": {
                file: {
                  contents: shadcnComponents.scrollArea,
                },
              },
              "select.tsx": {
                file: {
                  contents: shadcnComponents.select,
                },
              },
              "separator.tsx": {
                file: {
                  contents: shadcnComponents.separator,
                },
              },
              "sheet.tsx": {
                file: {
                  contents: shadcnComponents.sheet,
                },
              },
              "sidebar.tsx": {
                file: {
                  contents: shadcnComponents.sidebar,
                },
              },
              "skeleton.tsx": {
                file: {
                  contents: shadcnComponents.skeleton,
                },
              },
              "slider.tsx": {
                file: {
                  contents: shadcnComponents.slider,
                },
              },
              "sonner.tsx": {
                file: {
                  contents: shadcnComponents.sonner,
                },
              },
              "switch.tsx": {
                file: {
                  contents: shadcnComponents.switchComponent,
                },
              },
              "table.tsx": {
                file: {
                  contents: shadcnComponents.table,
                },
              },
              "tabs.tsx": {
                file: {
                  contents: shadcnComponents.tabs,
                },
              },
              "textarea.tsx": {
                file: {
                  contents: shadcnComponents.textarea,
                },
              },
              "toggle-group.tsx": {
                file: {
                  contents: shadcnComponents.toggleGroup,
                },
              },
              "toggle.tsx": {
                file: {
                  contents: shadcnComponents.toggle,
                },
              },
              "tooltip.tsx": {
                file: {
                  contents: shadcnComponents.tooltip,
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
