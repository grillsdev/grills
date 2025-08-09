"use client"

import * as React from "react"

type SupportedLLMsProps = {
  models?: string[]
  columns?: number
  className?: string
}

const DEFAULT_MODELS = [
  "GPT 5",
  "GPT 5 Mini",
  "GPT 5 Nano",
  "G 2.5 Pro",
  "G 2.5 Flash",
  "G 2.5 Flash Lite",
  "G 2.0 Flash",
  "Opus 4",
  "Sonnet 4",
  "3.7 Sonnet",
  "3.5 Sonnet",
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
  "G 2.5 Pro",
  "G 2.5 Flash",
  "G 2.5 Flash Lite",
  "G 2.0 Flash",
  "Opus 4",
  "Sonnet 4",
  "3.7 Sonnet",
  "3.5 Sonnet",
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


export function SupportedLLMs({ models = DEFAULT_MODELS, columns = 3, className = "" }: SupportedLLMsProps) {
  // Duplicate the models list for seamless looping
  const doubled = React.useMemo(() => [...models, ...models], [models])
  const cols = React.useMemo(() => Array.from({ length: Math.max(1, columns) }, (_, i) => i), [columns])

  return (
    <section className={["w-full py-10 md:py-14", className].join(" ")}>
      <div className="mx-auto max-w-5xl rounded-3xl bg-black text-white ring-1 ring-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 p-6 sm:p-8 md:p-12 lg:p-16">
          {/* Left: Heading */}
          <div className="max-w-xl">
            <h2 className="text-[34px] leading-tight sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight">
              {"Build your interface "}
              <span className="italic font-serif">{"with the smartest LLMs"}</span>
            </h2>
            <p className="mt-4 text-white/60 font-medium">
              {"A curated set of providers that scale from prototype to production."}
            </p>
          </div>

          {/* Right: Vertical snake marquee */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {cols.map((colIdx) => {
                const isDown = colIdx % 2 === 0 // snake pattern: even cols go down, odd go up
                const duration = 16 + colIdx * 2 // slight variance per column
                const delay = colIdx * 2

                return (
                  <div
                    key={colIdx}
                    className={[
                      "relative h-80 sm:h-[22rem] overflow-hidden",
                      colIdx >= 2 ? "hidden md:block" : "",
                    ].join(" ")}
                  >
                    {/* Fade masks */}

                    <ul
                      className={[
                        "flex flex-col gap-3 text-sm text-gray-300",
                        isDown ? "marquee-down" : "marquee-up",
                      ].join(" ")}
                      style={{
                        animationDuration: `${duration}s`,
                        animationDelay: `-${delay}s`,
                      }}
                    >
                       {doubled.map((name, i) => (
                        <li key={`${colIdx}-${i}`} className="flex items-center gap-2 font-medium tracking-tight">
                          <span className="text-white/40 font-bold text-base">{"•"}</span>
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        @keyframes scroll-down {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .marquee-up {
          will-change: transform;
          animation-name: scroll-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-down {
          will-change: transform;
          animation-name: scroll-down;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  )
}

export default SupportedLLMs
