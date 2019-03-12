import {InMemoryStoreParams, StoreBuilder} from 'hotballoon'
import {StoreResult} from './StoreResult'
import {OperatorNull} from '../../component/operator/OperatorNull'

/**
 *
 * @param {ComponentTransaction} component
 * @returns {Store}
 */
export const initStoreResult = (component) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  const resultStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreResult,
      (data) => {
        return data instanceof StoreResult
      },
      new StoreResult('', new OperatorNull(), '')
    )
  )

  component.__componentContext.addStore(resultStore)
  return resultStore
}
