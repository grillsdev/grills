import {
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { IconSend as Send } from "@tabler/icons-react";

import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid } from "uuid";


const UserInput = ({
  handleChatSubmit,
  handleChatInputChange,
  chatInput,
  disable,
}: {
  handleChatSubmit?: () => void;
  handleChatInputChange?: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
  chatInput?: string;
  disable?: boolean;
}) => {
  const [homePageInput, setHomePageInput] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (disable) return;

    
    if (isHomePage) {
      const setId = (uuid as () => string)();
     localStorage.setItem('llm-query-state', JSON.stringify({id:setId, message:homePageInput}));
      router.push(`/c/${setId}?q=new`);
    }
    handleChatSubmit?.();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const handleHomePageInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHomePageInput(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handleSubmit(e).catch(() => console.log("FormEvent Error"));
        }}
        className="relative flex flex-col items-center"
      >
        <Textarea
          className={`w-full pt-3 pb-24 resize-none rounded-4xl border placeholder:text-base-400 max-h-72 no-scrollbar ${
            !isHomePage && "backdrop-blur-3xl"
          }  ${disable && "!cursor-not-allowed"}`}
          placeholder="What is meaning is meaning of life...."
          required={true}
          onChange={
            isHomePage ? handleHomePageInputChange : handleChatInputChange
          }
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            handleKeyDown(e).catch(() => console.log("error while submitting"));
          }}
          value={isHomePage ? homePageInput : chatInput}
          name="userInput"
        />
        <div className="relative flex flex-row items-center justify-center w-full">
          <button
            type="button"
            className="text-xs font-medium px-1 hover:bg-accent/60 absolute left-3 bottom-3"
          >
            Select model{" "}
          </button>
          <div className="absolute left-3 bottom-3">
            {/* <ModelSelectBtn/> */}
          </div>
          <button
            type="submit"
            className="absolute right-3 bottom-3 bg-accent-foreground text-accent p-1.5 rounded-full cursor-pointer"
          >
            <Send width={18.5} height={18.5} />
          </button>
        </div>
      </form>
    </>
  );
};

export { UserInput }
