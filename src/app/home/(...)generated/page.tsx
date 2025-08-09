'use client'

import React, { useMemo, useState } from 'react'
import { X, ArrowLeft, Bell, BookText, CheckCircle2, ChevronLeft, GitBranch, Hash, HelpCircle, Inbox, Link2, Menu, MessageCircle, Pencil, PlugZap, Search, Shield, Smile, Sparkles, Tags, User, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar'
import Link from 'next/link'

// Types
export type NavKey =
  | 'preferences.profile'
  | 'preferences.notifications'
  | 'preferences.security'
  | 'preferences.accounts'
  | 'issues.labels'
  | 'issues.templates'
  | 'issues.slas'
  | 'projects.labels'
  | 'projects.templates'
  | 'projects.statuses'
  | 'projects.updates'
  | 'features.initiatives'
  | 'features.documents'
  | 'features.requests'
  | 'features.pulse'
  | 'features.asks'
  | 'features.emojis'
  | 'features.integrations'

type NavItem = { key: NavKey; label: string; icon: React.ReactNode }

type NavSection = { id: 'preferences' | 'issues' | 'projects' | 'features'; label: string; items: NavItem[] }

// Navigation data
const navSections: NavSection[] = [
  {
    id: 'preferences',
    label: 'Preferences',
    items: [
      { key: 'preferences.profile', label: 'Profile', icon: <User className='size-4' aria-hidden /> },
      { key: 'preferences.notifications', label: 'Notifications', icon: <Bell className='size-4' aria-hidden /> },
      { key: 'preferences.security', label: 'Security & access', icon: <Shield className='size-4' aria-hidden /> },
      { key: 'preferences.accounts', label: 'Connected accounts', icon: <Link2 className='size-4' aria-hidden /> },
    ],
  },
  {
    id: 'issues',
    label: 'Issues',
    items: [
      { key: 'issues.labels', label: 'Labels', icon: <Tags className='size-4' aria-hidden /> },
      { key: 'issues.templates', label: 'Templates', icon: <Pencil className='size-4' aria-hidden /> },
      { key: 'issues.slas', label: 'SLAs', icon: <CheckCircle2 className='size-4' aria-hidden /> },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    items: [
      { key: 'projects.labels', label: 'Labels', icon: <Hash className='size-4' aria-hidden /> },
      { key: 'projects.templates', label: 'Templates', icon: <Pencil className='size-4' aria-hidden /> },
      { key: 'projects.statuses', label: 'Statuses', icon: <Workflow className='size-4' aria-hidden /> },
      { key: 'projects.updates', label: 'Updates', icon: <Sparkles className='size-4' aria-hidden /> },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    items: [
      { key: 'features.initiatives', label: 'Initiatives', icon: <GitBranch className='size-4' aria-hidden /> },
      { key: 'features.documents', label: 'Documents', icon: <BookText className='size-4' aria-hidden /> },
      { key: 'features.requests', label: 'Customer requests', icon: <Inbox className='size-4' aria-hidden /> },
      { key: 'features.pulse', label: 'Pulse', icon: <Sparkles className='size-4' aria-hidden /> },
      { key: 'features.asks', label: 'Asks', icon: <MessageCircle className='size-4' aria-hidden /> },
      { key: 'features.emojis', label: 'Emojis', icon: <Smile className='size-4' aria-hidden /> },
      { key: 'features.integrations', label: 'Integrations', icon: <PlugZap className='size-4' aria-hidden /> },
    ],
  },
]

function getLabelFromKey(key: NavKey): string {
  const found = navSections.flatMap((s) => s.items).find((i) => i.key === key)
  return found?.label ?? 'Settings'
}

// Shared section row
function SectionRow({ id, label, description, control }: { id: string; label: string; description?: string; control: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='max-w-xl'>
        <Label htmlFor={id} className='text-base'>
          {label}
        </Label>
        {description ? <p className='mt-1 text-sm text-muted-foreground'>{description}</p> : null}
      </div>
      <div className='mt-2 sm:mt-0'>{control}</div>
    </div>
  )
}

// Preferences - Profile
function PreferencesProfile() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-lg font-medium'>General</h2>
        <div className='divide-y'>
          <SectionRow id='full-name' label='Full name' description='Your display name visible to teammates.' control={<Input id='full-name' placeholder='Enter your full name' aria-label='Full name' />} />
          <SectionRow id='username' label='Username' description='Used for mentions and profile URL.' control={<Input id='username' placeholder='username' aria-label='Username' />} />
          <SectionRow id='email' label='Email' description='Primary contact email (read-only).' control={<Input id='email' value='jordan@example.com' readOnly aria-readonly aria-label='Email' />} />
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium'>Interface and theme</h2>
        <div className='divide-y'>
          <SectionRow id='display-full-names' label='Display full names' description='Show full names instead of usernames in the interface.' control={<Switch id='display-full-names' aria-label='Display full names' />} />
          <SectionRow
            id='first-day'
            label='First day of the week'
            description='Defines calendar and timeline week start.'
            control={
              <Select>
                <SelectTrigger id='first-day' aria-label='First day of the week' className='w-44'>
                  <SelectValue placeholder='Select day' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='monday'>Monday</SelectItem>
                  <SelectItem value='sunday'>Sunday</SelectItem>
                  <SelectItem value='saturday'>Saturday</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium'>Desktop application</h2>
        <div className='divide-y'>
          <SectionRow id='launch-on-startup' label='Launch on startup' description='Automatically open the app when your computer starts.' control={<Switch id='launch-on-startup' aria-label='Launch on startup' />} />
        </div>
      </div>
    </div>
  )
}

function PreferencesNotifications() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-lg font-medium'>Email notifications</h2>
        <div className='divide-y'>
          <SectionRow id='email-mentions' label='Mentions and assignments' description='Receive an email when you are mentioned or assigned.' control={<Switch id='email-mentions' aria-label='Email for mentions and assignments' />} />
          <SectionRow id='digest-frequency' label='Digest frequency' description='Periodic summary of updates.' control={
            <Select>
              <SelectTrigger id='digest-frequency' aria-label='Digest frequency' className='w-44'>
                <SelectValue placeholder='Choose' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='off'>Off</SelectItem>
                <SelectItem value='daily'>Daily</SelectItem>
                <SelectItem value='weekly'>Weekly</SelectItem>
              </SelectContent>
            </Select>
          } />
        </div>
      </div>

      <div>
        <h2 className='text-lg font-medium'>Push notifications</h2>
        <div className='divide-y'>
          <SectionRow id='push-inbox' label='Inbox changes' description='Notify on new comments and status changes.' control={<Switch id='push-inbox' aria-label='Push for inbox changes' />} />
        </div>
      </div>
    </div>
  )
}

