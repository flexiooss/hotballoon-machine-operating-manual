import {Job} from '../../component/cunsumers/JobResult'
import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenerActionResultInputParams {
  /**
   * @param {actionResultInput} actionResultInput
   * @param {PublicStoreHandler} resultStoreHandler
   * @param {StoreResult} resultStore
   * @param transactionActionDispatcher
   * @param ID
   * @param executor
   */
  constructor(actionResultInput, resultStoreHandler, resultStore, transactionActionDispatcher, ID, executor) {
    assert(TypeCheck.isAction(actionResultInput),
      'ComponentCalculator:ListenerActionResultInputParams: actionResultInput should be an action, %s given',
      typeof actionResultInput
    )

    assert(TypeCheck.isStore(resultStore),
      'ComponentCalculator:ListenerActionOperatorInputParams: resultStore should be a store, %s given',
      typeof resultStore
    )

    this.actionResultInput = actionResultInput
    this.resultStoreHandler = resultStoreHandler
    this.resultStore = resultStore
    this.transactionActionDispatcher = transactionActionDispatcher
    this.ID = ID
    this.executor = executor
  }
}

/**
 *
 * @param {ListenerActionResultInputParams} params
 */
export const listenActionResultInput = (params) => {
  params.actionResultInput.listenWithCallback((payload) => {
    if (params.resultStoreHandler.data().operator() === '/' && params.resultStoreHandler.data().rexp() === '0') {
      params.resultStore.set(
        params.resultStore.state().data.withRexp('').withOperator('').withLexp('')
      )
    } else {
      if (params.resultStoreHandler.data().lexp() !== '' &&
        params.resultStoreHandler.data().rexp() !== '' &&
        params.resultStoreHandler.data().operator() !== '') {
        params.executor.process(new Job(payload, params))
      }
    }
  })
}
