import * as shadcnComponents from "@/lib/shadcn-components";

const utils = `
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

const useMobileHook = 'import * as React from "react"\n\n' +
'const MOBILE_BREAKPOINT = 768\n\n' +
'export function useIsMobile() {\n' +
'  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)\n\n' +
'  React.useEffect(() => {\n' +
'    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)\n' +
'    const onChange = () => {\n' +
'      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)\n' +
'    }\n' +
'    mql.addEventListener("change", onChange)\n' +
'    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)\n' +
'    return () => mql.removeEventListener("change", onChange)\n' +
'  }, [])\n\n' +
'  return !!isMobile\n' +
'}\n';

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
`

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
`
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
`

const componentsJson = `{
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
`
export const webcontainerFiles = {
    "/components.json": componentsJson,
    "/tsconfig.app.json": tsconfigAppJson,
    "/tsconfig.json": tsconfigJson,
    "/tsconfig.node.json": tsconfigNodeJson,
    "/src/lib/utils.ts": utils,
    "/src/hooks/use-mobile.ts": useMobileHook,
    "/src/components/ui/accordion.tsx": shadcnComponents.accordion,
    "/src/components/ui/alert-dialog.tsx": shadcnComponents.alertDialog,
    "/src/components/ui/alert.tsx": shadcnComponents.alert,
    "/src/components/ui/aspect-ratio.tsx": shadcnComponents.aspectRatio,
    "/src/components/ui/avatar.tsx": shadcnComponents.avatar,
    "/src/components/ui/badge.tsx": shadcnComponents.badge,
    "/src/components/ui/breadcrumb.tsx": shadcnComponents.breadcrumb,
    "/src/components/ui/button.tsx": shadcnComponents.button,
    "/src/components/ui/calendar.tsx": shadcnComponents.calendar,
    "/src/components/ui/card.tsx": shadcnComponents.card,
    "/src/components/ui/carousel.tsx": shadcnComponents.carousel,
    "/src/components/ui/chart.tsx": shadcnComponents.chart,
    "/src/components/ui/checkbox.tsx": shadcnComponents.checkbox,
    "/src/components/ui/collapsible.tsx": shadcnComponents.collapsible,
    "/src/components/ui/command.tsx": shadcnComponents.command,
    "/src/components/ui/context-menu.tsx": shadcnComponents.contextMenu,
    "/src/components/ui/dialog.tsx": shadcnComponents.dialog,
    "/src/components/ui/drawer.tsx": shadcnComponents.drawer,
    "/src/components/ui/dropdown-menu.tsx": shadcnComponents.dropdown,
    "/src/components/ui/form.tsx": shadcnComponents.form,
    "/src/components/ui/hover-card.tsx": shadcnComponents.hoverCard,
    "/src/components/ui/input-otp.tsx": shadcnComponents.inputOtp,
    "/src/components/ui/input.tsx": shadcnComponents.input,
    "/src/components/ui/label.tsx": shadcnComponents.label,
    "/src/components/ui/menubar.tsx": shadcnComponents.menubar,
    "/src/components/ui/navigation-menu.tsx": shadcnComponents.navigationMenu,
    "/src/components/ui/pagination.tsx": shadcnComponents.pagination,
    "/src/components/ui/popover.tsx": shadcnComponents.popover,
    "/src/components/ui/progress.tsx": shadcnComponents.progress,
    "/src/components/ui/radio-group.tsx": shadcnComponents.radioGroup,
    "/src/components/ui/resizable.tsx": shadcnComponents.resizable,
    "/src/components/ui/scroll-area.tsx": shadcnComponents.scrollArea,
    "/src/components/ui/select.tsx": shadcnComponents.select,
    "/src/components/ui/separator.tsx": shadcnComponents.separator,
    "/src/components/ui/sheet.tsx": shadcnComponents.sheet,
    "/src/components/ui/sidebar.tsx": shadcnComponents.sidebar,
    "/src/components/ui/skeleton.tsx": shadcnComponents.skeleton,
    "/src/components/ui/slider.tsx": shadcnComponents.slider,
    "/src/components/ui/sonner.tsx": shadcnComponents.sonner,
    "/src/components/ui/switch.tsx": shadcnComponents.switchComponent,
    "/src/components/ui/table.tsx": shadcnComponents.table,
    "/src/components/ui/tabs.tsx": shadcnComponents.tabs,
    "/src/components/ui/textarea.tsx": shadcnComponents.textarea,
    "/src/components/ui/toggle-group.tsx": shadcnComponents.toggleGroup,
    "/src/components/ui/toggle.tsx": shadcnComponents.toggle,
    "/src/components/ui/tooltip.tsx": shadcnComponents.tooltip,
  };
