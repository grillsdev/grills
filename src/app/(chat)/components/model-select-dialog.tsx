"use client";
// add image icon
import { useState, useEffect } from "react";

import { Brain, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { models } from "@/lib/models";
import { $modelObj } from "@/store/store";
import { useStore } from "@nanostores/react";

import type { CurrentModel } from "@/lib/types";
import { LLMProviderIcons } from "@/lib/utils";
import Image from "next/image";

export const ModelSelect = ({
  openWindow,
  handleOpenWindow,
}: {
  openWindow: boolean;
  handleOpenWindow: (state: boolean) => void;
  setCurrentSelectedModel?: (model: CurrentModel) => void;
}) => {
  const currentModel = useStore($modelObj)


  useEffect(() => {
    const getCurrentModel = localStorage.getItem("selected-model");
    if (getCurrentModel) {
      const selectedModel = JSON.parse(getCurrentModel) as CurrentModel;
      $modelObj.set({model: selectedModel})
    }
  }, []);

  const updateCurrentModel = (model: CurrentModel) => {
    const selectedModel = JSON.stringify(model);
    localStorage.setItem("selected-model", selectedModel);
    if (selectedModel) {
      $modelObj.set({model: model})
    }
  };

  if (!models) return null;

  return (
    <Dialog open={openWindow} onOpenChange={handleOpenWindow}>
      <DialogContent className="max-h-[80vh] overflow-y-auto" tabIndex={-1}>
        <DialogHeader className="space-y-3 hidden">
          <DialogTitle className="text-xl font-normal">
            Enter Your API Keys
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <Tabs defaultValue={models[0].title} className="w-full">
            <TabsList className="w-full mb-2 overflow-x-auto">
              {models.map((llm) => (
                <TabsTrigger
                  key={llm.id}
                  value={llm.slug}
                  className="text-xs px-2 py-1 truncate"
                >
                  {llm.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="h-[400px]">
              {models.map((llm) => (
                <TabsContent
                  key={llm.id}
                  value={llm.slug}
                  className="h-[21rem] overflow-auto"
                >
                  <div className="h-[400px] relative">
                    {models.map((llm) => (
                      <TabsContent
                        key={llm.id}
                        value={llm.slug}
                        className="h-[21rem] overflow-auto relative"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 space-y-3 pb-8 relative">
                          {llm.models.map((model) => (
                            <div
                              key={`${model.id}`}
                              role="button"
                              onClick={() => {
                                updateCurrentModel({
                                  id: model.id,
                                  llm: llm.slug,
                                  model: model.slug,
                                  modelTitle: model.title,
                                  isReasoning: model.isReasoning,
                                  isMultiModel:model.isMultiModel
                                });
                                handleOpenWindow(false);
                              }}
                              className={`relative flex flex-col items-center justify-center gap-2 cursor-pointer text-sm w-24 h-28 sm:w-30  border rounded-4xl p-2 ${
                                currentModel?.model?.id === model.id
                                  ? "border-primary"
                                  : ""
                              }`}
                            >
                              <div className="relative">
                                <Image
                                  src={LLMProviderIcons[llm.slug] as ""}
                                  className="rounded-[17px] flex-shrink-0"
                                  width={40}
                                  height={40}
                                  alt={`${llm.title} icon`}
                                />
                              </div>

                              <div className="relative w-full px-1">
                                <h3 className="text-center text-xs font-medium leading-tight line-clamp-2 break-words">
                                  {model.title}
                                </h3>
                                <div className="flex flex-row items-center justify-center gap-1 pt-1.5">
                                  {model.isReasoning && (
                                    <TooltipProvider>
                                      <Tooltip >
                                        <TooltipTrigger asChild>
                                          <div className="w-fit bg-sky-500/35 text-sky-500 rounded-full p-0.5 shadow-sm">
                                            <Brain width={15} height={15} />
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent >
                                          <p>Reasoning is supported</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                {/* {model.isMultiModel && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="w-fit text-rose-400 rounded shadow-sm">
                                          <ImageIcon width={15} height={15} className=""/>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Image input is supported</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )} */}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ModelSelectBtn = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [openWindow, setOpenWindow] = useState(false);
  const currentModel = useStore($modelObj)

  const handleOpenWindow = (state: boolean) => {
    setOpenWindow(state);
  };

  return (
    <>
      <div role="button" onClick={() => handleOpenWindow(true)}>
        {!children ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs font-light bg-accent scroll:border"
          >
            {currentModel.model
              ? currentModel.model?.modelTitle
              : "Select model"}
            <ChevronDown />
          </Button>
        ) : (
          children
        )}
      </div>
      <ModelSelect
        openWindow={openWindow}
        handleOpenWindow={handleOpenWindow}
      />
    </>
  );
};
