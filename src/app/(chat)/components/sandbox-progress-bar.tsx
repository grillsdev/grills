/**
 * A fast-moving progress bar component that simulates fast forwarding progress over 120 seconds.
 * Built using ShadCN UI Progress component.
 */
import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const duration = 120 * 1000; // 120 seconds in milliseconds
  const speedFactor = 6; // Increase this value to speed up the progress

  const animate = (currentTime: number) => {
    if (!startTimeRef.current) startTimeRef.current = currentTime;
    const elapsedTime = currentTime - startTimeRef.current;

    // Calculate progress percentage with increased speed
    const newProgress = Math.min((elapsedTime / duration) * 100 * speedFactor, 100);
    setProgress(newProgress);

    // Continue the animation until the progress reaches 100%
    if (newProgress < 100) {
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto">
      <Progress value={progress} max={100} className="h-1.5" />
    </div>
  )
}


export default ProgressBar