import dedent from 'dedent';

export const AppTsx = dedent`
import React, { useState } from 'react';
import * as Component from "./Component.tsx"

function ThemeWrapper({ children }: {children:React.ReactNode}) {

  const themeStyles = \`
    :root {
      --base-50: oklch(0.9851 0 0);
      --base-100: oklch(0.97 0 0);
      --base-200: oklch(0.922 0 0);
      --base-300: oklch(0.87 0 0);
      --base-400: oklch(0.708 0 0);
      --base-500: oklch(0.556 0 0);
      --base-600: oklch(0.439 0 0);
      --base-700: oklch(0.371 0 0);
      --base-800: oklch(0.269 0 0);
      --base-900: oklch(0.205 0 0);
      --base-950: oklch(0.145 0 0);
      --base-1000: oklch(0.106 0 0);

      --primary-50: oklch(0.9764 0.0103 307.83);
      --primary-100: oklch(0.9456 0.0241 306.77);
      --primary-200: oklch(0.9015 0.0461 306.27);
      --primary-300: oklch(0.8263 0.0871 305.97);
      --primary-400: oklch(0.7135 0.1485 305.12);
      --primary-500: oklch(0.6262 0.194 303.54);
      --primary-600: oklch(0.5575 0.2111 302.02);
      --primary-700: oklch(0.4958 0.1946 301.62);
      --primary-800: oklch(0.4403 0.1603 303.37);
      --primary-900: oklch(0.381 0.1294 304.62);
      --primary-950: oklch(0.2907 0.1091 302.34);
      --primary-1000: oklch(0.2229 0.0942 300.64);

      /* New Colors: Warning, Success, Info */
      --warning-50: oklch(0.99 0.01 70);
      --warning-100: oklch(0.97 0.03 70);
      --warning-200: oklch(0.94 0.06 70);
      --warning-300: oklch(0.89 0.1 70);
      --warning-400: oklch(0.8 0.15 70);
      --warning-500: oklch(0.7 0.2 70);
      --warning-600: oklch(0.6 0.22 70);
      --warning-700: oklch(0.5 0.2 70);
      --warning-800: oklch(0.4 0.15 70);
      --warning-900: oklch(0.3 0.1 70);
      --warning-950: oklch(0.2 0.07 70);

      --success-50: oklch(0.99 0.005 140);
      --success-100: oklch(0.97 0.015 140);
      --success-200: oklch(0.94 0.03 140);
      --success-300: oklch(0.89 0.05 140);
      --success-400: oklch(0.8 0.08 140);
      --success-500: oklch(0.7 0.11 140);
      --success-600: oklch(0.6 0.12 140);
      --success-700: oklch(0.5 0.11 140);
      --success-800: oklch(0.4 0.08 140);
      --success-900: oklch(0.3 0.05 140);
      --success-950: oklch(0.2 0.03 140);

      --info-50: oklch(0.99 0.005 240);
      --info-100: oklch(0.97 0.015 240);
      --info-200: oklch(0.94 0.03 240);
      --info-300: oklch(0.89 0.05 240);
      --info-400: oklch(0.8 0.08 240);
      --info-500: oklch(0.7 0.11 240);
      --info-600: oklch(0.6 0.12 240);
      --info-700: oklch(0.5 0.11 240);
      --info-800: oklch(0.4 0.08 240);
      --info-900: oklch(0.3 0.05 240);
      --info-950: oklch(0.2 0.03 240);

      --color-white: oklch(100% 0 0); /* Added for explicit white */

      --background: var(--color-white);
      --foreground: var(--base-800);
      --card: var(--color-white);
      --card-foreground: var(--base-800);
      --popover: var(--color-white);
      --popover-foreground: var(--base-800);
      --primary: var(--primary-800);
      --primary-foreground: var(--color-white);
      --secondary: var(--base-100);
      --secondary-foreground: var(--base-800);
      --muted: var(--base-50);
      --muted-foreground: var(--base-600);
      --accent: var(--base-50);
      --accent-foreground: var(--base-800);
      --destructive: oklch(0.577 0.245 27.325);
      --border: var(--base-200);
      --input: var(--base-300);
      --ring: var(--primary-800);
      --chart-1: var(--primary-800);
      --chart-2: var(--primary-200);
      --chart-3: var(--primary-400);
      --chart-4: var(--primary-300);
      --chart-5: var(--primary-100);
      --radius: 1rem;
      --sidebar: var(--base-100);
      --sidebar-foreground: var(--base-800);
      --sidebar-primary: var(--primary-800);
      --sidebar-primary-foreground: var(--color-white);
      --sidebar-accent: var(--base-200);
      --sidebar-accent-foreground: var(--base-800);
      --sidebar-border: var(--base-200);
      --sidebar-ring: var(--primary-800);

      /* Semantic new colors */
      --warning: var(--warning-500);
      --warning-foreground: var(--base-950); /* Dark text for light warning background */
      --success: var(--success-500);
      --success-foreground: var(--color-white); /* Light text for dark success background */
      --info: var(--info-500);
      --info-foreground: var(--color-white); /* Light text for dark info background */
    }

    .dark {
      --background: var(--base-950);
      --foreground: var(--base-200);
      --card: var(--base-950);
      --card-foreground: var(--base-200);
      --popover: var(--base-950);
      --popover-foreground: var(--base-200);
      --primary: var(--primary-800);
      --primary-foreground: var(--color-white);
      --secondary: var(--base-800);
      --secondary-foreground: var(--base-200);
      --muted: var(--base-900);
      --muted-foreground: var(--base-400);
      --accent: var(--base-900);
      --accent-foreground: var(--base-200);
      --destructive: oklch(0.704 0.191 22.216);
      --border: var(--base-800);
      --input: var(--base-700);
      --ring: var(--primary-800);
      --chart-1: var(--primary-800);
      --chart-2: var(--primary-200);
      --chart-3: var(--primary-400);
      --chart-4: var(--primary-300);
      --chart-5: var(--primary-100);
      --sidebar: var(--base-900);
      --sidebar-foreground: var(--base-200);
      --sidebar-primary: var(--primary-800);
      --sidebar-primary-foreground: var(--color-white);
      --sidebar-accent: var(--base-800);
      --sidebar-accent-foreground: var(--base-200);
      --sidebar-border: var(--base-800);
      --sidebar-ring: var(--primary-800);

      /* Semantic new colors for dark mode */
      --warning: var(--warning-400); /* Slightly lighter for dark mode visibility */
      --warning-foreground: var(--base-950);
      --success: var(--success-400);
      --success-foreground: var(--color-white);
      --info: var(--info-400);
      --info-foreground: var(--color-white);
    }

    /* Mapping custom properties to Tailwind's default color names for easier use */
    /* Note: For full Tailwind integration, these would typically go in tailwind.config.js */
    /* However, for direct CSS variable usage in components, this is how they'd be defined. */
    .bg-background { background-color: var(--background); }
    .text-foreground { color: var(--foreground); }
    .bg-card { background-color: var(--card); }
    .text-card-foreground { color: var(--card-foreground); }
    .bg-primary { background-color: var(--primary); }
    .text-primary-foreground { color: var(--primary-foreground); }
    .bg-secondary { background-color: var(--secondary); }
    .text-secondary-foreground { color: var(--secondary-foreground); }
    .bg-muted { background-color: var(--muted); }
    .text-muted-foreground { color: var(--muted-foreground); }
    .bg-accent { background-color: var(--accent); }
    .text-accent-foreground { color: var(--accent-foreground); }
    .bg-destructive { background-color: var(--destructive); }
    .border-border { border-color: var(--border); }
    .border-input { border-color: var(--input); }
    .ring-ring { outline-color: var(--ring); } /* For focus rings */

    /* New color mappings */
    .bg-warning { background-color: var(--warning); }
    .text-warning-foreground { color: var(--warning-foreground); }
    .bg-success { background-color: var(--success); }
    .text-success-foreground { color: var(--success-foreground); }
    .bg-info { background-color: var(--info); }
    .text-info-foreground { color: var(--info-foreground); }


    /* Example of using radius */
    .rounded-lg { border-radius: var(--radius); }
    .rounded-md { border-radius: calc(var(--radius) - 2px); }
    .rounded-sm { border-radius: calc(var(--radius) - 4px); }
  \`;

  return (
    <>
      {/* Inject the CSS variables into the head of the document */}
      <style>{themeStyles}</style>
        {children}
    </>
  );
}
export default function App() {
  return (
  <ThemeWrapper>
  <>
   <Component.default/>
  </>
  </ThemeWrapper>
  );
}`;