function PreferencesSecurity() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-lg font-medium'>Authentication</h2>
        <div className='divide-y'>
          <SectionRow id='two-factor' label='Two-factor authentication' description='Add an extra layer of security to your account.' control={<Switch id='two-factor' aria-label='Two-factor authentication' />} />
          <SectionRow id='session-duration' label='Session duration' description='How long you stay signed in without activity.' control={
            <Select>
              <SelectTrigger id='session-duration' aria-label='Session duration' className='w-44'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='8h'>8 hours</SelectItem>
                <SelectItem value='24h'>24 hours</SelectItem>
                <SelectItem value='7d'>7 days</SelectItem>
              </SelectContent>
            </Select>
          } />
        </div>
      </div>
    </div>
  )
}

function PreferencesAccounts() {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className='text-lg font-medium'>Connections</h2>
        <div className='divide-y'>
          <SectionRow id='github' label='GitHub' description='Connect your GitHub account to link commits and PRs.' control={<Button variant='outline' aria-label='Connect GitHub'>Connect</Button>} />
          <SectionRow id='slack' label='Slack' description='Connect Slack to receive notifications.' control={<Button variant='outline' aria-label='Connect Slack'>Connect</Button>} />
        </div>
      </div>
    </div>
  )
}

// Demo label data
type LabelRow = { name: string; usage: string; lastApplied: string; created: string }
const demoLabels: LabelRow[] = [
  { name: 'Bug', usage: '124', lastApplied: '2d ago', created: 'Jan 5, 2024' },
  { name: 'Feature', usage: '87', lastApplied: '1d ago', created: 'Feb 18, 2024' },
  { name: 'Design', usage: '33', lastApplied: '5h ago', created: 'Mar 2, 2024' },
  { name: 'Documentation', usage: '12', lastApplied: '4d ago', created: 'Apr 11, 2024' },
]

