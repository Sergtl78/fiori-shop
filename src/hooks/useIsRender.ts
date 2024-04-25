import { useEffect, useState } from 'react'

export const useIsRender = () => {
  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    setIsRender(true)
  }, [])
  return isRender
}
