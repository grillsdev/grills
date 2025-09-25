import { useState, useEffect, ReactNode } from "react"
import { FileJson2, PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import CopyToClipboard from "./copy-to-clipboard"

interface CodeViewerSidebarProps {
  children: ReactNode
  code: Record<string, string>
  navigateToCode: (codeString: string) => void
  isStreaming: boolean
}

export default function CodeViewerSidebar({ children, code, navigateToCode, isStreaming }: CodeViewerSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<string>("page.tsx")

  const keyValues = Object.keys(code)
  const lastKey = keyValues[keyValues.length - 1]

  // Update active item when streaming new file
  useEffect(() => {
    if (!isStreaming || !lastKey) return
    if (lastKey !== activeItem) {
      setActiveItem(lastKey)
    }
  }, [isStreaming, lastKey, activeItem])

  // Default to page.tsx even on code change 
  useEffect(() => {
    if(isStreaming) return;
    setActiveItem('page.tsx')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleFileClick = (filename: string) => {
    setActiveItem(filename)
    navigateToCode(code[filename])
  }

  // Separate files into app and components
  const appFiles = Object.keys(code).filter(filename => filename === 'page.tsx')
  const componentFiles = Object.keys(code).filter(filename => filename !== 'page.tsx')

  return (
    <div className="relative h-full w-full flex">
      {/* Sidebar */}
      <aside
        className={`h-full bg-card border-r border-border transition-all duration-300 ease-in-out flex-shrink-0 overflow-x-hidden overflow-y-auto ${
          isOpen ? "w-52 translate-x-0" : "w-0 -translate-x-64"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4">
            <nav className="space-y-4">
              {/* App section */}
              {appFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                    app
                  </div>
                  <div className="ml-4 space-y-1">
                    {appFiles.map((filename) => (
                      <button
                        key={filename}
                        onClick={() => handleFileClick(filename)}
                        className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md transition-colors ${
                          activeItem === filename
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        <FileJson2 className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate max-w-[120px]" title={filename}>
                          {filename}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Components section */}
              {componentFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                    components
                  </div>
                  <div className="ml-4 space-y-1">
                    {componentFiles.map((filename) => (
                      <button
                        key={filename}
                        onClick={() => handleFileClick(filename)}
                        className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md transition-colors ${
                          activeItem === filename
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        <FileJson2 className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate max-w-[120px]" title={filename}>
                          {filename}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </aside>

      {/* Toggle button */}
      <Button
        onClick={toggleSidebar}
        variant={"outline"}
        size={"icon"}
        className={`absolute z-50 size-8 bottom-24 left-5 pointer-events-auto`}
        aria-label={isOpen ? "Close file sidebar" : "Open file sidebar"}
      >
        {isOpen ? (
          <PanelRightOpen className="size-4" />
        ) : (
          <PanelLeftOpen className="size-4" />
        )}
      </Button>

      {/* Main content area */}
      <main className="flex-1 min-w-0 h-full overflow-hidden relative z-0 w-full">
        <div className="flex flex-row justify-end px-7 py-3 bg-black  justify-self-end absolute">
          <CopyToClipboard text={code[activeItem]}/>
        </div>
        {children}
      </main>
    </div>
  )
}
