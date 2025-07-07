import React, { useState } from 'react';
import { SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCode2, X, AppWindowMac} from 'lucide-react';
import CopyToClipboard from './copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { amethyst } from "@codesandbox/sandpack-themes";
import dedent from "dedent";


const SandpackUIRenderer = ({changeWindowStateTo}:{changeWindowStateTo: (xtate:boolean)=>void}) => {
  const [activeTab, setActiveTab] = useState('code');

  const defaultCode = dedent`import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1>Hello, World!</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Counter: {count}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  +
                </button>
                <button
                  onClick={() => setCount(count - 1)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  -
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
              {name && (
                <p className="mt-2 text-sm text-gray-600">
                  Hello, {name}! 👋
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  const files = {
    '/App.tsx': defaultCode
  };

  return (
    <div className="w-full h-screen">
      {/* Header with Tabs and Actions */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-auto"
        >
          <TabsList className="h-8 p-0 bg-transparent">
            <TabsTrigger 
              value="code" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border data-[state=active]:border-blue-200 text-xs rounded-[15.5px]"
            >
              <FileCode2 size={16} />
              Code
            </TabsTrigger>
            <TabsTrigger 
              value="render" 
              className="flex items-center gap-1.5 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border data-[state=active]:border-blue-200 text-xs rounded-[15.5px]"
            >
              <AppWindowMac size={16} />
              Render
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center space-x-2">
          <div className="">
            <CopyToClipboard text={defaultCode}/>
          </div>
          <Button
          onClick={()=>changeWindowStateTo(false)}
          variant={"ghost"}
          size={"icon"}>
            <X  />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-full">
        <SandpackProvider
          files={files}
          template="react-ts"
          theme={activeTab === 'code' ? amethyst : 'light'}
          options={{
            activeFile: '/App.tsx',
          }}
          customSetup={{
            dependencies: {
              'lucide-react': 'latest',
              '@types/react': 'latest',
              '@types/react-dom': 'latest'
            }
          }}
        >
          {activeTab === 'code' ? (
            <div className="h-full">
              <SandpackCodeEditor
                showTabs={false}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={false}
                style={{ height: 'calc(100vh - 80px)' }}
              />
            </div>
          ) : (
            <div className="h-full">
              <SandpackPreview
                showNavigator={false}
                showOpenInCodeSandbox={false}
                showRefreshButton={true}
                style={{ height: 'calc(100vh - 80px)' }}
              />
            </div>
          )}
        </SandpackProvider>
      </div>
    </div>
  );
};

export default SandpackUIRenderer;