
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Code as IconCode,
  Palette as IconPalette,
  Users as IconUsers,
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h1 className="text-5xl font-medium ">
            Features
          </h1>
          <p className="text-muted-foreground text-lg">
            Build production ready components
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
    title: "Live Collaboration",
    description: "Work together with your team in real time, sharing ideas and building together.",
    header: <CollaborationMockup />,
    icon: <IconUsers className="h-4 w-4 text-primary" />,
  }
];