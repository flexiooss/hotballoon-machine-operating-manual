import {FLEXIO_IMPORT_OBJECT, assert} from 'flexio-jshelpers'
import '../../generated/io/package'
import {TypeCheck} from 'hotballoon'

export class ListenerActionOperatorInputParams {
  /**
   * @param {ActionOperatorInput} actionOperatorInput
   * @param {actionResultInput} actionResultInput
   * @param {PublicStoreHandler} resultStoreHandler
   * @param {StoreResult} resultStore
   */
  constructor(actionOperatorInput, actionResultInput, resultStoreHandler, resultStore) {
    assert(TypeCheck.isAction(actionOperatorInput),
      'ComponentCalculator:ListenerActionOperatorInputParams: actionOperatorInput should be an action, %s given',
      typeof actionOperatorInput
    )

    assert(TypeCheck.isAction(actionResultInput),
      'ComponentCalculator:ListenerActionOperatorInputParams: actionResultInput should be an action, %s given',
      typeof actionResultInput
    )

    assert(TypeCheck.isStore(resultStore),
      'ComponentCalculator:ListenerActionOperatorInputParams: resultStore should be a store'
    )
    this.actionOperatorInput = actionOperatorInput
    this.actionResultInput = actionResultInput
    this.resultStoreHandler = resultStoreHandler
    this.resultStore = resultStore
  }
}

/**
 *
 * @type {ActionResultInput}
 */
const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionResultInput

/**
 *
 * @param {ListenerActionOperatorInputParams} params
 */
export const listenActionOperatorInput = (params) => {
  params.actionOperatorInput.listenWithCallback((payload) => {
    if (params.resultStoreHandler.data().lexp() !== '') {
      if (params.resultStoreHandler.data().operator() === '') {
        params.resultStore.set(
          params.resultStore.state().data.withOperator(
            payload.operator()
          )
        )
      } else {
        params.actionResultInput.dispatch(
          new ActionResultInput(payload.operator())
        )
      }
    }
  })
}
