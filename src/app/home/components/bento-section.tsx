
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
  CodeEditorMockup,
  CollaborationMockup,
  LivePreviewMockup
} from "./bento-grid-content";

export default function BentoSection() {
  return (
    <div className="min-h-screen bg-background z-40">
      <div className="">
        <div className="flex flex-col items-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-semibold text-center">
            Build
            <br/> amazing interface 
          </h1>
          <p className="text-muted-foreground font-semibold text-base text-center max-w-sm">
            From generating <span className="text-base-300">unstyled shadcn</span> components with the smartest LLM<br className="block md:hidden"/> to spinning up your own preview.
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
    description: "Communicate with AI models to build and iterate.",
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
    title: "Platforms",
    description: "Bring your own API key and choose from a wide range of LLMs across all the top platforms.",
    header: <CollaborationMockup/>,
    icon: <KeyRound className="h-4 w-4 text-primary" />,
  },
  {
    title: "Code Generation and Real Time Rendering",
    description: "Watch as AI generates clean, production ready UI with consistent design and layout with live rendering using AI Sandbox(BYOK)",
    header: <CodeEditorMockup />,
    icon: <IconCode className="h-4 w-4 text-primary" />,
  },
  {
    title: "Live Preview",
    description: "Live preview is supported using AI Sandboxs with (B.Y.O.K)",
    header: <LivePreviewMockup/>,
    icon: <IconPalette className="h-4 w-4 text-primary" />,
  }
];