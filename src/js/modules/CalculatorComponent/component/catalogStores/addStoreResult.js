import {RESULT_STORE, StoreDataResult} from '../../stores/StoreDataResult'
import {State, InMemoryStorage} from 'hotballoon'
import {OperatorNull} from '../operator/OperatorNull'
import {StoreResult} from '../../stores/StoreResult'

/**
 *
 * @param {ComponentTransaction} component
 * @returns {Store}
 */
export const addStoreResult = (component) => {
  return component.__componentContext.addStore(
    new StoreResult(RESULT_STORE, new InMemoryStorage(
      new State(RESULT_STORE, new StoreDataResult('', new OperatorNull(), '')),
      new StoreDataResult())
    )
  )
}
