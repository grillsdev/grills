/**
 * A dialog component for saving and creating themes with compact color picker.
 * Built using ShadCN UI Dialog and Sheet components.
 */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

interface Theme {
  id: string; // Unique identifier for the theme
  name: string; // Name of the theme
  color: string; // Color of the theme
  theme: string; // Theme data
}

interface ThemeDialogProps {
  savedThemes: Theme[]; // Array of saved theme objects
  onCreateTheme: (newTheme: Theme) => void; // Function to handle creating a new theme
}

/**
 * Dialog component for managing saved themes and creating new themes
 */
export function ThemeDialog({ savedThemes, onCreateTheme }: ThemeDialogProps) {
  const [open, setOpen] = useState(false); // State to manage dialog open/close
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null); // State to track selected theme
  const [sheetOpen, setSheetOpen] = useState(false); // State to manage sheet open/close
  const [newTheme, setNewTheme] = useState<Theme>({ id: "", name: "", color: "#000000", theme: "" }); // State for new theme data

  // Load selected theme from local storage on mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem("selectedThemeId");
    if (savedThemeId) {
      setSelectedThemeId(savedThemeId);
    }
  }, []);

  // Handle theme selection
  const handleThemeSelect = (theme: Theme) => {
    setSelectedThemeId(theme.id);
    localStorage.setItem("selectedThemeId", theme.id); // Save selected theme ID to local storage
  };

  // Handle new theme creation
  const handleCreateTheme = () => {
    setSheetOpen(true);
  };

  const handleSaveTheme = () => {
    const newThemeWithId = { ...newTheme, id: Date.now().toString() }; // Generate a unique ID
    onCreateTheme(newThemeWithId);
    setSheetOpen(false);
    setNewTheme({ id: "", name: "", color: "#000000", theme: "" }); // Reset new theme state
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Open Theme Dialog</Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={handleCreateTheme} className="ml-auto">
            Create Theme
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {savedThemes.map((theme) => (
            <Button
              key={theme.id}
              variant="outline"
              size="sm"
              className={`flex items-center justify-start ${selectedThemeId === theme.id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => handleThemeSelect(theme)}
            >
              <span
                className="inline-block w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: theme.color }}
              />
              {theme.name}
            </Button>
          ))}
        </div>
      </DialogContent>

      {/* Sheet for creating a new theme */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="hidden">Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-4">
          <SheetHeader>
            <SheetTitle>Create New Theme</SheetTitle>
            <SheetDescription>Fill in the details for your new theme.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 mt-4">
            <div>
              <Label htmlFor="theme-name">Theme Name</Label>
              <input
                id="theme-name"
                type="text"
                placeholder="Theme Name"
                value={newTheme.name}
                onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="theme-color">Select Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="theme-color"
                  type="color"
                  value={newTheme.color}
                  onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
                  className="w-8 h-8 rounded-full border-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">{newTheme.color}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="theme-data">Theme Data</Label>
              <textarea
                id="theme-data"
                placeholder="Paste your theme data"
                value={newTheme.theme}
                onChange={(e) => setNewTheme({ ...newTheme, theme: e.target.value })}
                className="border p-2 rounded w-full"
                rows={4}
              />
            </div>
          </div>
          <SheetFooter className="mt-6">
            <Button variant="outline" onClick={handleSaveTheme}>Save Theme</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Dialog>
  )
}

/**
 * Wrapper component demonstrating the ThemeDialog usage
 */
function ThemeDialogSection() {
  const [savedThemes, setSavedThemes] = useState<Theme[]>([
    { id: "1", name: "Dark Mode", color: "#000000", theme: "" },
    { id: "2", name: "Light Mode", color: "#FFFFFF", theme: "" },
    { id: "3", name: "Ocean Breeze", color: "#00BFFF", theme: "" },
    { id: "4", name: "Sunset", color: "#FF4500", theme: "" },
    { id: "5", name: "Forest Green", color: "#228B22", theme: "" },
    { id: "6", name: "Lavender", color: "#E6E6FA", theme: "" },
    { id: "7", name: "Coral", color: "#FF7F50", theme: "" },
    { id: "8", name: "Steel Blue", color: "#4682B4", theme: "" },
    { id: "9", name: "Goldenrod", color: "#DAA520", theme: "" },
    { id: "10", name: "Slate Gray", color: "#708090", theme: "" },
    { id: "11", name: "Tomato", color: "#FF6347", theme: "" },
    { id: "12", name: "Medium Orchid", color: "#BA55D3", theme: "" },
  ]);

  const handleCreateTheme = (newTheme: Theme) => {
    setSavedThemes((prev) => [...prev, newTheme]); // Add new theme to the list
  };

  return (
    <div className="p-4">
      <ThemeDialog savedThemes={savedThemes} onCreateTheme={handleCreateTheme} />
    </div>
  )
}

export default ThemeDialogSection


export const prompt = `
in sheet there si Select Color; add thitle to the Color inpit "Preview Color" after seectig the color it shoul...
in sheet there si Select Color; add thitle to the Color inpit "Preview Color" after seectig the color it should shown below that title /**

A dialog component for saving and creating themes.
Built using ShadCN UI Dialog component. */ import { Dialog, DialogTrigger, DialogContent, DialogOverlay, } from "@/components/ui/dialog" import { Button } from "@/components/ui/button" import { useState, useEffect } from "react"; import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, } from "@/components/ui/sheet";
interface Theme { id: string; // Unique identifier for the theme name: string; // Name of the theme color: string; // Color of the theme theme: string; // Theme data }

interface ThemeDialogProps { savedThemes: Theme[]; // Array of saved theme objects onCreateTheme: (newTheme: Theme) => void; // Function to handle creating a new theme }

/**

Dialog component for managing saved themes and creating new themes */ export function ThemeDialog({ savedThemes, onCreateTheme }: ThemeDialogProps) { const [open, setOpen] = useState(false); // State to manage dialog open/close const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null); // State to track selected theme const [sheetOpen, setSheetOpen] = useState(false); // State to manage sheet open/close const [newTheme, setNewTheme] = useState<Theme>({ id: "", name: "", color: "", theme: "" }); // State for new theme data
// Load selected theme from local storage on mount useEffect(() => { const savedThemeId = localStorage.getItem("selectedThemeId"); if (savedThemeId) { setSelectedThemeId(savedThemeId); } }, []);

// Handle theme selection const handleThemeSelect = (theme: Theme) => { setSelectedThemeId(theme.id); localStorage.setItem("selectedThemeId", theme.id); // Save selected theme ID to local storage };

// Handle new theme creation const handleCreateTheme = () => { setSheetOpen(true); };

const handleSaveTheme = () => { const newThemeWithId = { ...newTheme, id: Date.now().toString() }; // Generate a unique ID onCreateTheme(newThemeWithId); setSheetOpen(false); setNewTheme({ id: "", name: "", color: "", theme: "" }); // Reset new theme state };

return ( <Dialog open={open} onOpenChange={setOpen}> <DialogTrigger asChild> <Button variant="default">Open Theme Dialog</Button> </DialogTrigger> <DialogOverlay /> <DialogContent className="p-4"> <div className="flex justify-between items-center mb-4"> <Button variant="outline" size="sm" onClick={handleCreateTheme} className="ml-auto"> Create Theme </Button> </div> <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"> {savedThemes.map((theme) => ( <Button key={theme.id} variant="outline" size="sm" className={flex items-center justify-start ${selectedThemeId === theme.id ? 'border-2 border-blue-500' : ''}} onClick={() => handleThemeSelect(theme)} > <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: theme.color }} /> {theme.name} </Button> ))} </div> </DialogContent>

  {/* Sheet for creating a new theme */}
  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
    <SheetTrigger asChild>
      <Button variant="ghost" className="hidden">Open Sheet</Button>
    </SheetTrigger>
    <SheetContent side="right" className="p-4">
      <SheetHeader>
        <SheetTitle>Create New Theme</SheetTitle>
        <SheetDescription>Fill in the details for your new theme.</SheetDescription>
      </SheetHeader>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Theme Name"
          value={newTheme.name}
          onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="color"
          value={newTheme.color}
          onChange={(e) => setNewTheme({ ...newTheme, color: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Paste your theme data"
          value={newTheme.theme}
          onChange={(e) => setNewTheme({ ...newTheme, theme: e.target.value })}
          className="border p-2 rounded"
          rows={4}
        />
      </div>
      <SheetFooter>
        <Button variant="outline" onClick={handleSaveTheme}>Save</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</Dialog>
) }

/**

Wrapper component demonstrating the ThemeDialog usage */ function ThemeDialogSection() { const [savedThemes, setSavedThemes] = useState<Theme[]>([ { id: "1", name: "Dark Mode", color: "#000000", theme: "" }, { id: "2", name: "Light Mode", color: "#FFFFFF", theme: "" }, { id: "3", name: "Ocean Breeze", color: "#00BFFF", theme: "" }, { id: "4", name: "Sunset", color: "#FF4500", theme: "" }, { id: "5", name: "Forest Green", color: "#228B22", theme: "" }, { id: "6", name: "Lavender", color: "#E6E6FA", theme: "" }, { id: "7", name: "Coral", color: "#FF7F50", theme: "" }, { id: "8", name: "Steel Blue", color: "#4682B4", theme: "" }, { id: "9", name: "Goldenrod", color: "#DAA520", theme: "" }, { id: "10", name: "Slate Gray", color: "#708090", theme: "" }, { id: "11", name: "Tomato", color: "#FF6347", theme: "" }, { id: "12", name: "Medium Orchid", color: "#BA55D3", theme: "" }, ]);
const handleCreateTheme = (newTheme: Theme) => { setSavedThemes((prev) => [...prev, newTheme]); // Add new theme to the list };

return ( <div className="p-4"> <ThemeDialog savedThemes={savedThemes} onCreateTheme={handleCreateTheme} /> </div> ) }

export default ThemeDialogSection
`