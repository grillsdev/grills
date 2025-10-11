import LoginBtn from "../(chat)/components/login-btn";
import BentoSection from "./components/bento-section";
import Image from "next/image";
import ExampleComponent from "./components/demo-window-component";
import Hero from "./components/hero";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import SupportedPlatform from "./components/supported-platforms";
import WhyGrills from "./components/why-grills";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Page border */}
      <div className="absolute inset-0 border-x border-base-900 pointer-events-none z-[51] max-w-4xl mx-auto"></div>

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Fixed Navbar */}
      <nav
        className="z-[51] bg-black/35 backdrop-blur-lg fixed top-6 md:top-8 left-1/2 transform -translate-x-1/2 border shadow shadow-base-900  rounded-[1.3rem]"
        style={{ width: "calc(100% - 2rem)", maxWidth: "calc(64rem - 15rem)" }}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-[3.2rem]">
            <span className="text-xl text-white font-semibold tracking-wide">
              grills{" "}
              <span className="text-xs text-primary tracking-tighter font-mono">
                beta
              </span>
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/grillsdev/grills"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon">
                  <Github />
                </Button>
              </a>
              <LoginBtn variant="outline" text="Login" size="default" />
            </div>
          </div>
        </div>
      </nav>


      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="min-h-[50rem] w-full relative ml-4 md:ml-0 lg:ml-24">
          {/* Diagonal Grid Background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `linear-gradient(to right, oklch(0.2759 0.0063 203.54) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.2759 0.0063 203.54) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 100% 0%, #000 70%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 100% 100% at 100% 0%, #000 70%, transparent 100%)",
            }}
          />

          {/* Hero Content with proper spacing for fixed navbar */}
          <div className="relative z-10 pt-[7.5rem] md:pt-36  lg:pt-[9.5rem] -ml-4 md:ml-0 lg:-ml-24">
            <Hero />
          </div>
        </div>

        {/* Demo Component with proper spacing */}
        <div className="relative z-10 -mt-96 md:-mt-72 lg:-mt-[22.5rem]">
          <ExampleComponent />
        </div>

        {/* Main Content Sections with improved spacing */}
        <div className="relative z-10 mt-28 md:mt-32 sm:mt-40">
          <div className="space-y-24 sm:space-y-32">
            <BentoSection />
            <SupportedPlatform />
            <WhyGrills/>
          </div>
        </div>

      </section>


      <div className="w-full flex items-center justify-center absolute -bottom-16">
        <Image
          src="/merabharat.png"
          alt="Mera Bharat"
          width={1150}
          height={500}
          className="rounded-lg shadow-lg opacity-25 md:opacity-4"
          priority
        />
      </div>
      <div className="flex flex-col items-center justify-center w-screen pt-20 md:pt-36">
        <footer className="w-full max-w-4xl p-4 text-center rounded-t-2xl shadow border-t py-8 lg:py-6 bg-transparent relative overflow-hidden">
          <p className="relative z-10">
            Need help? Contact us at{" "}
            <a
              href="mailto:support@grills.dev"
              className="text-primary hover:underline font-medium"
            >
              support@grills.dev
            </a>
          </p>
        </footer>
      </div>

    </div>
  );
}