import { useEffect, useState } from 'react'
import { isWorkingHours } from '@/lib/workingHours'

export function useWorkingHours() {
  const [working, setWorking] = useState<boolean | null>(null)

  useEffect(() => {
    const update = () => {
      setWorking(isWorkingHours())
    }

    update()

    const interval = window.setInterval(update, 30_000)

    window.addEventListener('focus', update)
    document.addEventListener('visibilitychange', update)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return working
}
