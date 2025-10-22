import Image from "next/image";

interface FeatureCardProps {
  img: string
  title: string;
  description: string;
}

const features = [
  {
    img: "/chatgpt-icon.svg",
    title: "Open AI",
    description: "GPT models to generate, debug, and optimize UI.",
  },
  {
    img: "/openrouter.jpeg",
    title: "Open Router",
    description: "Use across many LLMs for coding flexibility.",
  },
  {
    img: "/anthropic-icon.svg",
    title: "Anthropic",
    description: "it provides one of the most intelligent AI models.",
  },
  {
    img: "/gemini-icon.svg",
    title: "Gemini",
    description: "Provides AI for on of the fastest code completion.",
  },
  {
    img: "/context7.png",
    title: "Context7",
    description: "Provides up to date documentation for LLMs.",
  },
  {
    img: "/e2b.png",
    title: "E2B", 
    description: "Secure sandboxes to preview generated code." 
  },
];

export function FeatureCard({ title, description, img }: FeatureCardProps) {
  return (
    <div className="p-6 flex flex-col items-center text-center max-h-64 min-h-52 space-y-3">
      <Image
        src={img}
        alt={`${title} mockup`}
        width={50}
        height={50}
        className="w-14 h-14 object-cover rounded-[1.5rem]"
      />

      <h3 className="text-xl font-medium text-white leading-tight">
        {title}
      </h3>

      <p className="text-sm flex-1 font-medium text-muted-foreground -mt-1">
        {description}
      </p>
    </div>
  );
}

export default function SupportedPlatform() {
  return (
    <div className="min-h-screen text-white p-1">
      <div className="">
        <div className="flex flex-col items-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-semibold text-center">
            Supported
            <br/> Platforms
          </h1>
            <p className="text-muted-foreground font-semibold text-base max-w-[18rem] md:max-w-sm text-center">
              Your platform, your rule. Dive in and choose from the smartest LLMs to AI sandboxes. We’ve got you covered after all it’s your AI platform.
            </p>
        </div>
        
        {/* Grid with rounded border and internal dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg border overflow-hidden">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`
                border-r border-b
                ${index % 3 === 2 ? 'lg:border-r-0' : ''} /* Remove right border on last column in lg */
                ${index % 2 === 1 ? 'md:border-r-0 lg:border-r' : ''} /* Handle md breakpoint */
                ${index >= features.length - 3 ? 'lg:border-b-0' : ''} /* Remove bottom border on last row lg */
                ${index >= features.length - 2 && features.length % 2 === 0 ? 'md:border-b-0' : ''} /* Handle md last row */
                ${index === features.length - 1 ? 'border-b-0' : ''} /* Remove bottom border on very last item */
              `}
            >
              <FeatureCard
                img={feature.img}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}