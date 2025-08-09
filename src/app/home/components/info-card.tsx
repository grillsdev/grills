interface InfoCardProps {
  title?: string
  text?: string
  className?: string
}

export default function InfoCard({
  text = "Bring Your Own Key helps you save money since you’re only paying for what you use directly, with no added markup or hidden fees. It’s a smarter, more transparent way to build.",
  className = "",
}: InfoCardProps) {
  const style: React.CSSProperties = {
    backgroundImage: [
      // Grain layer A (fine speckles)
      "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.02) 0deg 8deg, rgba(0,0,0,0) 8deg 16deg)",
      // Grain layer B (subtle dots)
      "repeating-radial-gradient(circle at 20% 30%, rgba(255,255,255,0.03) 0 1.5px, rgba(0,0,0,0) 1.5px 3px)",
      // Warm highlight sweep
      "linear-gradient(120deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, rgba(255,210,160,0.08) 60%, rgba(0,0,0,0.6) 100%)",
      // Warm wavy shading
      "conic-gradient(from 200deg at 60% 40%, rgba(255,180,110,0.12), rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.35) 70%, rgba(255,190,120,0.08) 100%)",
      // Base orange glow
      "radial-gradient(120% 180% at 70% 60%, #f59e0b 0%, #c2410c 35%, #1a0d05 70%, #0a0705 100%)",
    ].join(", "),
    backgroundBlendMode: "overlay, overlay, overlay, soft-light, normal",
    backgroundSize: "auto, 6px 6px, cover, cover, cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat, repeat, no-repeat, no-repeat, no-repeat",
  }

  return (
    <section
      aria-label="save-title"
      className={[
        "relative w-full overflow-hidden",
        "bg-black", // fallback
        "aspect-[5/4] sm:aspect-[4/3] lg:aspect-[16/10]",
        className,
      ].join(" ")}
      style={style}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />

      {/* Centered body text */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <p className="max-w-3xl text-center text-base font-medium sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  )
}
