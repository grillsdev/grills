import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";

import Image from "next/image";

export const BentoCardComponent = () => {
  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border p-3 space-y-3">
      {/* Chat Messages */}
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="w-3 h-3 text-primary-foreground" />
          </div>
          <div className="bg-muted text-muted-foreground text-xs rounded-lg px-3 py-2 max-w-[80%]">
            How can I help you today?
          </div>
        </div>
        
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-primary text-primary-foreground text-xs rounded-lg px-3 py-2 max-w-[80%]">
            Build me a error toast
          </div>
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <User className="w-3 h-3 text-secondary-foreground" />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input 
          placeholder="Type your message..." 
          className="flex-1 text-xs h-8"
        />
        <Button size="sm" className="h-8 w-8 p-0">
          <Send className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export const ModelSelectorMockup = () => {
  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border p-3 space-y-3">
      <div className="space-y-2">
        {["GPT-4", "Claude-4", "Gemini Pro"].map((model, i) => (
          <div 
            key={model}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
              i === 0 ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground'}`} />
            <span className="text-xs text-foreground">{model}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ThemeSelectorMockup = () => {
  const themes = [
    { name: "Ocean", color: "bg-blue-500" },
    { name: "Forest", color: "bg-green-500" },
    { name: "Sunset", color: "bg-orange-500" },
    { name: "Midnight", color: "bg-purple-500" }
  ];

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border p-3 space-y-3">
      <div className="text-sm font-medium text-foreground">Choose Theme</div>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme, i) => (
          <div 
            key={theme.name}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all ${
              i === 0 ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:bg-muted/50'
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${theme.color}`} />
            <span className="text-xs text-foreground">{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CodeEditorMockup = () => {
  return (
    <div className="flex flex-col bg-background rounded-lg border border-border p-3 pb-1.5 space-y-2 max-h-[280px]">
      {/* Header with window controls and filename */}
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">Component.tsx</span>
      </div>
      
      {/* Scrollable content area */}
      <div className="bg-muted/30 rounded-lg overflow-y-auto h-28 mb-2">
          <Image
            src="/hello-world-ts.svg"
            width={500}
            height={500}
            alt="Generated TypeScript code"
            className="max-w-full h-auto"
          />
      </div>
    </div>
  );
};

export const CollaborationMockup = () => {
  const users = [
    { name: "OpenAI", color: "bg-blue-500", active: true },
    { name: "Claude", color: "bg-orange-600", active: false },
    { name: "Open Router", color: "bg-gray-500", active: false }
  ];

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border p-3 space-y-3">
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.name} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${user.color} flex items-center justify-center`}>
              <span className="text-xs text-white font-medium">{user.name[0]}</span>
            </div>
            <span className="text-xs text-foreground">{user.name}</span>
            <div className={`w-2 h-2 rounded-full ml-auto ${
              user.active ? 'bg-green-500' : 'bg-muted-foreground'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
};