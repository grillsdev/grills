export const compDetail = `

==============================================
// Button
==============================================
import { Button } from "@/components/ui/button"

// Components and their purposes:
// - Button: A clickable button component with multiple variants and sizes

// Props:
// - variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' - Visual style of the button
// - size: 'default' | 'sm' | 'lg' | 'icon' - Size of the button
// - asChild: boolean - Renders as child component
// - isLoading: boolean - Shows loading state
// - disabled: boolean - Disables the button
// - type: 'button' | 'submit' | 'reset' - Button type attribute
// - All standard HTML button props are supported

==============================================
// Accordion
==============================================
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion"

// Components and their purposes:
// - Accordion: Root component that manages the accordion state
// - AccordionItem: Container for each collapsible section
// - AccordionTrigger: Clickable header that toggles the content
// - AccordionContent: Collapsible content section

// Accordion Props:
// - type: 'single' | 'multiple' - Single or multiple items can be open
// - collapsible: boolean - Allow all items to be closed
// - value: string | string[] - Controlled state for open items
// - defaultValue: string | string[] - Default open item(s)
// - onValueChange: (value: string | string[]) => void - Callback when open items change

// AccordionItem Props:
// - value: string - Unique value for the item (required)
// - className: string - Additional CSS classes
// - disabled: boolean - Disables the accordion item

// AccordionTrigger Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes
// - disabled: boolean - Disables the trigger

// AccordionContent Props:
// - className: string - Additional CSS classes
// - forceMount: boolean - Force mounting when more control is needed

==============================================
// Tooltip
==============================================
import { 
  Tooltip, 
  TooltipTrigger, 
  TooltipContent, 
  TooltipProvider 
} from "@/components/ui/tooltip"

// Components and their purposes:
// - TooltipProvider: Required context provider for tooltips
// - Tooltip: Root component that manages the tooltip state
// - TooltipTrigger: The element that triggers the tooltip on hover/focus
// - TooltipContent: The content displayed in the tooltip

// TooltipProvider Props:
// - delayDuration: number - Delay before showing/hiding (ms, default: 300)
// - skipDelayDuration: number - Delay before showing/hiding when moving between elements (ms, default: 300)
// - disableHoverableContent: boolean - Disable hoverable content (default: false)

// Tooltip Props:
// - defaultOpen: boolean - Initial open state
// - open: boolean - Controlled open state
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - delayDuration: number - Override the provider's delay duration
// - disableHoverableContent: boolean - Override the provider's setting

// TooltipTrigger Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// TooltipContent Props:
// - side: 'top' | 'right' | 'bottom' | 'left' - Tooltip side relative to trigger (default: 'top')
// - sideOffset: number - Distance from the trigger (default: 4)
// - align: 'start' | 'center' | 'end' - Tooltip alignment (default: 'center')
// - alignOffset: number - Alignment offset (default: 0)
// - avoidCollisions: boolean - Prevent collision with viewport edges (default: true)
// - collisionPadding: number | { top, right, bottom, left } - Padding for collision detection
// - sticky: 'partial' | 'always' - How the content sticks to the trigger (default: 'partial')
// - hideWhenDetached: boolean - Hide when the reference element is detached (default: false)
// - className: string - Additional CSS classes

==============================================
// Alert
==============================================
import { Alert, AlertTitle, AlertDescription, AlertIcon } from "@/components/ui/alert"

// Components and their purposes:
// - Alert: Container for alert messages with different variants
// - AlertTitle: Bold title text for the alert
// - AlertDescription: Secondary text with additional details
// - AlertIcon: Visual indicator that matches the alert variant

// Alert Props:
// - variant: 'default' | 'destructive' | 'success' | 'info' - Visual style of the alert
// - className: string - Additional CSS classes

// AlertTitle Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// AlertDescription Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// AlertIcon Props:
// - variant: 'default' | 'destructive' | 'success' | 'info' - Matches the alert variant
// - className: string - Additional CSS classes

==============================================
// Dialog (Modal)
==============================================
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"

// Components and their purposes:
// - Dialog: Root component that manages the dialog state and context
// - DialogTrigger: The button that opens the dialog
// - DialogPortal: Portals the dialog content to the body element
// - DialogOverlay: The semi-transparent overlay behind the dialog
// - DialogContent: The main container for the dialog content
// - DialogHeader: Container for the dialog title and description
// - DialogTitle: The title of the dialog
// - DialogDescription: Additional descriptive text for the dialog
// - DialogFooter: Container for action buttons at the bottom
// - DialogClose: A button that closes the dialog

// Dialog Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - modal: boolean - Whether to render as a modal (default: true)
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenAutoFocus: (event: Event) => void - Callback when dialog opens
// - onCloseAutoFocus: (event: Event) => void - Callback when dialog closes

// DialogTrigger Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// DialogContent Props:
// - className: string - Additional CSS classes
// - forceMount: boolean - Force mounting when more control is needed
// - onOpenAutoFocus: (event: Event) => void - Callback when content receives focus
// - onCloseAutoFocus: (event: Event) => void - Callback when content loses focus
// - onEscapeKeyDown: (event: KeyboardEvent) => void - Callback when Escape key is pressed
// - onPointerDownOutside: (event: PointerDownOutsideEvent) => void - Callback when clicking outside
// - onInteractOutside: (event: Event) => void - Callback when interacting outside
// - onFocusOutside: (event: FocusOutsideEvent) => void - Callback when focusing outside

// DialogHeader Props:
// - className: string - Additional CSS classes

// DialogTitle Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// DialogDescription Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// DialogFooter Props:
// - className: string - Additional CSS classes

// DialogClose Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

==============================================
// Dropdown Menu
==============================================
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"

// Components and their purposes:
// - DropdownMenu: Root component that manages the dropdown state and context
// - DropdownMenuTrigger: The button that toggles the dropdown
// - DropdownMenuPortal: Portals the dropdown content to the body
// - DropdownMenuContent: The dropdown content container
// - DropdownMenuItem: A single selectable item in the dropdown
// - DropdownMenuCheckboxItem: A dropdown item with a checkbox
// - DropdownMenuRadioItem: A dropdown item that works with radio groups
// - DropdownMenuLabel: A non-interactive label for grouping items
// - DropdownMenuSeparator: A visual separator between items
// - DropdownMenuShortcut: A keyboard shortcut displayed to the right
// - DropdownMenuGroup: A group of related items
// - DropdownMenuSub: A submenu component
// - DropdownMenuSubContent: Content of a submenu
// - DropdownMenuSubTrigger: Trigger for a submenu
// - DropdownMenuRadioGroup: A group of radio items

// DropdownMenu Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - modal: boolean - Whether to render as a modal (default: true)

// DropdownMenuTrigger Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes

// DropdownMenuPortal Props:
// - className: string - Additional CSS classes
// - container: HTMLElement - Custom container to portal the content into (default: document.body)

// DropdownMenuContent Props:
// - className: string - Additional CSS classes
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side of the trigger to render against (default: 'bottom')
// - sideOffset: number - Distance in pixels from the trigger (default: 0)
// - align: 'start' | 'center' | 'end' - Alignment of the content (default: 'center')
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - avoidCollisions: boolean - Whether to avoid collisions with viewport edges (default: true)
// - collisionPadding: number | { top?: number, right?: number, bottom?: number, left?: number } - Padding between the content and viewport edges (default: 0)
// - arrowPadding: number - Padding between the arrow and the edges of the content (default: 0)
// - sticky: 'partial' | 'always' - Sticky behavior on the align axis (default: 'partial')
// - hideWhenDetached: boolean - Whether to hide the content when the trigger is not in the viewport (default: false)

// DropdownMenuItem Props:
// - className: string - Additional CSS classes
// - disabled: boolean - Whether the item is disabled (default: false)
// - onSelect: (event: Event) => void - Event handler called when the item is selected
// - textValue: string - Text label for the item (for typeahead)
// - asChild: boolean - Merge with child element (default: false)

// DropdownMenuCheckboxItem Props:
// - checked: boolean | 'indeterminate' - Checked state of the item
// - onCheckedChange: (checked: boolean) => void - Callback when checked state changes
// - disabled: boolean - Whether the item is disabled (default: false)
// - className: string - Additional CSS classes
// - textValue: string - Text label for the item (for typeahead)

// DropdownMenuRadioItem Props:
// - value: string - The value of the radio item
// - disabled: boolean - Whether the item is disabled (default: false)
// - className: string - Additional CSS classes
// - textValue: string - Text label for the item (for typeahead)

// DropdownMenuLabel Props:
// - className: string - Additional CSS classes

// DropdownMenuSeparator Props:
// - className: string - Additional CSS classes

// DropdownMenuShortcut Props:
// - className: string - Additional CSS classes

// DropdownMenuGroup Props:
// - className: string - Additional CSS classes

// DropdownMenuSub Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes

// DropdownMenuSubTrigger Props:
// - className: string - Additional CSS classes
// - disabled: boolean - Whether the trigger is disabled (default: false)
// - textValue: string - Text label for the item (for typeahead)

// DropdownMenuSubContent Props:
// - className: string - Additional CSS classes
// - sideOffset: number - Distance in pixels from the trigger (default: 0)
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - align: 'start' | 'center' | 'end' - Alignment of the content (default: 'start')
// - avoidCollisions: boolean - Whether to avoid collisions with viewport edges (default: true)
// - collisionPadding: number | { top?: number, right?: number, bottom?: number, left?: number } - Padding between the content and viewport edges (default: 0)

// DropdownMenuRadioGroup Props:
// - value: string - The value of the selected radio item
// - onValueChange: (value: string) => void - Callback when the selected value changes
// - className: string - Additional CSS classes

// DropdownMenuArrow Props:
// - width: number - Width of the arrow in pixels (default: 10)
// - height: number - Height of the arrow in pixels (default: 5)
// - className: string - Additional CSS classes

// DropdownMenuShortcut Props:
// - className: string - Additional CSS classes

// DropdownMenuGroup Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element

// DropdownMenuSub Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes

// DropdownMenuSubTrigger Props:
// - disabled: boolean - Disables the trigger
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element

// DropdownMenuSubContent Props:
// - alignOffset: number - Alignment offset (default: 0)
// - sideOffset: number - Distance from the trigger (default: 0)
// - className: string - Additional CSS classes
// - forceMount: boolean - Force mounting when more control is needed

// DropdownMenuRadioGroup Props:
// - value: string - Current value of the radio group
// - onValueChange: (value: string) => void - Callback when value changes
// - className: string - Additional CSS classes

==============================================
// Form
==============================================
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Components and their purposes:
// - Form: Root component that provides form context
// - FormField: Wrapper for form controls that handles validation and error states
// - FormControl: Wraps form inputs to provide proper styling and accessibility
// - FormLabel: Label for form fields
// - FormDescription: Helper text for form fields
// - FormMessage: Displays validation messages

// Form Props:
// - form: UseFormReturn - Form methods from react-hook-form
// - className: string - Additional CSS classes

// FormField Props:
// - name: string - Name of the field (should match form schema)
// - control: Control - Control object from react-hook-form
// - render: function - Render prop for the form control
// - defaultValue: any - Default value for the field
// - rules: object - Validation rules
// - shouldUnregister: boolean - Whether to unregister the field when unmounted

// FormControl Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes

// FormLabel Props:
// - className: string - Additional CSS classes
// - htmlFor: string - ID of the associated form element

// FormDescription Props:
// - className: string - Additional CSS classes

// FormMessage Props:
// - className: string - Additional CSS classes

==============================================
// Tabs
==============================================
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

// Components and their purposes:
// - Tabs: Root component that manages the tabs state
// - TabsList: Container for the tab triggers
// - TabsTrigger: Clickable element that activates its associated content
// - TabsContent: Container for the content associated with each tab

// Tabs Props:
// - defaultValue: string - The value of the tab to show by default
// - value: string - Controlled value of the currently active tab
// - onValueChange: (value: string) => void - Callback when the active tab changes
// - orientation: 'horizontal' | 'vertical' - Orientation of the tabs (default: 'horizontal')
// - activationMode: 'automatic' | 'manual' - When automatic, tabs are activated when receiving focus (default: 'automatic')
// - className: string - Additional CSS classes

// TabsList Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// TabsTrigger Props:
// - value: string - A unique value that associates the trigger with a content
// - disabled: boolean - Whether the tab is disabled (default: false)
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// TabsContent Props:
// - value: string - The value that associates the content with a trigger
// - forceMount: boolean - Force mounting when more control is needed
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

==============================================
// Input
==============================================
import { Input } from "@/components/ui/input"

// Components and their purposes:
// - Input: A styled input element for text, email, password, and other input types

// Input Props:
// - type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' - Type of input (default: 'text')
// - placeholder: string - Placeholder text when input is empty
// - value: string - Controlled value of the input
// - defaultValue: string - Default value for uncontrolled input
// - onChange: (event: React.ChangeEvent<HTMLInputElement>) => void - Callback when input value changes
// - onBlur: (event: React.FocusEvent<HTMLInputElement>) => void - Callback when input loses focus
// - onFocus: (event: React.FocusEvent<HTMLInputElement>) => void - Callback when input receives focus
// - disabled: boolean - Whether the input is disabled (default: false)
// - readOnly: boolean - Whether the input is read-only (default: false)
// - required: boolean - Whether the input is required (default: false)
// - autoComplete: string - HTML autocomplete attribute value
// - autoFocus: boolean - Whether the input should auto-focus on mount (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - name: string - Name attribute for form submission
// - id: string - ID attribute for the input element
// - min: number | string - Minimum value for number/date inputs
// - max: number | string - Maximum value for number/date inputs
// - step: number | string - Step value for number inputs
// - pattern: string - Pattern for input validation
// - inputMode: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' - Hints at the type of data that might be entered
// - prefix: React.ReactNode - Content to display before the input
// - suffix: React.ReactNode - Content to display after the input

==============================================
// Card
==============================================
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Components and their purposes:
// - Card: Root container component that provides the card styling and layout
// - CardHeader: Container for the card header, typically contains CardTitle and CardDescription
// - CardTitle: Large heading for the card
// - CardDescription: Secondary text that appears below the title
// - CardContent: Main content area of the card
// - CardFooter: Container for actions or additional information at the bottom of the card

// Card Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)
// - style: React.CSSProperties - Custom styles

// CardHeader Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// CardTitle Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)
// - as: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' - HTML heading element to render (default: 'h3')

// CardDescription Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// CardContent Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// CardFooter Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

==============================================
// Avatar
==============================================
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Components and their purposes:
// - Avatar: Root component that provides the avatar container and styling
// - AvatarImage: Displays the avatar image with fallback to AvatarFallback on error
// - AvatarFallback: Displays fallback content when image fails to load or while loading

// Avatar Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

// AvatarImage Props:
// - src: string - The source URL of the avatar image
// - alt: string - Alt text for the image (required for accessibility)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onLoadingStatusChange: (status: 'error' | 'loaded' | 'loading') => void - Callback when image loading status changes

// AvatarFallback Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - delayMs: number - Delay in milliseconds before showing the fallback (default: 0)
// - asChild: boolean - Merge with child element (default: false)

// Common Props for all Avatar components:
// - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Size of the avatar (default: 'md')
// - shape: 'circle' | 'square' - Shape of the avatar (default: 'circle')
// - variant: 'default' | 'outline' | 'ghost' - Visual style variant (default: 'default')

==============================================
// Badge
==============================================
import { Badge } from "@/components/ui/badge"

// Components and their purposes:
// - Badge: A small status descriptor for UI elements

// Badge Props:
// - variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' - Visual style of the badge (default: 'default')
// - size: 'sm' | 'md' | 'lg' - Size of the badge (default: 'md')
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' - Border radius of the badge (default: 'md')
// - withRemove: boolean - Whether to show a remove button (default: false)
// - onRemove: () => void - Callback when remove button is clicked
// - removeAriaLabel: string - Accessibility label for the remove button (default: 'Remove')


==============================================
// Checkbox
==============================================
import { Checkbox } from "@/components/ui/checkbox"

// Components and their purposes:
// - Checkbox: A control that allows the user to toggle between checked and not checked states

// Checkbox Props:
// - id: string - Unique identifier for the checkbox (required for accessibility)
// - name: string - Name attribute for form submission
// - checked: boolean - Controlled checked state
// - defaultChecked: boolean - Uncontrolled default checked state
// - onCheckedChange: (checked: boolean) => void - Callback when checked state changes
// - disabled: boolean - Whether the checkbox is disabled (default: false)
// - required: boolean - Whether the checkbox is required (default: false)
// - readOnly: boolean - Whether the checkbox is read-only (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - size: 'sm' | 'md' | 'lg' - Size of the checkbox (default: 'md')
// - variant: 'default' | 'outline' | 'ghost' - Visual style variant (default: 'default')
// - label: string | ReactNode - Label text or element to display next to the checkbox
// - labelPosition: 'left' | 'right' - Position of the label relative to the checkbox (default: 'right')


==============================================
// Radio Group
==============================================
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Components and their purposes:
// - RadioGroup: A set of checkable buttons (radio inputs) where only one can be selected at a time
// - RadioGroupItem: An individual radio button within the group

// RadioGroup Props:
// - value: string - The value of the currently selected radio item
// - defaultValue: string - The value of the radio item to be selected by default
// - onValueChange: (value: string) => void - Callback when the selected value changes
// - disabled: boolean - Whether all radio items in the group are disabled (default: false)
// - required: boolean - Whether selection is required (default: false)
// - name: string - Name attribute for form submission
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - orientation: 'horizontal' | 'vertical' - Layout direction of the radio items (default: 'vertical')
// - loop: boolean - Whether keyboard navigation should loop around (default: true)

// RadioGroupItem Props:
// - value: string - The value of the radio item (must be unique within the group)
// - id: string - Unique identifier for the radio input (required for accessibility)
// - disabled: boolean - Whether the radio item is disabled (default: false)
// - required: boolean - Whether the radio item is required (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)


==============================================
// Select
==============================================
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"

// Components and their purposes:
// - Select: Root component that manages the select state
// - SelectTrigger: The button that toggles the dropdown
// - SelectValue: Displays the selected value or placeholder
// - SelectContent: The dropdown content container
// - SelectItem: Individual option in the dropdown
// - SelectGroup: Groups related options together
// - SelectLabel: Label for a group of options
// - SelectSeparator: Visual separator between groups of options

// Select Props:
// - value: string - The value of the currently selected item
// - defaultValue: string - The value of the item to be selected by default
// - onValueChange: (value: string) => void - Callback when the selected value changes
// - disabled: boolean - Whether the select is disabled (default: false)
// - required: boolean - Whether a selection is required (default: false)
// - name: string - Name attribute for form submission
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when the open state changes
// - modal: boolean - Whether to render as a modal (default: true)

// SelectTrigger Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)
// - disabled: boolean - Whether the trigger is disabled (inherited from Select)

// SelectValue Props:
// - placeholder: string | ReactNode - Placeholder text when no value is selected
// - asChild: boolean - Merge with child element (default: false)

// SelectContent Props:
// - position: 'item-aligned' | 'popper' - Positioning strategy (default: 'item-aligned')
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side of the trigger to render against (default: 'bottom')
// - sideOffset: number - Distance in pixels from the trigger (default: 4)
// - align: 'start' | 'center' | 'end' - Alignment of the content (default: 'start')
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - avoidCollisions: boolean - Whether to avoid collisions with viewport edges (default: true)
// - collisionBoundary: Element[] | null - Boundary element for collision detection
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - positionDependencies: any[] - Recalculate position when these values change

// SelectItem Props:
// - value: string - The value of the item (must be unique within the group)
// - disabled: boolean - Whether the item is disabled (default: false)
// - className: string - Additional CSS classes
// - textValue: string - Text value for typeahead functionality
// - onSelect: (value: string) => void - Callback when the item is selected
// - asChild: boolean - Merge with child element (default: false)

// SelectGroup Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// SelectLabel Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)

// SelectSeparator Props:
// - className: string - Additional CSS classes


==============================================
// Switch
==============================================
import { Switch } from "@/components/ui/switch"

// Components and their purposes:
// - Switch: A control that allows the user to toggle between checked and not checked states with a sliding motion

// Switch Props:
// - id: string - Unique identifier for the switch (required for accessibility)
// - name: string - Name attribute for form submission
// - checked: boolean - Controlled checked state
// - defaultChecked: boolean - Uncontrolled default checked state
// - onCheckedChange: (checked: boolean) => void - Callback when checked state changes
// - disabled: boolean - Whether the switch is disabled (default: false)
// - required: boolean - Whether the switch is required (default: false)
// - readOnly: boolean - Whether the switch is read-only (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - size: 'sm' | 'md' | 'lg' - Size of the switch (default: 'md')
// - variant: 'default' | 'outline' | 'ghost' - Visual style variant (default: 'default')
// - label: string | ReactNode - Label text or element to display next to the switch
// - labelPosition: 'left' | 'right' - Position of the label relative to the switch (default: 'right')
// - thumbClassName: string - Additional CSS classes for the thumb element
// - trackClassName: string - Additional CSS classes for the track element


==============================================
// Textarea
==============================================
import { Textarea } from "@/components/ui/textarea"

// Components and their purposes:
// - Textarea: A multi-line text input component for longer form content

// Textarea Props:
// - value: string - Controlled value of the textarea
// - defaultValue: string - Default value for uncontrolled textarea
// - onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void - Callback when value changes
// - onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void - Callback when textarea loses focus
// - onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void - Callback when textarea receives focus
// - placeholder: string - Placeholder text when textarea is empty
// - disabled: boolean - Whether the textarea is disabled (default: false)
// - readOnly: boolean - Whether the textarea is read-only (default: false)
// - required: boolean - Whether the textarea is required (default: false)
// - autoComplete: string - HTML autocomplete attribute value
// - autoFocus: boolean - Whether the textarea should auto-focus on mount (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - name: string - Name attribute for form submission
// - id: string - ID attribute for the textarea element
// - rows: number - Number of visible text lines (default: 3)
// - minRows: number - Minimum number of visible text lines
// - maxRows: number - Maximum number of visible text lines before scrolling
// - resize: 'none' | 'both' | 'horizontal' | 'vertical' - Resize behavior (default: 'vertical')
// - spellCheck: boolean - Whether to enable spell checking (default: false)
// - wrap: 'soft' | 'hard' - How the text should be wrapped (default: 'soft')
// - maxLength: number - Maximum number of characters allowed
// - minLength: number - Minimum number of characters required


==============================================
// Toggle
==============================================
import { Toggle } from "@/components/ui/toggle"

// Components and their purposes:
// - Toggle: A two-state button that can be toggled on/off with visual feedback

// Toggle Props:
// - pressed: boolean - Controlled pressed state
// - defaultPressed: boolean - Default pressed state for uncontrolled usage
// - onPressedChange: (pressed: boolean) => void - Callback when pressed state changes
// - disabled: boolean - Whether the toggle is disabled (default: false)
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - variant: 'default' | 'outline' | 'ghost' - Visual style variant (default: 'default')
// - size: 'sm' | 'md' | 'lg' - Size of the toggle (default: 'md')
// - type: 'button' | 'submit' | 'reset' - Button type attribute (default: 'button')
// - name: string - Name attribute for form submission
// - value: string - Value attribute for form submission
// - 'aria-label': string - Accessible label for screen readers (required if no children)


==============================================
// Input OTP
==============================================
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

// Components and their purposes:
// - InputOTP: Root component that manages the OTP input state and behavior
// - InputOTPGroup: Container that groups the individual OTP input slots
// - InputOTPSlot: Individual input field for a single character in the OTP

// InputOTP Props:
// - value: string - The current OTP value
// - defaultValue: string - Default OTP value for uncontrolled usage
// - onChange: (value: string) => void - Callback when OTP value changes
// - maxLength: number - Maximum number of characters (default: 6)
// - render: (props: { slots: { index: number; char: string; isActive: boolean }[] }) => ReactNode - Custom render function
// - disabled: boolean - Whether the OTP input is disabled (default: false)
// - autoFocus: boolean - Whether to auto-focus the first input (default: true)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - inputMode: 'text' | 'numeric' | 'tel' | 'decimal' - Type of input (default: 'numeric')
// - pattern: string - Pattern for input validation
// - onComplete: (value: string) => void - Callback when OTP is complete

// InputOTPGroup Props:
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)
// - style: React.CSSProperties - Custom styles

// InputOTPSlot Props:
// - index: number - The index of the slot (required)
// - className: string - Additional CSS classes
// - asChild: boolean - Merge with child element (default: false)
// - style: React.CSSProperties - Custom styles

==============================================
// Label
==============================================
import { Label } from "@/components/ui/label"

// Components and their purposes:
// - Label: A text label for form controls that provides an accessible name and description

// Label Props:
// - htmlFor: string - ID of the form control the label describes (required for accessibility)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - required: boolean - Whether the associated form control is required (adds an asterisk)
// - disabled: boolean - Whether the label should appear disabled
// - size: 'sm' | 'md' | 'lg' - Size of the label text (default: 'md')
// - variant: 'default' | 'bold' | 'subtle' - Visual style variant (default: 'default')
// - tooltip: string | ReactNode - Optional tooltip content to display on hover
// - tooltipPosition: 'top' | 'right' | 'bottom' | 'left' - Position of the tooltip (default: 'top')

==============================================
// Menubar
==============================================
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/components/ui/menubar"

// Components and their purposes:
// - Menubar: Root container that provides context and state management
// - MenubarMenu: Container for a single menu and its trigger/content
// - MenubarTrigger: Button that toggles the menu's open/closed state
// - MenubarContent: Container for the menu's dropdown content
// - MenubarItem: Interactive menu item that can trigger actions
// - MenubarSeparator: Visual separator between groups of menu items
// - MenubarShortcut: Displays keyboard shortcuts next to menu items
// - MenubarSub: Container for submenu functionality
// - MenubarSubContent: Container for submenu content
// - MenubarSubTrigger: Button that opens a submenu
// - MenubarCheckboxItem: Menu item with a checkbox for toggling options
// - MenubarRadioGroup: Groups related radio menu items
// - MenubarRadioItem: Menu item that represents a single option in a radio group

// Menubar Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - loop: boolean - Whether keyboard navigation should loop (default: true)

// MenubarMenu Props:
// - value: string - Unique identifier for the menu (for controlled state)
// - defaultValue: string - Default value for uncontrolled usage
// - onValueChange: (value: string) => void - Callback when the active menu changes
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// MenubarTrigger Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// MenubarContent Props:
// - align: 'start' | 'center' | 'end' - Alignment of the content (default: 'start')
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side of the trigger (default: 'bottom')
// - sideOffset: number - Distance in pixels from the trigger (default: 8)
// - avoidCollisions: boolean - Whether to avoid collisions with viewport edges (default: true)
// - collisionBoundary: Element[] | null - Boundary element for collision detection
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - loop: boolean - Whether keyboard navigation should loop (default: true)

// MenubarItem Props:
// - disabled: boolean - Whether the item is disabled (default: false)
// - inset: boolean - Whether to add left padding (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onSelect: (event: Event) => void - Callback when the item is selected

// MenubarCheckboxItem Props:
// - checked: boolean - Controlled checked state
// - onCheckedChange: (checked: boolean) => void - Callback when checked state changes
// - disabled: boolean - Whether the item is disabled (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - textValue: string - Text value for typeahead functionality

// MenubarRadioGroup Props:
// - value: string - The value of the selected radio item
// - onValueChange: (value: string) => void - Callback when the selected value changes

// MenubarRadioItem Props:
// - value: string - The value of the radio item
// - disabled: boolean - Whether the item is disabled (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - textValue: string - Text value for typeahead functionality


==============================================
// Navigation Menu
==============================================
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NavigationMenuViewportPosition,
  NavigationMenuViewportPositionIndicator,
  NavigationMenuViewportPositionContent,
} from "@/components/ui/navigation-menu"

// Components and their purposes:
// - NavigationMenu: Root component that provides context and state management
// - NavigationMenuList: Container for navigation items
// - NavigationMenuItem: Wrapper for individual navigation items
// - NavigationMenuTrigger: Button that toggles the content of a navigation item
// - NavigationMenuContent: Container for the dropdown content
// - NavigationMenuLink: Interactive navigation link
// - NavigationMenuIndicator: Visual indicator for the active navigation item
// - NavigationMenuViewport: Container that positions the dropdown content
// - NavigationMenuViewportPosition: Controls the positioning of the viewport
// - NavigationMenuViewportPositionIndicator: Visual indicator for the active viewport position
// - NavigationMenuViewportPositionContent: Content container within the viewport position

// NavigationMenu Props:
// - value: string - The currently active navigation item
// - defaultValue: string - Default active item for uncontrolled usage
// - onValueChange: (value: string) => void - Callback when active item changes
// - delayDuration: number - Delay before showing/hiding content (ms, default: 200)
// - skipDelayDuration: number - Time to wait before showing content after pointer leaves trigger (ms, default: 300)
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// NavigationMenuList Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

// NavigationMenuItem Props:
// - value: string - Unique value for the item (required for active state tracking)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

// NavigationMenuTrigger Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - showArrow: boolean - Whether to show a dropdown arrow (default: true)

// NavigationMenuContent Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - forceMount: boolean - Force mounting of the content (useful for animations)
// - container: HTMLElement - Container to render the content into (default: document.body)

// NavigationMenuLink Props:
// - active: boolean - Whether the link is active
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - onSelect: (event: Event) => void - Callback when the link is selected
// - onMouseEnter: (event: React.MouseEvent) => void - Mouse enter handler
// - onMouseLeave: (event: React.MouseEvent) => void - Mouse leave handler

// NavigationMenuViewport Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - position: { align: 'start' | 'center' | 'end', sideOffset: number } - Position configuration

// What it's good for:
// - Website navigation
// - Mega menus
// - Complex navigation structures with submenus

==============================================
// Pagination
==============================================
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Components and their purposes:
// - Pagination: Root component that provides context and state management
// - PaginationContent: Container for pagination items
// - PaginationItem: Wrapper for individual pagination elements
// - PaginationLink: Clickable page number link
// - PaginationPrevious: Button to navigate to the previous page
// - PaginationNext: Button to navigate to the next page
// - PaginationEllipsis: Indicates truncated pages

// Pagination Props:
// - page: number - Current page number (controlled mode)
// - defaultPage: number - Initial page number (uncontrolled mode, default: 1)
// - total: number - Total number of items
// - pageSize: number - Number of items per page (default: 10)
// - onPageChange: (page: number) => void - Callback when page changes
// - showSizeChanger: boolean - Show page size selector (default: false)
// - pageSizeOptions: number[] - Available page sizes for the selector (default: [10, 20, 30, 50, 100])
// - onPageSizeChange: (pageSize: number) => void - Callback when page size changes
// - showQuickJumper: boolean - Enable quick jump to page (default: false)
// - showTotal: boolean | ((total: number, range: [number, number]) => ReactNode) - Show total items and range
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - disabled: boolean - Disable all interactive elements
// - hideOnSinglePage: boolean - Hide pagination when there's only one page (default: false)

// PaginationLink Props:
// - isActive: boolean - Whether the link represents the current page
// - disabled: boolean - Whether the link is disabled
// - type: 'page' | 'next' | 'previous' | 'jump-prev' | 'jump-next' - Type of the link
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onClick: () => void - Click handler
// - 'aria-label': string - Accessibility label
// - 'aria-current': 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' - Current page indicator for screen readers

==============================================
// Popover
==============================================
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

// Components and their purposes:
// - Popover: Root component that manages the popover state and positioning
// - PopoverTrigger: The element that toggles the popover's visibility
// - PopoverContent: The content that appears in the popover

// Popover Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Default open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - modal: boolean - Whether to render the popover in a portal (default: false)
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side of the trigger to render against (default: 'bottom')
// - sideOffset: number - The distance in pixels from the trigger (default: 4)
// - align: 'start' | 'center' | 'end' - Preferred alignment against the trigger (default: 'center')
// - alignOffset: number - An offset in pixels from the alignment position (default: 0)
// - avoidCollisions: boolean - Whether to avoid collisions with the viewport (default: true)
// - collisionBoundary: Element | null | Array<Element | null> - The boundary element for collision detection (default: viewport)
// - collisionPadding: number | Partial<Record<Side, number>> - The padding between the boundary and the popover (default: 0)
// - arrowPadding: number - The padding between the arrow and the edge of the popover (default: 0)
// - sticky: 'partial' | 'always' - The sticky behavior on the align axis (default: 'partial')
// - hideWhenDetached: boolean - Whether to hide the popover when the trigger is not in the viewport (default: false)
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element

// PopoverTrigger Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - 'data-state': 'open' | 'closed' - Internal state (managed by Popover)
// - 'data-disabled': boolean - Internal disabled state
// - 'data-side': 'top' | 'right' | 'bottom' | 'left' - Internal side (managed by Popover)
// - 'data-align': 'start' | 'center' | 'end' - Internal alignment (managed by Popover)

// PopoverContent Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - forceMount: boolean - Force mounting of the content (useful for animations)
// - 'data-state': 'open' | 'closed' - Internal state (managed by Popover)
// - 'data-side': 'top' | 'right' | 'bottom' | 'left' - Internal side (managed by Popover)
// - 'data-align': 'start' | 'center' | 'end' - Internal alignment (managed by Popover)
// - onOpenAutoFocus: (event: Event) => void - Callback when the popover opens and focus is moved into it
// - onCloseAutoFocus: (event: Event) => void - Callback when the popover closes and focus is moved back to the trigger
// - onEscapeKeyDown: (event: KeyboardEvent) => void - Callback when the escape key is pressed
// - onPointerDownOutside: (event: PointerDownOutsideEvent) => void - Callback when a pointer event occurs outside the popover
// - onFocusOutside: (event: FocusOutsideEvent) => void - Callback when focus moves outside the popover
// - onInteractOutside: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void - Callback when an interaction occurs outside the popover

// Usage Example:
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>

==============================================
// Progress
==============================================
import { Progress } from "@/components/ui/progress"

// Components and their purposes:
// - Progress: A visual indicator showing the completion status of an operation

// Progress Props:
// - value: number - Current progress value (0-100)
// - max: number - Maximum value (default: 100)
// - min: number - Minimum value (default: 0)
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element
// - indicatorClassName: string - Additional CSS classes for the indicator element
// - indicatorStyle: React.CSSProperties - Custom styles for the indicator element
// - trackClassName: string - Additional CSS classes for the track element
// - trackStyle: React.CSSProperties - Custom styles for the track element
// - size: 'sm' | 'md' | 'lg' - Size of the progress bar (default: 'md')
// - variant: 'default' | 'primary' | 'success' | 'warning' | 'error' - Visual style variant (default: 'default')
// - showValue: boolean - Whether to show the progress value (default: false)
// - valueFormat: (value: number) => string - Function to format the displayed value
// - isIndeterminate: boolean - Whether to show an indeterminate progress animation (overrides value)
// - label: string - Accessible label for screen readers
// - aria-label: string - ARIA label for the progress bar (falls back to label prop if not provided)
// - 'aria-labelledby': string - ID of the element that labels the progress bar
// - 'aria-describedby': string - ID of the element that describes the progress bar

==============================================
// Scroll Area
==============================================
import { ScrollArea } from "@/components/ui/scroll-area"

// Components and their purposes:
// - ScrollArea: A customizable scrollable container with custom scrollbars
// - ScrollBar: The scrollbar component (can be customized separately)

// ScrollArea Props:
// - type: 'auto' | 'always' | 'scroll' | 'hover' - When to show the scrollbar (default: 'hover')
// - scrollHideDelay: number - Delay in milliseconds before hiding scrollbar (for 'hover' type, default: 600)
// - className: string - Additional CSS classes for the root element
// - viewportClassName: string - Additional CSS classes for the viewport element
// - scrollbarClassName: string - Additional CSS classes for the scrollbar
// - thumbClassName: string - Additional CSS classes for the scrollbar thumb
// - scrollAreaStyle: React.CSSProperties - Custom styles for the root element
// - viewportStyle: React.CSSProperties - Custom styles for the viewport element
// - scrollbarStyle: React.CSSProperties - Custom styles for the scrollbar
// - thumbStyle: React.CSSProperties - Custom styles for the scrollbar thumb
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - scrollHideWhenNotUsed: boolean - Whether to hide the scrollbar when not scrolling (default: true)
// - scrollbarSize: number - Size of the scrollbar in pixels (default: 10)
// - scrollbarOffset: number - Offset of the scrollbar from the edge (default: 0)
// - onScroll: (event: React.UIEvent<HTMLDivElement>) => void - Scroll event handler
// - onScrollToTop: () => void - Called when scrolled to top
// - onScrollToBottom: () => void - Called when scrolled to bottom
// - onReachStart: () => void - Called when scrolled to start
// - onReachEnd: () => void - Called when scrolled to end
// - onViewportChange: (viewport: HTMLDivElement) => void - Called when viewport element changes
// - onContentChange: (content: HTMLDivElement) => void - Called when content element changes

// ScrollBar Props (when using ScrollBar component directly):
// - orientation: 'horizontal' | 'vertical' - Orientation of the scrollbar (default: 'vertical')
// - forceMount: boolean - Force the scrollbar to be shown regardless of content size
// - 'data-orientation': 'horizontal' | 'vertical' - Used internally for styling

==============================================
// Separator
==============================================
import { Separator } from "@/components/ui/separator"

// Usage Example:
<div>
  <Separator className="my-4" />
</div>

// What it's good for:
// - Visual separation between sections
// - List item dividers
// - Anywhere you need a horizontal or vertical line

==============================================
// Sheet
==============================================
import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

// Components and their purposes:
// - Sheet: Root component that manages the sheet state and context
// - SheetTrigger: The button that opens the sheet
// - SheetPortal: Portals the sheet content to the body element
// - SheetOverlay: The semi-transparent overlay behind the sheet
// - SheetContent: The main container for the sheet content
// - SheetHeader: Container for the sheet title and description
// - SheetTitle: The title of the sheet
// - SheetDescription: Additional descriptive text for the sheet
// - SheetFooter: Container for action buttons at the bottom
// - SheetClose: A button that closes the sheet

// Sheet Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Initial open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - modal: boolean - Whether to render as a modal (default: true)
// - onOpenAutoFocus: (event: Event) => void - Callback when sheet opens
// - onCloseAutoFocus: (event: Event) => void - Callback when sheet closes

// SheetTrigger Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// SheetContent Props:
// - side: 'top' | 'right' | 'bottom' | 'left' - Which side the sheet appears from (default: 'right')
// - className: string - Additional CSS classes
// - forceMount: boolean - Force mounting when more control is needed
// - onOpenAutoFocus: (event: Event) => void - Callback when content receives focus
// - onCloseAutoFocus: (event: Event) => void - Callback when content loses focus
// - onEscapeKeyDown: (event: KeyboardEvent) => void - Callback when Escape key is pressed
// - onPointerDownOutside: (event: PointerDownOutsideEvent) => void - Callback when clicking outside
// - onInteractOutside: (event: Event) => void - Callback when interacting outside
// - onFocusOutside: (event: FocusOutsideEvent) => void - Callback when focusing outside

// SheetHeader Props:
// - className: string - Additional CSS classes

// SheetTitle Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// SheetDescription Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes

// SheetFooter Props:
// - className: string - Additional CSS classes

// SheetClose Props:
// - asChild: boolean - Merge with child element
// - className: string - Additional CSS classes


==============================================
// Skeleton
==============================================
import { Skeleton } from "@/components/ui/skeleton"

// Usage Example:
<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

// What it's good for:
// - Loading states
// - Content placeholders
// - Improving perceived performance

==============================================
// Slider
==============================================
import { Slider } from "@/components/ui/slider"

// Usage Example:
<Slider 
  defaultValue={[50]} 
  max={100} 
  step={1} 
  className="w-[60%]" 
/>


==============================================
// Table
==============================================
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"

// Components and their purposes:
// - Table: Root container for the table
// - TableHeader: Container for the table header
// - TableBody: Container for the table body
// - TableFooter: Container for the table footer
// - TableRow: A row in the table
// - TableHead: A header cell in the table
// - TableCell: A standard cell in the table
// - TableCaption: A caption for the table

// Table Props:
// - className: string - Additional CSS classes

// TableHeader Props:
// - className: string - Additional CSS classes

// TableBody Props:
// - className: string - Additional CSS classes

// TableFooter Props:
// - className: string - Additional CSS classes

// TableRow Props:
// - className: string - Additional CSS classes
// - onClick: (event: React.MouseEvent) => void - Click handler
// - onKeyDown: (event: React.KeyboardEvent) => void - Keyboard event handler

// TableHead Props:
// - className: string - Additional CSS classes
// - colSpan: number - Number of columns the cell spans
// - rowSpan: number - Number of rows the cell spans
// - scope: 'row' | 'col' | 'rowgroup' | 'colgroup' - Specifies the scope of the header cell

// TableCell Props:
// - className: string - Additional CSS classes
// - colSpan: number - Number of columns the cell spans
// - rowSpan: number - Number of rows the cell spans
// - align: 'left' | 'center' | 'right' - Text alignment (default: 'left')

// TableCaption Props:
// - className: string - Additional CSS classes
// - Any structured data that needs to be compared

==============================================
// Toggle Group
==============================================
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Components and their purposes:
// - ToggleGroup: Container for a group of toggleable items
// - ToggleGroupItem: Individual toggleable item within the group

// ToggleGroup Props:
// - type: 'single' | 'multiple' - Whether to allow single or multiple items to be toggled (required)
// - value: string | string[] - Controlled value(s) of the toggled items
// - defaultValue: string | string[] - Default value(s) of the toggled items (uncontrolled)
// - onValueChange: (value: string | string[]) => void - Callback when the value changes
// - disabled: boolean - Whether the entire toggle group is disabled (default: false)
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - orientation: 'horizontal' | 'vertical' - Orientation of the toggle group (default: 'horizontal')
// - loop: boolean - Whether keyboard navigation should loop around (default: true)
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element

// ToggleGroupItem Props:
// - value: string - The value of the toggle item (required)
// - disabled: boolean - Whether the toggle item is disabled (default: false)
// - 'data-state': 'on' | 'off' - Internal state (managed by ToggleGroup)
// - 'data-disabled': boolean - Internal disabled state
// - 'data-orientation': 'horizontal' | 'vertical' - Internal orientation
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - 'aria-label': string - Accessibility label (required if no text content)
// - 'aria-pressed': boolean - Whether the toggle is pressed (managed by ToggleGroup)

==============================================
// Aspect Ratio
==============================================
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Component and its purpose:
// - AspectRatio: A component that maintains a specific aspect ratio for its children

// Props:
// - ratio: number - The desired aspect ratio (width / height, e.g., 16/9) (required)
// - className: string - Additional CSS classes for the wrapper element
// - style: React.CSSProperties - Custom styles for the wrapper element
// - asChild: boolean - Merge with child element (default: false)

// Example Usage:
/*
<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
    alt="Photo by Drew Beamer"
    className="w-full h-full object-cover"
    width={800}
    height={450}
    loading="lazy"
  />
</AspectRatio>
*/

// Note: For videos, you might want to use the following pattern:
/*
<AspectRatio ratio={16 / 9}>
  <video
    src="/video.mp4"
    controls
    className="w-full h-full object-cover"
  />
</AspectRatio>
*/

==============================================
// Breadcrumb
==============================================
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

// Components and their purposes:
// - Breadcrumb: The root container for the breadcrumb navigation
// - BreadcrumbList: Container for breadcrumb items
// - BreadcrumbItem: Individual breadcrumb item container
// - BreadcrumbLink: Clickable link for navigation
// - BreadcrumbPage: Non-clickable current page indicator
// - BreadcrumbSeparator: Visual separator between items (default: /)
// - BreadcrumbEllipsis: Truncation indicator for long breadcrumb trails

// Breadcrumb Props:
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element
// - asChild: boolean - Merge with child element (default: false)

// BreadcrumbLink Props:
// - href: string - The URL to link to (required)
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - All standard HTML anchor attributes are supported

// BreadcrumbPage Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// BreadcrumbSeparator Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - children: ReactNode - Custom separator content (default: /)

// BreadcrumbEllipsis Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

==============================================
// Calendar
==============================================
import { Calendar } from "@/components/ui/calendar"

// Component and its purpose:
// - Calendar: A customizable date picker component that supports single date, multiple dates, and date range selection

// Props:
// - mode: 'single' | 'multiple' | 'range' - Selection mode (default: 'single')
// - selected: Date | Date[] | { from: Date; to: Date } - The currently selected date(s) based on mode
// - onSelect: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void - Callback when selection changes
// - initialFocus: boolean - Auto focus the calendar on mount (default: false)
// - disabled: boolean | ((date: Date) => boolean) - Disable date selection (either all dates or based on a function)
// - required: boolean - Whether a date selection is required (default: false)
// - min: number - Minimum selectable date (in milliseconds since epoch)
// - max: number - Maximum selectable date (in milliseconds since epoch)
// - locale: Locale - Locale to use for formatting (default: enUS)
// - month: Date - The month to display (controlled)
// - defaultMonth: Date - The default month to display (uncontrolled)
// - onMonthChange: (month: Date) => void - Callback when the month changes
// - numberOfMonths: number - Number of months to display (default: 1)
// - pagedNavigation: boolean - Whether to use paged navigation (default: false)
// - disableNavigation: boolean - Disable month navigation (default: false)
// - fixedWeeks: boolean - Always show 6 weeks (default: false)
// - showWeekNumber: boolean - Show week numbers (default: false)
// - weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 - First day of the week (0 = Sunday, 1 = Monday, etc.)
// - today: Date - The current date (default: new Date())
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element
// - classNames: Record<string, string> - Class names for individual elements
// - modifiers: Record<string, (date: Date) => boolean> - Custom day modifiers
// - modifiersClassNames: Record<string, string> - Class names for modified days
// - modifiersStyles: Record<string, React.CSSProperties> - Styles for modified days


==============================================
// Carousel
==============================================
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
  CarouselDot,
  CarouselViewport,
} from "@/components/ui/carousel"

// Components and their purposes:
// - Carousel: The root container for the carousel
// - CarouselViewport: The scrollable area containing the slides
// - CarouselContent: Container for the carousel items
// - CarouselItem: Individual slide in the carousel
// - CarouselPrevious: Button to navigate to the previous slide
// - CarouselNext: Button to navigate to the next slide
// - CarouselDots: Container for the navigation dots
// - CarouselDot: Individual navigation dot

// Carousel Props:
// - value: number - The current slide index (controlled)
// - defaultValue: number - The default slide index (uncontrolled)
// - onValueChange: (value: number) => void - Callback when the slide changes
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element
// - orientation: 'horizontal' | 'vertical' - Carousel orientation (default: 'horizontal')
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - loop: boolean - Whether to loop back to the start/end (default: false)
// - autoPlay: boolean - Auto-advance the carousel (default: false)
// - autoPlayInterval: number - Interval in milliseconds between auto-advances (default: 5000)
// - showArrows: boolean - Show navigation arrows (default: true)
// - showDots: boolean - Show navigation dots (default: false)
// - swipe: boolean - Enable touch/swipe gestures (default: true)
// - dragFree: boolean - Enable free dragging (default: false)
// - align: 'start' | 'center' | 'end' - Slide alignment (default: 'start')
// - slidesToScroll: number | 'auto' - Number of slides to scroll at once (default: 1)
// - spacing: number - Space between slides in pixels (default: 0)

// CarouselItem Props:
// - index: number - The index of the slide (required)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

// CarouselPrevious/CarouselNext Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - disabled: boolean - Whether the button is disabled
// - asChild: boolean - Merge with child element (default: false)

// CarouselDots Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)

// CarouselDot Props:
// - index: number - The index this dot represents (required)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - 'data-active': boolean - Internal active state
// - 'aria-label': string - Accessibility label (default: "Go to slide {index + 1}")


==============================================
// Chart
==============================================
/*
 * Chart components provide a comprehensive set of data visualization tools.
 * They are built on top of Recharts and provide a consistent API for creating charts.
 */
import {
  // Chart types
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  RadarChart,
  ScatterChart,
  ComposedChart,
  FunnelChart,
  PolarChart,
  
  // Chart elements
  Bar,
  Line,
  Pie,
  Area,
  Radar,
  Scatter,
  Funnel,
  
  // Axes and grids
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  
  // UI components
  Tooltip as ChartTooltip,
  Legend,
  Label,
  LabelList,
  ReferenceLine,
  ReferenceArea,
  ReferenceDot,
  Brush,
  
  // Utility components
  Cell,
  Sector,
  Surface,
  Symbols,
  
  // Container
  ResponsiveContainer
} from "@/components/ui/chart"

// Components and their purposes:
// - ResponsiveContainer: Makes charts responsive to container size
// - CartesianChart: Base chart with cartesian coordinates (BarChart, LineChart, AreaChart, etc. extend this)
// - BarChart: Chart for comparing values across categories using bars
// - LineChart: Chart for showing trends over time or categories using lines
// - AreaChart: Similar to LineChart but with the area below the line filled
// - PieChart: Circular chart divided into sectors to illustrate numerical proportions
// - RadarChart: Displays multivariate data in the form of a two-dimensional chart
// - ScatterChart: Displays values for typically two variables for a set of data
// - ComposedChart: A chart that can combine different chart types
// - PolarChart: Base chart for polar coordinates (Pie, Radar, etc. extend this)

// Common Chart Components:
// - XAxis: The x-axis of the chart
// - YAxis: The y-axis of the chart
// - ZAxis: The z-axis for 3D charts
// - CartesianGrid: The grid background for cartesian charts
// - PolarGrid: The grid background for polar charts
// - PolarAngleAxis: The angle axis for polar charts
// - PolarRadiusAxis: The radius axis for polar charts
// - Tooltip: Displays data when hovering over chart elements
// - Legend: Displays a legend for the chart
// - Brush: For selecting a range of data to display
// - ReferenceLine: A reference line in the chart
// - ReferenceArea: A reference area in the chart
// - ReferenceDot: A reference dot in the chart
// - Label: Text label for chart elements
// - LabelList: List of labels for chart elements
// - Cell: Individual cell in a chart (used for customizing individual data points)
// - Sector: A sector in a pie chart
// - Surface: A container for chart elements
// - Symbols: Predefined symbols for scatter charts

// Common Props for Chart Components:
// - data: Array - The data to be displayed in the chart
// - dataKey: string - The key in the data object to use for values
// - name: string - The display name of the series
// - stroke: string - The color of the line/border
// - fill: string - The fill color
// - fillOpacity: number - The opacity of the fill (0-1)
// - strokeWidth: number - The width of the line/border
// - activeDot: boolean | object - Configuration for the dot shown on active points
// - isAnimationActive: boolean - Whether to animate the chart (default: true)
// - animationDuration: number - Duration of animation in ms (default: 1500)
// - animationEasing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' - Easing function for animation
// - margin: { top: number, right: number, bottom: number, left: number } - Margins around the chart
// - width: number | string - Width of the chart (use with ResponsiveContainer for responsive charts)
// - height: number | string - Height of the chart (use with ResponsiveContainer for responsive charts)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// ResponsiveContainer Props:
// - width: number | string - Width of the container (can be percentage or fixed width)
// - height: number | string - Height of the container (can be percentage or fixed height)
// - minWidth: number | string - Minimum width of the container
// - minHeight: number | string - Minimum height of the container
// - aspect: number - The aspect ratio (width / height)
// - debounce: number - Debounce time in ms for resize events (default: 0)


==============================================
// Collapsible
==============================================
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

// Components and their purposes:
// - Collapsible: Root component that manages the collapsible state
// - CollapsibleTrigger: The button that toggles the content's visibility
// - CollapsibleContent: The collapsible/expandable content area

// Collapsible Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Default open state for uncontrolled usage
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - disabled: boolean - Whether the collapsible is disabled (default: false)
// - className: string - Additional CSS classes for the root element
// - style: React.CSSProperties - Custom styles for the root element
// - asChild: boolean - Merge with child element (default: false)
// - dir: 'ltr' | 'rtl' - Text direction (default: 'ltr')
// - orientation: 'horizontal' | 'vertical' - Orientation of the collapsible (default: 'vertical')

// CollapsibleTrigger Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - disabled: boolean - Whether the trigger is disabled (inherited from Collapsible)
// - 'data-state': 'open' | 'closed' - Internal state (managed by Collapsible)
// - 'data-disabled': boolean - Internal disabled state
// - 'data-orientation': 'horizontal' | 'vertical' - Internal orientation

// CollapsibleContent Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)
// - forceMount: boolean - Force mounting of the content (useful for animations)
// - 'data-state': 'open' | 'closed' - Internal state (managed by Collapsible)
// - 'data-disabled': boolean - Internal disabled state
// - 'data-orientation': 'horizontal' | 'vertical' - Internal orientation

==============================================
// Command
==============================================
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

// Components and their purposes:
// - Command: The root component that provides context
// - CommandDialog: A dialog that contains the command interface
// - CommandInput: The search input field
// - CommandList: Container for command items and groups
// - CommandEmpty: Shown when no results are found
// - CommandGroup: Groups related command items together
// - CommandItem: A single command/action
// - CommandSeparator: A visual separator between groups
// - CommandShortcut: Displays keyboard shortcuts

// Command Props:
// - className: string - Additional CSS classes
// - shouldFilter: boolean - Whether to filter items (default: true)
// - filter: (value: string, search: string) => number - Custom filter function
// - value: string - The value of the currently selected item
// - onValueChange: (value: string) => void - Callback when selected value changes
// - label: string - ARIA label for the command (default: 'Command menu')
// - loop: boolean - Whether to loop the selection (default: false)

// CommandDialog Props:
// - open: boolean - Whether the dialog is open
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - defaultOpen: boolean - Default open state (uncontrolled)
// - shouldFilter: boolean - Whether to filter items (default: true)
// - filter: (value: string, search: string) => number - Custom filter function
// - value: string - The value of the currently selected item
// - onValueChange: (value: string) => void - Callback when selected value changes
// - label: string - ARIA label for the command (default: 'Command menu')
// - loop: boolean - Whether to loop the selection (default: false)
// - dialogProps: DialogProps - Props to pass to the underlying Dialog component
// - container: HTMLElement - Where to render the portal (default: document.body)

// CommandInput Props:
// - placeholder: string - Placeholder text
// - value: string - Controlled input value
// - defaultValue: string - Uncontrolled input value
// - onValueChange: (value: string) => void - Callback when input value changes
// - className: string - Additional CSS classes
// - disabled: boolean - Whether the input is disabled
// - autoFocus: boolean - Auto-focus the input when mounted (default: true)

// CommandItem Props:
// - value: string - Unique value for the item
// - className: string - Additional CSS classes
// - disabled: boolean - Whether the item is disabled
// - onSelect: (value: string) => void - Callback when item is selected
// - forceMount: boolean - Force mounting the item (useful for animations)
// - shortcut: string - Keyboard shortcut to display
// - asChild: boolean - Merge with child element (default: false)


==============================================
// Context Menu
==============================================
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

// Components and their purposes:
// - ContextMenu: Root component that manages the menu state
// - ContextMenuTrigger: The element that triggers the context menu
// - ContextMenuContent: The container for the menu items
// - ContextMenuItem: A single menu item
// - ContextMenuCheckboxItem: A menu item with a checkbox
// - ContextMenuRadioGroup: A group of radio items
// - ContextMenuRadioItem: A radio item within a radio group
// - ContextMenuSub: A submenu container
// - ContextMenuSubTrigger: A trigger for a submenu
// - ContextMenuSubContent: The content of a submenu
// - ContextMenuLabel: A label for a group of items
// - ContextMenuSeparator: A visual separator between items
// - ContextMenuShortcut: A keyboard shortcut hint
// - ContextMenuPortal: Portals the menu content to the body (useful for z-index issues)

// ContextMenu Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Default open state (uncontrolled)
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - modal: boolean - Whether to render as a modal (default: true)
// - dir: 'ltr' | 'rtl' - Direction of the menu
// - onEscapeKeyDown: (event: KeyboardEvent) => void - Callback when Escape key is pressed
// - onPointerDownOutside: (event: PointerDownOutsideEvent) => void - Callback when clicking outside
// - onFocusOutside: (event: FocusOutsideEvent) => void - Callback when focus moves outside
// - onInteractOutside: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void - Callback for any outside interaction
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// ContextMenuContent Props:
// - align: 'start' | 'center' | 'end' - Alignment relative to trigger (default: 'start')
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side (default: 'bottom')
// - sideOffset: number - Distance from trigger in pixels (default: 0)
// - avoidCollisions: boolean - Avoid viewport collisions (default: true)
// - collisionBoundary: Element | null | Array<Element | null> - Boundary for collision detection
// - collisionPadding: number | { top: number, right: number, bottom: number, left: number } - Padding for collision detection
// - arrowPadding: number - Padding for the arrow (default: 0)
// - sticky: 'partial' | 'always' - Sticky behavior (default: 'partial')
// - hideWhenDetached: boolean - Hide when trigger is not in viewport (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// Common Props for Menu Items:
// - disabled: boolean - Whether the item is disabled
// - onSelect: (event: Event) => void - Callback when the item is selected
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)


==============================================
// Drawer
==============================================
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerFooter, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerClose,
  DrawerOverlay
} from "@/components/ui/drawer"

// Components and their purposes:
// - Drawer: Root component that manages the drawer state
// - DrawerTrigger: Button that opens the drawer
// - DrawerOverlay: The overlay that appears behind the drawer
// - DrawerContent: The main container for the drawer content
// - DrawerHeader: Container for the drawer's header
// - DrawerTitle: The title of the drawer
// - DrawerDescription: Optional description text
// - DrawerFooter: Container for the drawer's footer
// - DrawerClose: Button that closes the drawer

// Drawer Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Default open state (uncontrolled)
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - direction: 'top' | 'right' | 'bottom' | 'left' - From which direction the drawer appears (default: 'right')
// - shouldScaleBackground: boolean - Whether to scale the background when the drawer is open (default: true)
// - preventScrollRestoration: boolean - Prevent scroll restoration (default: false)
// - closeOnEscape: boolean - Close on Escape key press (default: true)
// - closeOnOutsideClick: boolean - Close when clicking outside (default: true)
// - shouldCloseOnInteractOutside: (element: HTMLElement) => boolean - Control whether to close on outside interactions
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// DrawerContent Props:
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onOpenAutoFocus: (event: Event) => void - Callback when the drawer opens and focus is moved into it
// - onCloseAutoFocus: (event: Event) => void - Callback when the drawer closes and focus is moved back to the trigger
// - onEscapeKeyDown: (event: KeyboardEvent) => void - Callback when the Escape key is pressed
// - onPointerDownOutside: (event: PointerDownOutsideEvent) => void - Callback when a pointer event occurs outside the drawer
// - onFocusOutside: (event: FocusOutsideEvent) => void - Callback when focus moves outside the drawer
// - onInteractOutside: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void - Callback when an interaction occurs outside the drawer


==============================================
// Hover Card
==============================================
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Components and their purposes:
// - HoverCard: The root container for the hover card
// - HoverCardTrigger: The element that triggers the hover card
// - HoverCardContent: The content shown when hovering

// HoverCard Props:
// - open: boolean - Controlled open state
// - defaultOpen: boolean - Default open state (uncontrolled)
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - openDelay: number - Delay in ms before showing the card (default: 700)
// - closeDelay: number - Delay in ms before hiding the card (default: 300)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// HoverCardTrigger Props:
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// HoverCardContent Props:
// - align: 'start' | 'center' | 'end' - Alignment relative to trigger (default: 'center')
// - side: 'top' | 'right' | 'bottom' | 'left' - Preferred side (default: 'bottom')
// - sideOffset: number - Distance from trigger in pixels (default: 4)
// - alignOffset: number - Alignment offset in pixels (default: 0)
// - avoidCollisions: boolean - Avoid viewport collisions (default: true)
// - collisionBoundary: Element | null | Array<Element | null> - Boundary for collision detection
// - collisionPadding: number | { top: number, right: number, bottom: number, left: number } - Padding for collision detection
// - arrowPadding: number - Padding for the arrow (default: 0)
// - sticky: 'partial' | 'always' - Sticky behavior (default: 'partial')
// - hideWhenDetached: boolean - Hide when trigger is not in viewport (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - asChild: boolean - Merge with child element (default: false)


==============================================
// Resizable
==============================================
import { 
  ResizablePanel, 
  ResizablePanelGroup, 
  ResizableHandle 
} from "@/components/ui/resizable"

// Components and their purposes:
// - ResizablePanelGroup: The container that holds resizable panels
// - ResizablePanel: A resizable panel that can be resized by the user
// - ResizableHandle: The draggable handle between panels

// ResizablePanelGroup Props:
// - direction: 'horizontal' | 'vertical' - The direction of the panel group (default: 'horizontal')
// - autoSaveId: string - Unique ID to persist the layout in localStorage
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onLayout: (sizes: number[]) => void - Callback when the layout changes
// - onLayoutChange: (sizes: number[]) => void - Alias for onLayout
// - onResize: (sizes: number[]) => void - Callback during resize
// - onResizeStart: (sizes: number[]) => void - Callback when resize starts
// - onResizeEnd: (sizes: number[]) => void - Callback when resize ends
// - storageKey: string - Key for localStorage (default: 'react-resizable-panels')

// ResizablePanel Props:
// - defaultSize: number - Default size of the panel (percentage, 0-100)
// - minSize: number - Minimum size of the panel (percentage, 0-100)
// - maxSize: number - Maximum size of the panel (percentage, 0-100)
// - order: number - Order of the panel in the group
// - collapsible: boolean - Whether the panel can be collapsed (default: false)
// - collapsedSize: number - Size when collapsed (default: 0)
// - defaultCollapsed: boolean - Whether the panel is collapsed by default
// - onCollapse: (collapsed: boolean) => void - Callback when collapse state changes
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onResize: (size: number) => void - Callback when the panel is resized
// - onResizeStart: (size: number) => void - Callback when resize starts
// - onResizeEnd: (size: number) => void - Callback when resize ends

// ResizableHandle Props:
// - withHandle: boolean - Whether to show a visual handle (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - disabled: boolean - Whether the handle is disabled
// - onDragging: (isDragging: boolean) => void - Callback when dragging state changes


==============================================
// Sidebar
==============================================
import { 
  Sidebar, 
  SidebarGroup, 
  SidebarItem, 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
  SidebarCollapse,
  SidebarCollapseTrigger,
  SidebarCollapseContent
} from "@/components/ui/sidebar"

// Components and their purposes:
// - Sidebar: The root container for the sidebar
// - SidebarHeader: Header section of the sidebar
// - SidebarContent: Scrollable content area of the sidebar
// - SidebarFooter: Footer section of the sidebar
// - SidebarGroup: Logical grouping of sidebar items
// - SidebarItem: Individual navigation item
// - SidebarMenu: Collapsible menu with nested items
// - SidebarMenuItem: Item within a collapsible menu
// - SidebarTrigger: Button to toggle the sidebar (collapsed/expanded)
// - SidebarCollapse: Container for collapsible content
// - SidebarCollapseTrigger: Button to toggle collapsible content
// - SidebarCollapseContent: Content that can be shown/hidden

// Sidebar Props:
// - collapsed: boolean - Whether the sidebar is collapsed
// - defaultCollapsed: boolean - Default collapsed state (uncontrolled)
// - onCollapse: (collapsed: boolean) => void - Callback when collapsed state changes
// - collapsedWidth: number | string - Width when collapsed (default: '4rem')
// - width: number | string - Width when expanded (default: '16rem')
// - breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Breakpoint for responsive behavior
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - variant: 'default' | 'compact' | 'floating' - Visual variant of the sidebar
// - position: 'left' | 'right' - Position of the sidebar (default: 'left')

// SidebarItem Props:
// - active: boolean - Whether the item is active
// - disabled: boolean - Whether the item is disabled
// - icon: React.ReactNode - Icon to display before the label
// - badge: string | number | React.ReactNode - Badge to display after the label
// - asChild: boolean - Merge with child element (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - onSelect: (event: Event) => void - Callback when item is selected

// SidebarMenu Props:
// - title: string - Title of the menu
// - icon: React.ReactNode - Icon to display before the title
// - defaultOpen: boolean - Whether the menu is open by default
// - open: boolean - Controlled open state
// - onOpenChange: (open: boolean) => void - Callback when open state changes
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles


==============================================
// Sonner (Toast)
==============================================
import { Toaster as Sonner } from "@/components/ui/sonner"
import { toast } from "sonner"

// Components and their purposes:
// - Sonner: A toast component for displaying temporary notifications
// - toast: Function to trigger toast notifications

// Sonner Props:
// - position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' - Position of the toast (default: 'bottom-right')
// - toastOptions: object - Default options for all toasts
// - richColors: boolean - Enables rich colors for different toast types (default: false)
// - closeButton: boolean - Shows a close button on toasts (default: false)
// - visibleToasts: number - Maximum number of toasts to show at once (default: 3)
// - expand: boolean - Allow toasts to expand when there are multiple (default: false)
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles

// toast() Function Options:
// - id: string - Unique identifier for the toast
// - title: string - Title of the toast
// - description: string - Description text
// - duration: number - Duration in milliseconds (default: 4000)
// - action: { label: string; onClick: () => void } - Action button configuration
// - onDismiss: () => void - Callback when toast is dismissed
// - onAutoClose: () => void - Callback when toast auto-closes
// - className: string - Additional CSS classes
// - style: React.CSSProperties - Custom styles
// - position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' - Override default position
// - icon: React.ReactNode - Custom icon
// - type: 'default' | 'success' | 'error' | 'warning' | 'info' - Toast type

// Example usage of toast():
// toast('Event has been created', {
//   description: 'The event was successfully created',
//   action: {
//     label: 'Undo',
//     onClick: () => console.log('Undo')
//   },
//   type: 'success'
// })
`