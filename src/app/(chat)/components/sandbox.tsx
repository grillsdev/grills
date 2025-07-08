'use client';

import { useState, useEffect, Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCode2, X, AppWindowMac, Loader2 } from 'lucide-react';
import CopyToClipboard from './copy-to-clipboard';
import { Button } from '@/components/ui/button';
import CodeViewer from './code-viewer';
import CodeRenderer from './code-renderer';

const Sandbox = ({
  changeWindowStateTo,
  chatId
}: {
  changeWindowStateTo: (state: boolean) => void;
  chatId: string; 
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'render'>('code');
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [previewKey, setPreviewKey] = useState(1);

  useEffect(() => {
    if (activeTab === 'render') {
      setIsPreviewReady(false);
      const timer = setTimeout(() => {
        setIsPreviewReady(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsPreviewReady(false);
    }
  }, [activeTab]);

  const handleTabChange = (value: 'code' | 'render') => {
    setActiveTab(value);
    if (value === 'render') {
      setPreviewKey(prev => prev + 1);
      // setIsPreviewReady(false);
    }
  };


  return (
      <div className="flex h-screen w-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              handleTabChange(value as 'code' | 'render')
            }
            className="w-auto"
          >
            <TabsList className="h-8 p-0 veteran bg-transparent">
              <TabsTrigger
                value="code"
                className="flex items-center gap-2 rounded-[15.5px] text-xs data-[state=active]:border data-[state=active]:border-blue-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <FileCode2 size={16} />
                Code
              </TabsTrigger>
              <TabsTrigger
                value="render"
                className="flex items-center gap-1.5 rounded-[15.5px] text-xs data-[state=active]:border data-[state=active]:border-blue-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <AppWindowMac size={16} />
                Render
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <CopyToClipboard text={""} />
            <Button
              onClick={() => changeWindowStateTo(false)}
              variant="ghost"
              size="icon"
              className="text-xs text-base-100"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 overflow-auto relative ">
          {activeTab === 'code' ? (
            <div key="code-viewer" className="h-full overflow-hidden">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse">Loading code viewer...</div>
                </div>
              }>
                <CodeViewer chatId={chatId}/>
              </Suspense>
            </div>
          ) : (
            <div key={`preview-${previewKey}`} className="h-full">
              {!isPreviewReady ? (
                <div className="flex items-center justify-center h-full bg-base-300">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Loader2 className="h-7 w-7 animate-spin text-green-500 -mt-16" />
                    <p className="text-black text-xs">Be ready</p>
                  </div>
                </div>
              ) : (
                <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse">Loading renderer...</div>
                  </div>
                }>
                  <CodeRenderer />
                </Suspense>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default Sandbox

