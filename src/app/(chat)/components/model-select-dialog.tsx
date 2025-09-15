"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";

import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getModels } from "@/lib/fetchers";

import type { AvailableModels, CurrentModel } from "@/lib/types";
import { getSelectedModel } from "@/lib/utils";
import { LLMProviderIcons } from "@/lib/utils";
import Image from "next/image";

export const ModelSelect = ({
  openWindow,
  handleOpenWindow,
  setCurrentSelectedModel, //psss the state to the btn for live btn, bcs btn is independent
}: {
  openWindow: boolean;
  handleOpenWindow: (state: boolean) => void;
  setCurrentSelectedModel?: (model: CurrentModel) => void;
}) => {
  const [currentModel, setCurrentModel] = useState<CurrentModel | null>(null);
  const { data: models } = useSWR<AvailableModels[]>(
    `/api/completion/models`,
    getModels
  );

  useEffect(() => {
    const getCurrentModel = localStorage.getItem("selected-model");
    if (getCurrentModel) {
      const selectedModel = JSON.parse(getCurrentModel) as CurrentModel;
      setCurrentModel(selectedModel);
    }
  }, []);

  const updateCurrentModel = (model: CurrentModel) => {
    const selectedModel = JSON.stringify(model);
    localStorage.setItem("selected-model", selectedModel);
    setCurrentModel(model);
    if (setCurrentSelectedModel) {
      setCurrentSelectedModel(model);
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
          <Tabs defaultValue={models[0]?.name} className="w-full">
            <TabsList className="w-full mb-2 overflow-x-auto">
              {models.map((llm) => (
                <TabsTrigger
                  key={llm.id}
                  value={llm.name}
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
                  value={llm.name}
                  className="h-[21rem] overflow-auto"
                >
                  <div className="h-[400px] relative">
                    {models.map((llm) => (
                      <TabsContent
                        key={llm.id}
                        value={llm.name}
                        className="h-[21rem] overflow-auto relative"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 space-y-3 pb-8 relative">
                          {llm.models.map((model) => (
                            <div
                              key={`${model.id}`}
                              role="button"
                              onClick={() => {
                                updateCurrentModel({
                                  llm: llm.name,
                                  model: model.name,
                                  modelTitle: model.title,
                                });
                                handleOpenWindow(false);
                              }}
                              className={`relative flex flex-col items-center justify-center gap-2 cursor-pointer text-sm w-24 h-28 sm:w-30  border rounded-4xl p-2 ${
                                currentModel?.model === model.name
                                  ? "border-primary"
                                  : ""
                              }`}
                            >
                              <div className="relative">
                                <Image
                                  src={LLMProviderIcons[llm.name] as ""}
                                  className="rounded-[18px] flex-shrink-0"
                                  width={45}
                                  height={45}
                                  alt={`${llm.title} icon`}
                                />
                              </div>
                              <div className="relative w-full px-1">
                                <h3 className="text-center text-xs leading-tight line-clamp-2 break-words">
                                  {model.title}
                                </h3>
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
  const [currentSelectedModel, setCurrentSelectedModel] =
    useState<CurrentModel | null>(null);

  useEffect(() => {
    setCurrentSelectedModel(getSelectedModel());
  }, []);

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
            className="text-xs font-light"
          >
            {currentSelectedModel
              ? currentSelectedModel.modelTitle
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
        setCurrentSelectedModel={setCurrentSelectedModel}
      />
    </>
  );
};
