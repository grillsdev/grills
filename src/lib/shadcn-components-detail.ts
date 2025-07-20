export const compDetail = `
// ===== Button =====
import { Button } from "@/components/ui/button"
// Props: variant: 'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'
// size: 'default'|'sm'|'lg'|'icon', asChild, isLoading, disabled, type: 'button'|'submit'|'reset'


// ===== Accordion =====
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
// Components: Accordion (root), AccordionItem, AccordionTrigger, AccordionContent
// Props:
// - Accordion: type, collapsible, value, defaultValue, onValueChange
// - Item: value, disabled
// - Trigger: asChild, disabled
// - Content: forceMount

// ===== Tooltip =====
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
// Components: Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
// Props:
// - delayDuration (default: 700ms), defaultOpen, open, onOpenChange, disableHoverableContent
// - Trigger: asChild, disabled
// - Content: side, sideOffset, align, alignOffset, avoidCollisions, collisionPadding, sticky, hideWhenDetached

==============================================
// Alert
==============================================
import { Alert, AlertTitle, AlertDescription, AlertIcon } from "@/components/ui/alert"
// Components: Alert (container), AlertTitle, AlertDescription, AlertIcon
// Props:
// - Alert: variant: 'default'|'destructive'|'success'|'info', asChild, className
// - AlertTitle/Description: asChild, className
// - AlertIcon: variant, className
// - className: string - Additional CSS classes

// Components and their purposes:
// - Alert: Container for alert messages with different variants
// - AlertTitle: Bold title text for the alert
// - AlertDescription: Secondary text with additional details
// - AlertIcon: Visual indicator that matches the alert variant

==============================================
// Dialog (Modal)
==============================================
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription} from "@/components/ui/dialog"
// Components: Dialog (root), DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription
// Props:
// - Dialog: open, onOpenChange, defaultOpen, modal
// - Trigger: asChild, className
// - Content: onEscapeKeyDown, onPointerDownOutside, onInteractOutside, forceMount, asChild
// - Header/Footer/Title/Description/Close: asChild, className

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


==============================================
// Dropdown Menu =====
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu"
// Components: DropdownMenu (root), DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup
// Common Props (most components):
// - asChild, className, style
// - disabled (for interactive components)
// Key Props:
// - DropdownMenu: open, onOpenChange, defaultOpen, modal, dir
// - Content: side, sideOffset, align, alignOffset, avoidCollisions, collisionPadding, sticky, hideWhenDetached
// - Item: onSelect, disabled
// - CheckboxItem: checked, onCheckedChange
// - RadioItem/RadioGroup: value, onValueChange
// - Sub: open, onOpenChange, defaultOpen
// - SubContent: sideOffset, alignOffset, forceMount

==============================================
// Form =====
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
// Components: Form (root), FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Form: form (useForm), onSubmit
// - FormField: name, control, render, defaultValue, rules, shouldUnregister
// - FormControl: Wraps form inputs
// - FormLabel/Description/Message: For labeling and feedback

==============================================
// Tabs
==============================================
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Components: Tabs (root), TabsList (container), TabsTrigger (tab button), TabsContent (tab panel)
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Tabs: value, defaultValue, onValueChange, orientation, dir, activationMode
// - TabsTrigger: value, disabled
// - TabsContent: value, forceMount

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
==============================================
// Card =====
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
// Components: Card (container), CardHeader, CardFooter, CardTitle, CardDescription, CardContent
// Common Props (all components):
// - asChild, className, style
// Usage:
// <Card>
//   <CardHeader><CardTitle>Title</CardTitle><CardDescription>Desc</CardDescription></CardHeader>
//   <CardContent>Content</CardContent>
//   <CardFooter>Actions</CardFooter>
// </Card>

==============================================
// Avatar =====
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// Components: Avatar (root), AvatarImage, AvatarFallback
// Common Props (all components):
// - asChild, className, style
// Key Props:
// - AvatarImage: src, alt, onLoadingStatusChange
// - AvatarFallback: delayMs (default: 600ms)
// Usage:
// <Avatar>
//   <AvatarImage src="..." alt="..." />
//   <AvatarFallback>CN</AvatarFallback>
// </Avatar>

// Common Props for all Avatar components:
// - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' - Size of the avatar (default: 'md')
// - shape: 'circle' | 'square' - Shape of the avatar (default: 'circle')
// - variant: 'default' | 'outline' | 'ghost' - Visual style variant (default: 'default')

==============================================
// Badge =====
import { Badge } from "@/components/ui/badge"
// Components: Badge (status indicator)
// Common Props:
// - asChild, className, style
// Key Props:
// - variant: 'default'|'secondary'|'destructive'|'outline'|'ghost'|'success'|'warning'|'info'
// - size: 'default'|'sm'|'lg'
// Usage: <Badge variant="outline">New</Badge>

==============================================
// Checkbox =====
import { Checkbox } from "@/components/ui/checkbox"
// Components: Checkbox (controlled input)
// Common Props:
// - asChild, className, style
// Key Props:
// - checked/onCheckedChange: Controlled state
// - defaultChecked: Uncontrolled state
// - disabled, required: Input states
// - name, value: Form submission
// Usage: <Checkbox checked={value} onCheckedChange={setValue} />

==============================================
// Radio Group =====
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// Components: RadioGroup (container), RadioGroupItem (individual radio)
// Common Props (both components):
// - asChild, className, style
// Key Props:
// - RadioGroup: value/onValueChange (controlled) or defaultValue (uncontrolled)
// - RadioGroupItem: value, disabled, required
// Usage:
// <RadioGroup value={value} onValueChange={setValue}>
//   <RadioGroupItem value="option1" />
//   <RadioGroupItem value="option2" />
// </RadioGroup>

==============================================
// Select
==============================================
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
// Components: Select (root), SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Select: open/onOpenChange, value/onValueChange (or defaultValue), disabled, name, required
// - SelectTrigger: Wraps the select button
// - SelectValue: placeholder, displays selected value
// - SelectContent: side, sideOffset, align, avoidCollisions, position ('item-aligned'|'popper')
// - SelectItem: value, disabled
// - SelectGroup/SelectLabel: For grouping items
// Usage:
// <Select>
//   <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
//   <SelectContent><SelectItem value="item1">Item 1</SelectItem></SelectContent>
// </Select>

==============================================
// Switch
==============================================
import { Switch } from "@/components/ui/switch"
// Components: Switch (toggle input)
// Common Props:
// - asChild, className, style
// Key Props:
// - checked/onCheckedChange: Controlled state
// - defaultChecked: Uncontrolled state
// - disabled, required: Input states
// - name, value: Form submission
// Usage: <Switch checked={value} onCheckedChange={setValue} />

==============================================
// Textarea =====
import { Textarea } from "@/components/ui/textarea"
// Components: Textarea (multi-line input)
// Common Props:
// - asChild, className, style, ref
// Key Props:
// - value/onChange: Controlled input
// - defaultValue: Uncontrolled input
// - disabled, readOnly, required: Input states
// - placeholder: Hint text
// - rows, cols: Dimensions
// - minLength, maxLength: Validation
// - autoFocus, spellCheck: Behavior
// - resize: 'none'|'both'|'horizontal'|'vertical'|'inline'|'block'
// Usage: <Textarea placeholder="Enter text..." />

==============================================
// Toggle =====
import { Toggle } from "@/components/ui/toggle"
// Components: Toggle (pressable button with state)
// Common Props:
// - asChild, className, style
// Key Props:
// - pressed/onPressedChange: Controlled state
// - defaultPressed: Uncontrolled state
// - disabled: Button state
// - variant: 'default'|'outline'|'ghost'|'subtle'
// - size: 'sm'|'md'|'lg'
// Usage: <Toggle pressed={value} onPressedChange={setValue} />

==============================================
// Input OTP
==============================================
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
// Components: InputOTP (root), InputOTPGroup (container), InputOTPSlot (character input), InputOTPSeparator
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - InputOTP: value/onChange, maxLength (default: 6), type ('numeric'|'alphanumeric'|'text'), autoFocus, disabled
// - InputOTPSlot: index, char, isActive, hasFakeCaret
// - InputOTPSeparator: Customizable separator between groups
// Usage:
// <InputOTP maxLength={6}>
//   <InputOTPGroup>
//     <InputOTPSlot index={0} />
//     <InputOTPSlot index={1} />
//     <InputOTPSeparator />
//     <InputOTPSlot index={2} />
//   </InputOTPGroup>
// </InputOTP>

==============================================
// Label
==============================================
import { Label } from "@/components/ui/label"
// Components: Label (form control label)
// Common Props:
// - asChild, className, style
// Key Props:
// - htmlFor: ID of associated form element
// Usage: <Label htmlFor="email">Email</Label>

==============================================
// Menubar =====
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarLabel, MenubarPortal } from "@/components/ui/menubar"
// Components: Menubar (root), MenubarMenu (menu container), MenubarTrigger (button), MenubarContent (dropdown), MenubarItem, MenubarSeparator, MenubarCheckboxItem, MenubarRadioGroup/Item, MenubarSub/SubTrigger/SubContent
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Menubar: value/onValueChange, defaultValue, dir
// - MenubarMenu: value
// - MenubarTrigger: disabled
// - MenubarContent: side, sideOffset, align, avoidCollisions
// - MenubarItem: disabled, onSelect
// - MenubarCheckboxItem: checked/onCheckedChange
// - MenubarRadioGroup/Item: value/onValueChange
// - MenubarSub: open/onOpenChange, defaultOpen
// Usage: See official docs for complex menu structures

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
// ===== Pagination =====
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// Components: Pagination (root), PaginationContent (container), PaginationItem, PaginationLink (page numbers), PaginationPrevious/Next (navigation), PaginationEllipsis (truncation)
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Pagination: page/total/onPageChange, pageSize, showSizeChanger, showQuickJumper, showTotal
// - PaginationLink: isActive, disabled
// - PaginationPrevious/Next: disabled
// Usage:
// <Pagination page={1} total={100} onPageChange={setPage}>
//   <PaginationContent>...</PaginationContent>
// </Pagination>

==============================================
// ===== Popover =====
import { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose } from "@/components/ui/popover"
// Components: Popover (root), PopoverTrigger (button), PopoverContent (popup), PopoverAnchor (positioning), PopoverClose (close button)
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Popover: open/onOpenChange, defaultOpen, modal, dir
// - PopoverContent: side, sideOffset, align, avoidCollisions, forceMount
// - PopoverClose: Closes the popover when clicked
// Usage:
// <Popover>
//   <PopoverTrigger>Open</PopoverTrigger>
//   <PopoverContent>Content</PopoverContent>
// </Popover>
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
==============================================
// ===== Progress =====
import { Progress } from "@/components/ui/progress"
// Components: Progress (indeterminate/determinate progress indicator)
// Common Props:
// - asChild, className, style
// Key Props:
// - value: number (0-100) - Current progress percentage
// - variant: 'default'|'success'|'warning'|'error'
// - size: 'sm'|'md'|'lg'
// - showValue: boolean - Show percentage
// Usage: <Progress value={75} />

==============================================
// ===== Scroll Area =====
import { ScrollArea } from "@/components/ui/scroll-area"
// Components: ScrollArea (custom scrollable container)
// Common Props:
// - asChild, className, style
// Key Props:
// - type: 'auto'|'always'|'scroll'|'hover' (default: 'hover')
// - scrollHideDelay: number (default: 600ms)
// - orientation: 'horizontal'|'vertical'|'both'
// - scrollbarSize: number (default: 10)
// - viewportRef: Ref to viewport element
// - onScroll, onScrollToTop, onScrollToBottom: Event handlers
// Usage: <ScrollArea className="h-72">Content</ScrollArea>
// - 'data-orientation': 'horizontal' | 'vertical' - Used internally for styling

==============================================
// ===== Separator =====
import { Separator } from "@/components/ui/separator"
// Components: Separator (horizontal/vertical divider)
// Common Props:
// - asChild, className, style
// Key Props:
// - orientation: 'horizontal'|'vertical' (default: 'horizontal')
// - decorative: boolean (default: true) - For accessibility
// Usage: <Separator className="my-4" />

==============================================
// ===== Sheet =====
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// Components: Sheet (root), SheetTrigger (button), SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose
// Common Props (most components):
// - asChild, className, style
// Key Props:
// - Sheet: open/onOpenChange, defaultOpen, modal, dir
// - SheetContent: side ('top'|'right'|'bottom'|'left'), size ('sm'|'md'|'lg'|'xl'|'full'), forceMount
// - Event handlers: onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside
// Usage:
// <Sheet>
//   <SheetTrigger>Open</SheetTrigger>
//   <SheetContent>
//     <SheetHeader><SheetTitle>Title</SheetTitle></SheetHeader>
//     Content
//   </SheetContent>
// </Sheet>

// ===== Skeleton =====
import { Skeleton } from "@/components/ui/skeleton"
// Components: Skeleton (loading placeholder)
// Common Props:
// - asChild, className, style
// Key Props:
// - isLoaded: boolean - Show content when true
// - fadeDuration: number (default: 200ms)
// - height/width: string|number - Dimensions
// - noOfLines: number - For text placeholders
// - spacing: string|number - Between lines
// Usage: <Skeleton className="h-4 w-[200px]" />

// ===== Slider =====
import { Slider } from "@/components/ui/slider"
// Components: Slider (range input)
// Common Props:
// - asChild, className, style
// Key Props:
// - value/onValueChange - Controlled value (number[] for range)
// - defaultValue - Uncontrolled initial value
// - min/max/step - Range configuration (default: 0-100, step 1)
// - disabled - Disable interaction
// - orientation: 'horizontal'|'vertical'
// - showTicks - Show tick marks
// - formatLabel - Custom value formatter
// Usage:
// <Slider defaultValue={[50]} max={100} step={1} />


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