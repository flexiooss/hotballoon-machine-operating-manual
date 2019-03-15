import {StoreBuilder, InMemoryStoreParams} from 'hotballoon'
import {StoreTransaction} from './StoreTransaction'

/**
 *
 * @param {ComponentCounter} component
 * @return {Store}
 */
export const initStoreTransaction = (component) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  const transactionStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreTransaction,
      (data) => {
        return data instanceof StoreTransaction
      },
      new StoreTransaction(new Array(0), false)
    )
  )

  component.__componentContext.addStore(transactionStore)
  return transactionStore
}
