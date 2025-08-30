'use client'

import { OnboardingDialog } from "./components/onboarding-dialog"
import { UserInput } from "./components/user-input"

const Chat = () => {
  return (
    <>
     <div className="flex flex-col min-h-[27rem] justify-center w-full max-w-2xl mx-auto px-4">
      <div className="relative flex flex-col gap-8">
        <h1 className="text-4xl font-semibold text-center ">
          Build & Ship Fast
        </h1>
        <UserInput/>
      </div>
    </div>
    <OnboardingDialog/>
    </>
  )
}

export default Chat