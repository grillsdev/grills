'use client'

import { useState } from "react"
import Image from "next/image"

const GeneratedComponentCode = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative w-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="block h-6 w-6 rounded-full border-2 border-dotted border-green-500 animate-spin -mt-10 md:-mt-0"></div>
        </div>
      )}

      <Image
        src="/example-component-tsx.svg"
        width={1000}
        height={700}
        quality={100}
        alt="generated-code"
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}

export default GeneratedComponentCode
