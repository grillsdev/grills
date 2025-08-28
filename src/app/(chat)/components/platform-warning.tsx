import { useEffect, useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'


export function PlatformWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    const isDesktop = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (!isChrome || !isDesktop) {
      setShowWarning(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    setTimeout(() => setShowWarning(false), 300)
  }

  if (!showWarning || isDismissed) return null

  return (
    <div 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${isDismissed ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-xl shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-800">
              Platform Warning
            </h3>
            <p className="text-sm text-amber-700 mt-1">
             Currently, live preview only works on Desktop Chrome.
             It may not work on your current platform.
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 -mt-1 -mr-1 p-1 rounded-md hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-50"
            aria-label="Dismiss warning"
          >
            <X className="h-4 w-4 text-amber-600" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlatformWarning