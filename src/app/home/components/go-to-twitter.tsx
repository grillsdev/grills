'use client'

import { Twitter } from "lucide-react"

const GoToTwitter = () => {
  return (
      <a 
      href="https://x.com/aditya_pushkar_"
      target="_blank"
      className="z-50 fixed bottom-5  md:bottom-5 md:right-7 mx-5 md:mx-0 px-3 py-1.5 rounded-full bg-base-900/95 shadow-lg hover:underline border transition-colors duration-200 text-xs font-medium flex items-center gap-1">
        <Twitter width={18}/> aditya_pushkar
      </a>
  )
}

export default GoToTwitter