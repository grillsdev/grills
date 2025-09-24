import { useState, useEffect, ReactNode } from "react"
import { ChevronDown, FileJson2, PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeViewerSidebarProps {
  children: ReactNode
  code: Record<string, string>
  navigateToCode: (codeString:string) => void
  isStreaming: boolean
}

export default function CodeViewerSidebar({ children, code, navigateToCode, isStreaming}: CodeViewerSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["app", "components"]))

  const keyValues = Object.keys(code);
  const lastKey = keyValues[keyValues.length - 1]

  const [activeItem, setActiveItem] = useState<string>("page-tsx")

  // it is nessassary to change active collar on changing file for btter user experience 
  useEffect(()=>{
    if(!isStreaming) return;
    if(!lastKey) return;
    if(lastKey!==activeItem){
      setActiveItem(lastKey.replace('.', '-'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isStreaming, lastKey])

  // Generate sidebar navigation from code object
  const generateSidebarNav = (code: Record<string, string>) => {
    const appChildren: string[] = []
    const componentChildren: string[] = []

    Object.keys(code).forEach((filename) => {
      if (filename === 'page.tsx') {
        appChildren.push(filename)
      } else {
        componentChildren.push(filename)
      }
    })

    return { appChildren, componentChildren }
  }

  const { appChildren, componentChildren } = generateSidebarNav(code)

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        newSet.add(groupId)
      }
      return newSet
    })
  }

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Always default to page.tsx
  useEffect(() => {
    setActiveItem('page-tsx')
  }, [])

  return (
    <div className="relative h-full w-full flex">
      {/* Sidebar scoped to this container */}
      <aside
        className={`h-full bg-card border-r border-border transition-all duration-300 ease-in-out flex-shrink-0 overflow-x-hidden overflow-y-auto ${
          isOpen ? "w-52 translate-x-0" : "w-0 -translate-x-64"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4">
            <nav className="space-y-1">
              {/* App section */}
              {appChildren.length > 0 && (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleGroup("app")}
                    className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors cursor-pointer"
                  >
                    <span>app</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedGroups.has("app") ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedGroups.has("app") && (
                    <div className="ml-4 mt-1 space-y-1">
                      {appChildren.map((filename) => (
                        <button
                          key={filename}
                          onClick={() => {
                            setActiveItem(filename.replace('.', '-'))
                            navigateToCode(code[filename])
                          }}
                          className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md transition-colors ${
                            activeItem === filename.replace('.', '-')
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
                  )}
                </div>
              )}

              {/* Components section */}
              {componentChildren.length > 0 && (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleGroup("components")}
                    className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors cursor-pointer"
                  >
                    <span>components</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedGroups.has("components") ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedGroups.has("components") && (
                    <div className="ml-4 mt-1 space-y-1">
                      {componentChildren.map((filename) => (
                        <button
                          key={filename}
                          onClick={() => {
                            setActiveItem(filename.replace('.', '-'))
                            navigateToCode(code[filename])
                          }}
                          className={`flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md transition-colors ${
                            activeItem === filename.replace('.', '-')
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
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      </aside>

      {/* Toggle button scoped to this container (always visible) */}
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
      <main className="flex-1 min-w-0 h-full overflow-hidden relative z-0">
        {children}
      </main>
    </div>
  )
}