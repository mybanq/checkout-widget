import { ReactText, useCallback, useEffect } from 'react'

export enum EventName {
  styles = 'styles',
  close = 'close',
  login = 'login',
  successPayment = 'successPayment',
}

export interface MessageType<P = unknown> {
  type: EventName
  payload: P
}

const eventsMap: Record<EventName, 'onLogin' | 'onClose' | 'onStyles' | 'onPaymentSuccess'> = {
  [EventName.login]: 'onLogin',
  [EventName.close]: 'onClose',
  [EventName.styles]: 'onStyles',
  [EventName.successPayment]: 'onPaymentSuccess',
}

export interface CheckoutEvents {
  onPaymentSuccess?: () => void
  onClose?: () => void
  onLogin?: (refreshToken: string) => void
  onStyles?: (styles: Record<string, string | number>) => void
}

export const useCheckoutEvents = (events: CheckoutEvents) => {
  const handleEvent = useCallback(
    (e) => {
      const { type, payload } = e?.data as MessageType<string & Record<string, ReactText>>
      const eventName = eventsMap[type]
      events[eventName]?.(payload)
    },
    [events]
  )

  useEffect(() => {
    window.addEventListener('message', handleEvent)
    return () => window.removeEventListener('message', handleEvent)
  })
}
