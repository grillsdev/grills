import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, UserPlus } from "lucide-react";

const StartProjectDialog = ({
  openWindow,
  windowState,
}: {
  openWindow: boolean;
  windowState: (state: boolean) => void;
}) => {
  const [projectName, setProjectName] = useState("");
  const [isIndividualProject, setIsIndividualProject] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [addedUsers, setAddedUsers] = useState<string[]>([]);

  const handleToggleProjectType = () => {
    setIsIndividualProject(!isIndividualProject);
    if (isIndividualProject) {
      // If switching to individual, clear added users
      setAddedUsers([]);
      setUserInput("");
    }
  };

  const handleAddUser = () => {
    if (userInput.trim() && addedUsers.length < 4 && !addedUsers.includes(userInput.trim())) {
      setAddedUsers([...addedUsers, userInput.trim()]);
      setUserInput("");
    }
  };

  const handleRemoveUser = (userToRemove: string) => {
    setAddedUsers(addedUsers.filter(user => user !== userToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUser();
    }
  };

  const handleCreateProject = () => {
    // Mock project creation logic
    const projectData = {
      name: projectName,
      type: isIndividualProject ? 'individual' : 'collaborative',
      collaborators: addedUsers
    };
    
    console.log('Creating project:', projectData);
    
    // Reset form
    setProjectName("");
    setIsIndividualProject(true);
    setAddedUsers([]);
    setUserInput("");
    
    // Close dialog
    windowState(false);
  };

  const isFormValid = projectName.trim().length > 0;

  return (
    <Dialog open={openWindow} onOpenChange={windowState}>
      <DialogContent className="sm:max-w-md" tabIndex={-1}>
        
        
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-normal">
            Create Your Project
          </DialogTitle>
          <DialogDescription>
            Set up a new project and invite collaborators if needed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-3">
          {/* Project Name Input */}
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Project Name
            </label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full"
            />
          </div>

          {/* Project Type Toggle */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Project Type</label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleToggleProjectType}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  isIndividualProject
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isIndividualProject ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {isIndividualProject && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
                <span className="text-sm">Individual Project</span>
              </button>
              
              <button
                type="button"
                onClick={handleToggleProjectType}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border transition-colors ${
                  !isIndividualProject
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  !isIndividualProject ? 'border-blue-500' : 'border-gray-300'
                }`}>
                  {!isIndividualProject && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
                <span className="text-sm">Project with Friends</span>
              </button>
            </div>
          </div>

          {/* Collaborators Section - Only shown when "Project with Friends" is selected */}
          {!isIndividualProject && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Add Collaborators
                </label>
                <span className="text-xs text-gray-500">
                  {addedUsers.length}/4 users added
                </span>
              </div>

              {/* User Input */}
              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter username or email"
                  className="flex-1"
                  disabled={addedUsers.length >= 4}
                />
                <Button
                  type="button"
                  onClick={handleAddUser}
                  disabled={!userInput.trim() || addedUsers.length >= 4 || addedUsers.includes(userInput.trim())}
                  size="sm"
                  className="px-3"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>

              {/* Added Users Display */}
              {addedUsers.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-gray-600">Added Users:</span>
                  <div className="flex flex-wrap gap-2">
                    {addedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                      >
                        <span>{user}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(user)}
                          className="hover:bg-blue-100 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleCreateProject}
              disabled={!isFormValid}
              className="px-6"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const StartProjectDialogBtn = ({ children }: { children: ReactNode }) => {
  const [openDialogWindow, setOpenDialogWindow] = useState(false);

  const handleDialogWindowState = (state: boolean) => {
    setOpenDialogWindow(state);
  };

  return (
    <>
      <div role="button" onClick={() => handleDialogWindowState(true)}>
        {children}
      </div>
      <StartProjectDialog
        openWindow={openDialogWindow}
        windowState={handleDialogWindowState}
      />
    </>
  );
};
