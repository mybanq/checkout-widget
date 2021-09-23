import { RefObject, useLayoutEffect } from 'react'

export const useEventEffect = <T extends HTMLDivElement>(
  ref: RefObject<T>,
  eventName: string,
  callback?: (args: any) => void
) => {
  useLayoutEffect(() => {
    const { current } = ref
    if (!current) return () => ({})
    if (callback) current.addEventListener(eventName, callback)
    return () => {
      if (callback) current.removeEventListener(eventName, callback)
    }
  }, [ref, callback, eventName])
}
