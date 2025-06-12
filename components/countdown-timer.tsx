"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        clearInterval(interval)
        setIsExpired(true)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Course Available Now!</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center space-x-4 text-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 bg-clip-text text-transparent">
          {timeLeft.days}
        </span>
        <span className="text-xs text-muted-foreground">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 bg-clip-text text-transparent">
          {timeLeft.hours}
        </span>
        <span className="text-xs text-muted-foreground">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 bg-clip-text text-transparent">
          {timeLeft.minutes}
        </span>
        <span className="text-xs text-muted-foreground">Minutes</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-indigo-700 to-cyan-500 bg-clip-text text-transparent">
          {timeLeft.seconds}
        </span>
        <span className="text-xs text-muted-foreground">Seconds</span>
      </div>
    </div>
  )
}
