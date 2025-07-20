import { useState, Suspense, useEffect, useCallback} from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCode2, X, AppWindowMac, Loader2} from 'lucide-react';
import CopyToClipboard from './copy-to-clipboard';
import { Button } from '@/components/ui/button';

import dynamic from "next/dynamic";
import { $sanboxObj } from '@/store/sandbox';
import {useStore} from "@nanostores/react"


const CodeRunner = dynamic(() => import("./code-renderer"), {
  ssr: false,
});

const SyntaxHighlighter = dynamic(
  () => import("./code-viewer"),
  {
    ssr: false,
  },
);

const Sandbox = ({
  changeWindowStateTo,
}: {
  changeWindowStateTo: (state: boolean) => void;
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'render'>('code');
  const [previewKey, setPreviewKey] = useState(1);
  const [currentCode, setCurrentCode] = useState<{code:string, pkg:string[]}>({code:"", pkg:[]})
  const [isCodeStreaming, setIsCodeStreaming] = useState(false)
  const newSandboxObj = useStore($sanboxObj)


  // neccessary for the rendering of the code and ui on btn cick
  //this will force rerender if the current stored the same code
  useEffect(()=>{
    if (newSandboxObj?.type) {
    setCurrentCode({code: newSandboxObj.code, pkg:newSandboxObj.pkg || []});
  }
  },[newSandboxObj])


 const handleTabChange = useCallback((value: 'code' | 'render') => {
    setActiveTab(value);
    if (value === 'render') {
      setPreviewKey(prev => prev + 1);
    }
  }, []);

  // Handle sandbox object changes with proper cleanup
  useEffect(() => {
    const unsubscribe = $sanboxObj.listen((sandbox, oldSandbox) => {
      if (!sandbox) return;

      if (sandbox['isStreaming'] && oldSandbox['isStreaming']) {
        setIsCodeStreaming(prev => {
          if (!prev) {
            handleTabChange('code');
            return true;
          }
          return prev;
        });
        setCurrentCode({code: newSandboxObj.code, pkg:newSandboxObj.pkg || []});
        return;
      }

      if (!sandbox['isStreaming'] && oldSandbox['isStreaming']) {
        setIsCodeStreaming(false);
        handleTabChange('render');
        return;
      }
    });

    return unsubscribe;
  }, [handleTabChange, newSandboxObj.code, newSandboxObj.pkg]);


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
                disabled={isCodeStreaming}
                className="flex items-center gap-1.5 rounded-[15.5px] text-xs data-[state=active]:border data-[state=active]:border-blue-200 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
              >
                <AppWindowMac size={16} />
                Render
                {isCodeStreaming&&(<Loader2 className='text-green-500 animate-spin'/>)}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center space-x-2">
            <CopyToClipboard text={currentCode.code} />
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
            <div className="h-full overflow-x-auto">
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-pulse">Loading code viewer...</div>
                </div>
              }>
                <SyntaxHighlighter code={currentCode.code}/>
              </Suspense>
            </div>
          ) : (
            <div key={`preview-${previewKey}`} className="h-full">
              <Suspense fallback={
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse">Loading renderer...</div>
                  </div>
                }>
                  <CodeRunner code={currentCode.code} pkg={currentCode.pkg}/>
                </Suspense>
            </div>
          )}
        </div>
      </div>
  );
};

export default Sandbox
