import {
  useState,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Loader2, Send, Paperclip, X } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  FileUpload,
  FileUploadContent,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

import { toast } from "sonner";

import { ModelSelectBtn } from "./model-select-dialog";
import { getApiKey, convertFilesToDataURLs } from "@/lib/utils";

import { ModelSelect } from "./model-select-dialog";
import { APIKeysDialog } from "./api-keys-dialog";
// import UserTheme from "./theme";
import { useStore } from "@nanostores/react";
import { $modelObj, $userImage } from "@/store/store";

import { v4 as uuid } from "uuid";

const UploadedFileShowcase = ({
  files,
  removeFile,
}: {
  files: File[];
  removeFile: (index: number) => void;
}) => {
  return (
    <>
      {files.length > 0 && (
        <div className="flex flex-row w-full rounded-t-full px-2 py-0.5 overflow-x-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="bg-base-800 flex w-full items-center gap-2 rounded-[10px] text-sm  max-w-[8rem] px-1 m-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <Paperclip className="size-3" />
                <span className="max-w-[80px] truncate text-xs">
                  {file.name}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="rounded-full p-1 cursor-pointer"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

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
  const [files, setFiles] = useState<File[]>([]);

  const [modelDShouldOpen, setModelDShouldOpen] = useState<boolean>(false);
  const [apiDShouldOpen, setApiDShouldOpen] = useState<boolean>(false);
  const [e2bDShouldOpen, setE2bDShouldOpen] = useState(false);

  const pathname = usePathname();
  const route = useRouter();

  const isHomePage = pathname === "/";

  const currentModel = useStore($modelObj);
  const isMultiModel = currentModel?.model?.isMultiModel ?? false;

  useEffect(() => {
    const isMsgStored = localStorage.getItem("llm-query-state");
    if (isMsgStored) {
      const msg = JSON.parse(isMsgStored) as { message: string };
      if (msg.message.trim() === "") return;
      setHomePageInput(msg.message);
    }
  }, []);

  const handleFilesAdded = (newFiles: File[]) => {
    if (files.length >= 3) return;
    // add validation of max 10mb per image
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (disable) return;

    const isModelSelected = $modelObj.get();
    if (!isModelSelected.model) {
      toast.warning("Please Select your model.", {
        position: "top-center",
      });
      setModelDShouldOpen(true);
      return;
    }

    //Api key added of there model Provider
    const isAPIKey = getApiKey(isModelSelected.model.llm);
    if (!isAPIKey) {
      toast.warning(`Please add your ${isModelSelected.model.llm} API key`, {
        position: "top-center",
      });
      setApiDShouldOpen(true);
      return;
    }

    // if E2b API is not present popup with the ?e2b
    const isE2b = localStorage.getItem("grills:e2b");
    if (!isE2b) {
      toast.warning(`Please add your E2B API key`, {
        position: "top-center",
      });
      setE2bDShouldOpen(true);
      return;
    }

    const fileParts =
      files && files.length > 0 ? await convertFilesToDataURLs(files) : [];

    if (isHomePage) {
      const newChatId = `cht-${uuid()}`;
      // save the current user query in local storage and redirect to the chat page with newly created id
      // add the image url also in here
      localStorage.setItem(
        "llm-query-state",
        JSON.stringify({ chatId: newChatId, message: homePageInput, fileParts })
      );
      route.push(`/c/${newChatId}`);
    }
    //if not home page submit the chat and if image added update the userImage
    // if any images then only add the image in the state without encoding
    if (files.length > 0) {
      $userImage.set({ chatId: pathname.split("/")[2], images: files });
    }
    handleChatSubmit?.();
    // empty the file after submition
    setFiles([]);
    $userImage.set({ chatId: "", images: [] });
    //and also remove from the state if any
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
    <FileUpload
      disabled={currentModel.model?.isMultiModel ? false : true}
      onFilesAdded={
        currentModel.model?.isMultiModel ? handleFilesAdded : () => null
      }
      accept=".jpg,.jpeg,.png"
    >
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handleSubmit(e).catch(() => console.log("FormEvent Error"));
        }}
        className="relative flex flex-col items-center"
      >
        {isMultiModel && (
          <div className="absolute z-50 w-full px-2 mx-2 py-[1px]">
            <UploadedFileShowcase files={files} removeFile={removeFile} />
          </div>
        )}

        <Textarea
          className={`w-full ${
            files.length > 0 ? "pt-8" : "pt-3"
          } pb-20 resize-none rounded-4xl border placeholder:text-base-400 placeholder:text-xs placeholder:px-1 max-h-72 no-scrollbar ${
            !isHomePage && "backdrop-blur-3xl"
          }  ${disable && "!cursor-not-allowed"}`}
          placeholder="Build me a dashboard for student attendance management...."
          required={true}
          onChange={
            isHomePage ? handleHomePageInputChange : handleChatInputChange
          }
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            handleKeyDown(e).catch(() => console.log("error while submitting"));
          }}
          value={isHomePage ? homePageInput : chatInput}
          disabled={disable}
          name="userInput"
        />

        <div className="relative flex w-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-row items-center absolute left-3 bottom-1.5 gap-1"
          >
            {isMultiModel && (
              <FileUploadTrigger asChild>
                <div className="bg-accent flex size-7 cursor-pointer items-center justify-center rounded-2xl p-1">
                  <Paperclip className="text-muted-foreground size-4 " />
                </div>
              </FileUploadTrigger>
            )}
            <ModelSelectBtn />
            {/* <UserTheme/> */}
          </div>
          <button
            type="submit"
            disabled={disable}
            className="absolute right-3 bottom-3 bg-accent-foreground text-accent p-1.5 rounded-full cursor-pointer disabled:bg-muted disabled:text-foreground"
          >
            {disable ? (
              <Loader2 width={18.5} height={18.5} className="animate-spin" />
            ) : (
              <Send width={18.5} height={18.5} />
            )}
          </button>
        </div>
      </form>

      {/* File Upload */}
      <FileUploadContent>
        <div className="flex min-h-[200px] w-full items-center justify-center backdrop-blur-sm">
          <div className="m-4 w-full max-w-md rounded-lg border p-8 shadow-lg">
            <div className="mb-4 flex justify-center">
              <svg
                className="text-foreground/90 size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-center text-base font-medium">
              Drop files to upload
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              Release to add files to your message
            </p>
          </div>
        </div>
      </FileUploadContent>

      <ModelSelect
        openWindow={modelDShouldOpen}
        handleOpenWindow={() => setModelDShouldOpen(false)}
      />
      <APIKeysDialog
        openWindow={apiDShouldOpen}
        windowState={setApiDShouldOpen}
      />
      <APIKeysDialog
        openWindow={e2bDShouldOpen}
        windowState={setE2bDShouldOpen}
        defaultTab="sandbox"
      />
    </FileUpload>
  );
};

export { UserInput };
