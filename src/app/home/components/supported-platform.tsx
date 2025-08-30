'use client'

import * as React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const LLMProviderIcons: Record<string, string> = {
  openai: "/chatgpt-icon.svg",
  anthropic: "/anthropic-icon.svg",
  gemini: "/gemini-icon.svg",
  openrouter: "/openrouter.jpeg",
  togetherai: "/togetherai.png",
  groq: "/groq.png",
  grok: "/grok.svg"
}

type Model = {
  name: string
  icon?: string
}

type SupportedLLMsProps = {
  models?: Array<string | Model>
  columns?: number
  className?: string
}

const DEFAULT_MODELS: Model[] = [
  { name: 'OpenAI', icon: LLMProviderIcons.openai },
  { name: 'Open Router', icon: LLMProviderIcons.openrouter },
  { name: 'Gemini', icon: LLMProviderIcons.gemini },
  { name: 'Grok', icon: LLMProviderIcons.grok },
  { name: 'Anthropic', icon: LLMProviderIcons.anthropic }
]

export function SupportedLLMPlatforms({ models = DEFAULT_MODELS, columns = 3, className = '' }: SupportedLLMsProps) {
  // Normalize models to Model[] so callers can pass either strings or objects
  const normalized = React.useMemo(() => (
    (models || []).map(m => {
      if (typeof m === 'string') {
        // Try to find icon based on model name
        const modelKey = m.toLowerCase().replace(/\s+/g, '')
        const icon = LLMProviderIcons[modelKey] || '/favicon.svg'
        return { name: m, icon }
      }
      return m
    })
  ), [models])

  // Duplicate the list for seamless looping
  const doubled = React.useMemo(() => [...normalized, ...normalized], [normalized])

  const cols = React.useMemo(() => Array.from({ length: Math.max(1, columns) }, (_, i) => i), [columns])

  return (
    <section className={'w-full py-10 md:py-14 ' + className} aria-label={'Available LLM platforms'}>
      <div className={'mx-auto max-w-5xl rounded-3xl text-white ring-1 ring-white/10 p-6 sm:p-8 md:p-12 lg:p-16'}>
        <div className={'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14'}>
          <div className={'max-w-xl'}>
            <h2 className={'text-[34px] leading-tight sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight'}>
              {'Choose from various '}<span className={'italic font-serif'}>{'LLM provider platforms.'}</span>
            </h2>
            <p className={'mt-4 text-white/60 font-medium'}>{'A curated set of providers that scale from prototype to production.'}</p>
          </div>

          <div className={'relative'}>
            <div className={'grid grid-cols-2 md:grid-cols-3 gap-6'}>
              {cols.map(colIdx => {
                const isDown = colIdx % 2 === 0
                const duration = 16 + colIdx * 2
                const delay = colIdx * 2

                // Hide extra columns on small screens (mobile-first)
                const hideOnSmall = colIdx >= 2 ? 'hidden md:block' : ''

                return (
                  <div key={colIdx} className={'relative h-80 sm:h-[22rem] overflow-hidden ' + hideOnSmall}>
                    <ul
                      role={'list'}
                      className={'flex flex-col gap-5 items-center'}
                      style={{
                        animationName: isDown ? 'scroll-down' : 'scroll-up',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        animationDuration: duration + 's',
                        animationDelay: '-' + delay + 's'
                      }}
                    >
                      {doubled.map((m, i) => (
                        <li key={colIdx + '-' + i} className={'flex items-center gap-3 font-medium tracking-tight'}>
                          <Avatar className={'h-12 w-12 md:h-14 md:w-14 rounded-[23px] md:rounded-[30px]'}>
                            <AvatarImage src={m.icon || '/favicon.svg'} alt={m.name + ' logo'} />
                            <AvatarFallback>{m.name.split(' ').map(w => w[0]).slice(0,2).join('')}</AvatarFallback>
                          </Avatar>
                        </li>
                      ))}
                    </ul>

                    <div aria-hidden={true} className={'pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/90 to-transparent'} />
                    <div aria-hidden={true} className={'pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent'} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        ul[role='list'] { margin: 0; padding: 0; list-style: none; }
        ul[role='list'] > li { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
      `}</style>
    </section>
  )
}

function SupportedLLMPlatformsSection(props: SupportedLLMsProps) {
  return <SupportedLLMPlatforms {...props} />
}

export default SupportedLLMPlatformsSection