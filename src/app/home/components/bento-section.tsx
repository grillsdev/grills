
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Code as IconCode,
  Palette as IconPalette,
  KeyRound,
  MessagesSquare as IconMessages,
  BrainCircuit as IconBrandOpenai
} from "lucide-react";

import { 
  BentoCardComponent, 
  ModelSelectorMockup, 
  ThemeSelectorMockup, 
  CodeEditorMockup,
  CollaborationMockup 
} from "./bento-grid-content";

export default function BentoSection() {
  return (
    <div className="min-h-screen bg-background z-50">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col items-center mb-12 space-y-3">
          <h1 className="text-5xl font-semibold text-center">
            Build
            <br/> amazing interface 
          </h1>
          <p className="text-muted-foreground font-medium text-base max-w-xl text-center">
            From generating <span className="font-semibold">unstyled shadcn</span> components with the smartest LLM to selecting the theme for <br className="block md:hidden"/> your component, your all in one platform for UI development.
          </p>
        </div>
        
        <BentoGrid className="max-w-5xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

const items = [
  {
    title: "Intelligent Chat Interface",
    description: "Communicate with AI models to build and iterate on your components with consistent design and layout.",
    header: <BentoCardComponent />,
    icon: <IconMessages className="h-4 w-4 text-primary" />,
  },
  {
    title: "AI Model Selection",
    description: "Choose from multiple models to power your components development.",
    header: <ModelSelectorMockup />,
    icon: <IconBrandOpenai className="h-4 w-4 text-primary" />,
  },
  {
    title: "Dynamic Theme Engine",
    description: "Instantly customize your application's appearance with custome theming.",
    header: <ThemeSelectorMockup />,
    icon: <IconPalette className="h-4 w-4 text-primary" />,
  },
  {
    title: "Real time Code Generation and Rendering",
    description: "Watch as AI generates clean, production ready UI with consistent design and layout",
    header: <CodeEditorMockup />,
    icon: <IconCode className="h-4 w-4 text-primary" />,
  },
  {
    title: "B.Y.O.K",
    description: "Bring your own API key and choose from a wide range of LLMs across all the top platforms.",
    header: <CollaborationMockup />,
    icon: <KeyRound className="h-4 w-4 text-primary" />,
  }
];