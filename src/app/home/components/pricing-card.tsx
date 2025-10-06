import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export interface PricingCardProps {
  features?: string[]
}

export default function PricingCard({
  features = [],
}: PricingCardProps) {
  return (
    <Card
      aria-labelledby="pricing-card-title"
      className="rounded-lg shadow-sm max-w-sm relative"
    >
      <CardHeader>
        <CardTitle id="pricing-card-title" className="text-2xl font-bold tracking-wide font-serif">
          Get Grills
        </CardTitle>
        <CardDescription className="text-md font-medium tracking-tight">
          Purchase lifetime access to grills.dev
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col items-baseline">
          <h2 className="text-3xl font-semibold tracking-tight">
            Free For <span className="font-serif italic text-orange-400"> Now </span>
          </h2>
          <p className="text-muted-foreground font-medium tracking-tight">
          Then $39 <span className="tracking-wide font-medium text-xs"> / forever</span>
        </p>
        </div>

        <ul className="flex flex-row gap-2" aria-label="Included features">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-muted text-muted-foreground">
                <Check className="h-3 w-3 text-foreground" aria-hidden />
              </span>
              <span className="text-sm font-medium">{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button 
            variant="outline"
            className="w-full sm:w-auto line-through" 
            aria-label="Purchase Grills"
          >
            Buy Now
          </Button>
          <div className="text-sm text-green-500 sm:ml-4 line-through text-center">
            <strong>30 day</strong> money back guarantee
          </div>
        </div>
      </CardContent>
      
      <BorderBeam duration={5} size={100} className="from-transparent via-orange-400" />
    </Card>
  )
}