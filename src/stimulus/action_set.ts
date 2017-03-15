import { Action } from "./action"
import { Multimap2 } from "./multimap"

export class ActionSet {
  values: Set<Action>
  actionsByEventTarget: Multimap2<EventTarget, string, Action>
  actionsByDelegatedTarget: Multimap2<EventTarget, string, Action>

  constructor() {
    this.values = new Set<Action>()
    this.actionsByEventTarget = new Multimap2<EventTarget, string, Action>()
    this.actionsByDelegatedTarget = new Multimap2<EventTarget, string, Action>()
  }

  get actions(): Action[] {
    return Array.from(this.values)
  }

  add(action: Action) {
    if (!this.values.has(action)) {
      this.values.add(action)
      this.actionsByEventTarget.add(action.eventTarget, action.eventName, action)
      this.actionsByDelegatedTarget.add(action.delegatedTarget, action.eventName, action)
    }
  }

  delete(action: Action) {
    if (this.values.has(action)) {
      this.values.delete(action)
      this.actionsByEventTarget.delete(action.eventTarget, action.eventName, action)
      this.actionsByDelegatedTarget.delete(action.delegatedTarget, action.eventName, action)
    }
  }

  has(action: Action): boolean {
    return this.values.has(action)
  }

  getActionsForEventTargetAndEventName(eventTarget: EventTarget, eventName: string): Action[] {
    return this.actionsByEventTarget.get(eventTarget, eventName)
  }

  getActionsForDelegatedTargetAndEventName(delegatedTarget: EventTarget, eventName: string): Action[] {
    return this.actionsByDelegatedTarget.get(delegatedTarget, eventName)
  }
}
