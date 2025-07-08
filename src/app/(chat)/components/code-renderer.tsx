import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import { AppTsx, ComponentTsx } from "@/lib/sandbox-files";


const CodeRenderer = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-pulse">Initializing preview...</div>
//       </div>
//     );
//   }

  const files = {
    "/App.tsx": AppTsx,
    '/Component.tsx': ComponentTsx,
    "/public/index.html": `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Builder</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
      </html>`,
  };

  return (
    <div className="h-full w-full">
      <SandpackProvider
        template="react-ts"
        theme="light"
        files={files}
        options={{
          activeFile: "/App.tsx",
          visibleFiles: ["/App.tsx", "/public/index.html"],
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        customSetup={{
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            "react-scripts": "^5.0.1",
            "lucide-react": "latest",
          },
        }}
      >
        <SandpackLayout className="">
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
            showNavigator={false}
            style={{
              height: "calc(100vh - 150px)",
              overflow: "hidden",
            }}
            showSandpackErrorOverlay={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeRenderer;
