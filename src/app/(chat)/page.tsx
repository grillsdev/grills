'use client'


import { UserInput } from "./components/user-input"

const Chat = () => {
  return (
    <div className="flex flex-col min-h-[27rem] justify-center w-full max-w-2xl mx-auto px-4">
      <div className="relative flex flex-col gap-7">
        <h1 className="text-4xl  font-semibold md:font-medium text-left md:text-center tracking-wide ">
          Build Collaborate and ship
        </h1>
        <UserInput/>
      </div>
    </div>
  )
}

export default Chat