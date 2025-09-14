import HighlightedComponent from "./highlisht-text";


const Hero = () => {
  return (
  <div className="space-y-4">
    <h1 className="text-4xl font-semibold leading-none tracking-tighter md:text-[7vw] lg:text-6xl z-50">
      Build functional & <span className="font-serif italic text-orange-400">beautiful</span> interface with <HighlightedComponent text="consistent"/> design.
    </h1>
    <p className="max-w-2xl text-foreground/80 md:text-[2vw] lg:text-xl font-medium z-50 pr-2">
      Your own <span className="font-bold">AI </span> platform. <span className="text-pink-400 ">Open Source</span> alternative for <span className="font-bold text-white">UI generation tools.</span> Just generate, copy & paste into your production codebase. No overhead - works with your favorite llms <span className="text-base font-semibold tracking-tight">(BYOK)</span>
    </p>
  </div>
  );
};

export default Hero;
