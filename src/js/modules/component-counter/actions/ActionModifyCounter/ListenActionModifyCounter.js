import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenActionModifyCounterParams {
  constructor(actionModifyCounter, counterStore) {
    assert(TypeCheck.isAction(actionModifyCounter),
      'ComponentCounter:ListenActionModifyCounterParams: ActionChangeAction should be an action'
    )

    assert(TypeCheck.isStore(counterStore),
      'ComponentCounter:ListenActionModifyCounterParams: counterStore should be a store'
    )
    this.actionModifyCounter = actionModifyCounter
    this.counterStore = counterStore
  }
}
/**
 *
 * @param {ListenActionModifyCounterParams} params
 */
export const listenActionModifyCounter = (params) => {
  params.actionModifyCounter
    .listenWithCallback((payload) => {
      let result = params.counterStore.state().data.count() + payload.sum()
      params.counterStore.set(params.counterStore.state().data.withCount(result < 0 ? 0 : result))
    })
}