function IssuesLabels() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    if (!query) return demoLabels
    return demoLabels.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex-1'>
          <h2 className='text-lg font-medium'>Issue labels</h2>
          <p className='mt-1 text-sm text-muted-foreground'>Manage label groups and labels for issues.</p>
        </div>
        <div className='w-full flex flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2'>
          <div className='relative w-full sm:w-64'>
            <Search className='absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' aria-hidden />
            <Input aria-label='Search labels' placeholder='Search labels' className='pl-8' value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className='flex gap-2'>
            <Button variant='outline'>New group</Button>
            <Button>New label</Button>
          </div>
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Last applied</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.name}>
                <TableCell className='font-medium'>{row.name}</TableCell>
                <TableCell>{row.usage}</TableCell>
                <TableCell>{row.lastApplied}</TableCell>
                <TableCell>{row.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function PlaceholderContent({ title, description }: { title: string; description?: string }) {
  return (
    <div className='space-y-2'>
      <h2 className='text-lg font-medium'>{title}</h2>
      {description ? <p className='text-sm text-muted-foreground'>{description}</p> : null}
      <div className='rounded-md border p-6 text-sm text-muted-foreground'>
        This section is a placeholder for {title} settings.
      </div>
    </div>
  )
}

function ContentRouter({ active }: { active: NavKey }) {
  if (active === 'preferences.profile') return <PreferencesProfile />
  if (active === 'preferences.notifications') return <PreferencesNotifications />
  if (active === 'preferences.security') return <PreferencesSecurity />
  if (active === 'preferences.accounts') return <PreferencesAccounts />
  if (active === 'issues.labels') return <IssuesLabels />

  const label = getLabelFromKey(active)
  return <PlaceholderContent title={label} description='Content coming soon.' />
}

const ExitBtn = () => {
return (
  <Link href={"/home"}>
  <Button
  variant={"outline"}
  size={"icon"}
  className="fixed top-4 right-4 z-50">
      <X  className='text-secondary'/>
    </Button>
  </Link>
)
}
// 1. Main component with named export
export function SettingsLayout(): React.JSX.Element {
  const [active, setActive] = useState<NavKey>('preferences.profile')
  const activeLabel = useMemo(() => getLabelFromKey(active), [active])

  return (
    <SidebarProvider defaultOpen>
      <div className='flex min-h-screen w-full'>
        <Sidebar
          side='left'
          // Adjusted width: small screens (sm) 12.6rem (14rem * 0.9), medium screens (md) 15rem
          className='border-r'
        >
          <SidebarHeader>
            <div className='flex items-center justify-between gap-2 py-1'>
              {/* Back button now visible on all screen sizes */}
              <Button variant='ghost' size='sm' className='justify-start gap-2 flex' aria-label='Back to app'>
                <ArrowLeft className='size-4' aria-hidden />
                <span className='text-sm'>Back to app</span>
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {navSections.map((section) => (
              <SidebarGroup key={section.id}>
                <SidebarGroupLabel className='text-sm font-semibold'>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => {
                      const isActive = active === item.key
                      return (
                        <SidebarMenuItem key={item.key}>
                          <SidebarMenuButton
                            aria-current={isActive ? 'page' : undefined}
                            aria-label={item.label}
                            className={isActive ? 'data-[state=open]:bg-accent bg-accent' : ''}
                            onClick={() => setActive(item.key)}
                          >
                            <div className='flex items-center gap-2'>
                              {item.icon}
                              <span className='truncate'>{item.label}</span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <div className='px-2 pb-2'>
              <Button variant='ghost' size='sm' className='w-full justify-start gap-2' aria-label='Administration'>
                <HelpCircle className='size-4' aria-hidden />
                <span className='text-sm'>Administration</span>
              </Button>
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Content region */}
        <SidebarInset>
          <main role='main' aria-label='Main content' className='w-full p-4 sm:p-6 lg:p-8'>
            {/* Menu button for xs/sm screens */}
            <div className='mb-4 md:hidden border-b flex flex-row items-center -ml-2'>
              <SidebarTrigger className='h-8 w-8 ' aria-label='Toggle sidebar'>
                <Menu className='size-4' /> 
              <ArrowLeft width={"20"}/> 
              </SidebarTrigger>
              <ChevronLeft width={"16"} className='text-base-500'/>
              <span className='font-medium pl-1'>Setting</span>
            </div>

            <div className='mx-auto w-full max-w-xl'>
              <h1 className='mb-4 text-3xl font-semibold'>{activeLabel}</h1>
            </div>

            <div className='mx-auto w-full max-w-xl'>
              <ContentRouter active={active} />
            </div>
          </main>
        </SidebarInset>
      </div> 
      <ExitBtn/>
    </SidebarProvider>
  )
}

export default SettingsLayout

