import LoginBtn from "../(chat)/components/login-btn";
import BentoSection from "./components/bento-section";
import { TextGenerateEffect } from "@/components/ui/text-generation-effect";
import HighlightedComponent from "./components/highlisht-text";
import GoToTwitter from "./components/go-to-twitter";

const words = `( Bring Your Own Key ) helps you save money since you’re only paying for what you use directly, with no added markup or hidden fees. It’s a smarter, more transparent way to build.`;
const models = [
  "Gemini 2.5 Pro",
  "Gemini 2.5 Flash",
  "Gemini 2.5 Flash Lite",
  "Gemini 2.0 Flash",
  "Claude Opus 4",
  "Claude Sonnet 4",
  "Claude 3.7 Sonnet",
  "Claude 3.5 Sonnet",
  "Qwen 3 Coder",
  "Kimi K2",
  "Deepseek V3",
  "Grok 4",
  "Grok 3 Mini",
  "GPT 4.1",
  "GPT 4.1 Mini",
  "O4 Mini",
  "O3 Mini",
  "GPT 4.1 Nano",
  "GPT 4.0 Mini",
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen  overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="w-full max-w-4xl z-50 backdrop-blur-xl  border-b border  mt-5 rounded-[30px] fixed">
        <div className="mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo with dot pattern */}
            <div className="flex flex-row  justify-center">
              <span className="text-xl tracking-wider italic font-medium text-white">grills <span className="text-xs text-secondary tracking-tighter italic-none">alpha</span></span>
            </div>

            
            {/* Navigation Links */}
            <div className="flex items-center ">
              <div className="">
                <LoginBtn variant="outline" text="Login" size="default"/>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-30 pb-8 md:pb-16">
        <div className="text-center space-y-7">
          {/* Main Heading */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-light leading-[0.9] tracking-tight max-w-5xl mx-auto">
              Build functional
              <br />
              <span className="font-normal">shadcn components</span>
              <br />
              <span className="text-gray-300">with your favorite LLM</span>
            </h1>
            
            <div className="text-xl text-gray-300/75 leading-relaxed max-w-2xl mx-auto font-light">
              Generate production ready shadcn/ui components instantly. Choose from multiple AI models with (BYOK) and maintain <HighlightedComponent text="consistent"/> design & layout across your projects.
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <div className="flex justify-center">
                <LoginBtn variant="outline" text="Build now" size="lg"/>
            </div>
          </div>
        </div>
      </main>

       <div className="relative z-40 overflow-hidden py-3 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-b border-white/[0.05]" 
           style={{ transform: 'rotate(0.0deg)', transformOrigin: 'center' }}>
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="flex items-center space-x-8 text-sm text-gray-400 font-light">
            {models.map((model, index) => (
        <div key={index}>
            <span className="text-white px-1">•</span>
          <span>{model}</span>
        </div >
      ))}
          </div>
        </div>
      </div>

      <div className="mt-7 md:mt-10">
      <BentoSection/>
      </div>

      <div className="mt-6 md:mt-16 max-w-5xl px-7 md:px-3 pb-20 ">
        <TextGenerateEffect words={words}/>
      </div>

      <GoToTwitter/>
    </div>
  );
}

