import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenerActionNumberInputParams {
  /**
   * @param {ActionNumberInput} actionNumberInput
   * @param {PublicStoreHandler} resultStoreHandler
   * @param {StoreResult} resultStore
   */
  constructor(actionNumberInput, resultStoreHandler, resultStore) {
    assert(TypeCheck.isAction(actionNumberInput),
      'ComponentCalculator:ListenerActionNumberInputParams: actionNumberInput should be an action'
    )

    assert(TypeCheck.isStore(resultStore),
      'ComponentCalculator:ListenerActionNumberInputParams: resultStore should be a store'
    )
    this.actionNumberInput = actionNumberInput
    this.resultStoreHandler = resultStoreHandler
    this.resultStore = resultStore
  }
}

/**
 *
 * @param {ListenerActionNumberInputParams} params
 */
export const listenActionNumberInput = (params) => {
  params.actionNumberInput.listenWithCallback((payload) => {
    if (params.resultStoreHandler.data().operator() === '') {
      params.resultStore.set(
        params.resultStore.state().data.withLexp(
          params.resultStoreHandler.data().lexp().concat(payload.number()).toString()
        )
      )
    } else {
      params.resultStore.set(
        params.resultStore.state().data.withRexp(
          params.resultStoreHandler.data().rexp().concat(payload.number())
        )
      )
    }
  })
}
