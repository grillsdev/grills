// UI build be Horizon beta on grills

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface OnboardingDialogProps {
  storageKey?: string
  defaultOpen?: boolean
}

function useLocalStorageBoolean(key: string, initialValue: boolean) {
  const [value, setValue] = useState<boolean>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return initialValue
      return item === 'true'
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (next: boolean) => {
    try {
      setValue(next)
      window.localStorage.setItem(key, String(next))
    } catch {
      setValue(next)
    }
  }

  return [value, setStoredValue] as const
}

export function OnboardingDialog(props: OnboardingDialogProps) {
  const { storageKey = 'grills-onboarding-dialog', defaultOpen = true } = props

  const [dismissed, setDismissed] = useLocalStorageBoolean(storageKey, false)
  const [open, setOpen] = useState<boolean>(false)
  const [neverShowAgain, setNeverShowAgain] = useState<boolean>(false)

  // Open only if not previously dismissed, with a 1s delay
  useEffect(() => {
    if (!dismissed && defaultOpen) {
      const timer = window.setTimeout(() => setOpen(true), 450)
      return () => window.clearTimeout(timer)
    }
  }, [dismissed, defaultOpen])

  const handleClose = () => {
    if (neverShowAgain) {
      setDismissed(true)
    }
    setOpen(false)
  }

  const descriptionId = 'onboarding-desc'

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Hidden trigger for accessibility if needed by screen readers */}
      <DialogTrigger asChild>
        <button className="hidden" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent aria-describedby={descriptionId} className="sm:max-w-lg bg-accent text-accent-foreground">
        <DialogHeader className='text-left'>
          <DialogTitle>Early Beta</DialogTitle>
          <DialogDescription id={descriptionId}>
            This app is currently a proof of concept. So you may notice frequent updates and changes as we continue to improve the experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 text-sm">
          <section className="space-y-2">
            <h3 className="font-medium">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tested on Chrome on macOS (M1).</li>
              <li>Chromium browser recommended.</li>
              <li>Bring your own OpenRouter API key to use the app.</li>
              <li>You can generate and save custom themes for your project.</li>
              <li>Initial UI rendering may be slow due to limitations.</li>
              <li>If you encounter issues, reach out on Twitter.</li>
            </ul>
          </section>
          <div className="flex items-start gap-2">
            <Checkbox
              id="never-show-onboarding"
              checked={neverShowAgain}
              onCheckedChange={(c) => setNeverShowAgain(Boolean(c))}
              aria-describedby="never-show-onboarding-hint"
            />
            <div className="grid gap-1">
              <Label htmlFor="never-show-onboarding">Never show this again</Label>
              <p id="never-show-onboarding-hint" className="text-muted-foreground text-xs">
                We will remember this preference on this device.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button type="button" className="w-full" onClick={handleClose} aria-label="Close onboarding dialog">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

