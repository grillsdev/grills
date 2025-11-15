const WhyGrills = () => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center md:text-balance flex flex-col items-center">
        <h1 className="text-4xl lg:text-5xl font-semibold">
          Why Grills ?
        </h1>
        <p className="text-base text-muted-foreground mt-2 font-semibold max-w-sm">
          With so many UI generators <br className="md:hidden"/>out there why choose Grills.
        </p>
      </div>

      {/* <div className="flex items-center justify-center mt-5 gap-2">
        <div>
          <p className="text-sm relative font-semibold tracking-wide">
            Aditya Pushkar
          </p>
          <p className="text-xs font-medium text-zinc-500 text-center">
            @aditya_pushkar
          </p>
        </div>
      </div> */}

      <div className="pt-10 px-3 md:px-0 mx-auto mt-10 border-t prose prose-invert text-muted-foreground prose-a:font-semibold prose-p:font-semibold prose-p:text-sm border-border">
        <h4>Approach</h4>
        <p>
          Grills builds more beautiful UI components than other platforms
          because we guide the LLM to design them in a highly opinionated way
          with strict instructions. The result is that it generates more
          beautiful and more polished components every single time.
        </p>

        <h4>Stacks Support</h4>
        <p>
          We currently support Next.js with ShadCn right out of the box. Our
          goal though is total flexibility allowing you to mix and match any
          framework and UI library you want. Example Vue with Styled Components or
          Svelte with Tailwind and beyond.
        </p>

        <h4>Cost & Freedom</h4>
        <p>
          Take advantage of (BYOK) No vendor lock in, no wasted spend. Pick the
          best model for each step heavy hitters for complex UI&apos;s, fast and
          cheap models for refactoring, works like magic while generating many
          more UI components at a fraction of what other platforms charges.
        </p>
      </div>
    </div>
  );
};

export default WhyGrills;
