import {
  SandpackProvider,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
import dedent from "dedent";

const CodeViewer = ({ chatId }: { chatId: string }) => {
  const defaultCode = dedent`import React, { useState } from  'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">Hello, World!</h1>
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
    "/App.tsx": defaultCode,
    "/public/index.html": dedent`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Builder</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>`,
  };
  return (
    <SandpackProvider
      key={chatId}
      files={files}
      template="react-ts"
      theme={amethyst}
      options={{
        activeFile: "/App.tsx",
      }}
      customSetup={{
        dependencies: {
          "lucide-react": "latest",
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0",
          react: "^18.2.0",
          "react-dom": "^18.2.0",
          "react-scripts": "^5.0.1",
        },
      }}
    >
      {/* Content Area */}
      {/* <div className="flex-1 min-h-0"> */}
      {/* </div> */}
      <SandpackCodeEditor
        showTabs={false}
        showLineNumbers={true}
        showInlineErrors={true}
        wrapContent={false}
        style={{ height: "calc(100vh - 150px)" }}
        readOnly={true}
        showReadOnly={false}
      />
    </SandpackProvider>
  );
};

export default CodeViewer;
