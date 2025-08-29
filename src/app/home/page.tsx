import LoginBtn from "../(chat)/components/login-btn";
import BentoSection from "./components/bento-section";
import GoToTwitter from "./components/go-to-twitter";
import ExampleComponent from "./components/demo-window-component";
import Hero from "./components/hero";
import InfoCard from "./components/info-card";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen  overflow-hidden">
      {/* Subtle Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="w-full z-50 backdrop-blur-xl  border-b fixed">
        <div className="mx-auto w-full px-5 sm:px-5 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo with dot pattern */}
            <div className="flex flex-row  justify-center">
              <span className="text-xl tracking-wider italic font-medium text-white">
                grills{" "}
                <span className="text-xs text-primary tracking-tighter">
                  beta
                </span>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-3 ">
              <a href="https://github.com/grillsdev/grills" target="_blank">
              <Button variant={"outline"} size={"icon"}><Github/></Button>
              </a>
                <LoginBtn variant="outline" text="Login" size="default" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Full width background container */}
      <div className="min-h-[45rem] w-full relative">
        {/* Diagonal Fade Grid Background - Full Width */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, oklch(0.5536 0.0082 202.85) 1px, transparent 1px),
        linear-gradient(to bottom, oklch(0.5536 0.0082 202.85) 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          }}
        />

        {/* Content container - centered with max width */}
        <div className="w-full max-w-4xl 3xl:max-w-6xl mx-auto relative z-10 pt-20 pb-16 px-5">
          <Hero />
        </div>
      </div>
      <div className="w-full max-w-4xl 3xl:max-w-6xl z-40 -mt-72 px-4">
        <ExampleComponent />
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-16 md:px-3 mt-24 pb-16 flex flex-col items-center">

        <BentoSection />

        <div className="w-full max-w-[60.5rem] px-4  md:px-0 mt-12 md:mt-16">
        <InfoCard className="h-[20rem] lg:h-[23rem] rounded-[1rem]" />
        </div>
      </div>

      <GoToTwitter />
    </div>
  );
}
