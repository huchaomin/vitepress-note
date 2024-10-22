export default class EventEmitter {
  private events: Map<string, Set<(...args: any[]) => void>>

  constructor() {
    this.events = new Map()
  }

  emit(event: string, ...args: unknown[]): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args)
      })
    }
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    const callbacks = this.events.get(event)
    if (callbacks) {
      if (callback) {
        callbacks.delete(callback)
      } else {
        this.events.delete(event)
      }
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    let callbacks = this.events.get(event)

    if (!callbacks) {
      callbacks = new Set()
      this.events.set(event, callbacks)
    }
    callbacks.add(callback)
  }

  once(event: string, callback: (...args: any[]) => void): void {
    const onceWrapper = (...args: unknown[]) => {
      callback(...args)
      this.off(event, onceWrapper)
    }
    this.on(event, onceWrapper)
  }
}
