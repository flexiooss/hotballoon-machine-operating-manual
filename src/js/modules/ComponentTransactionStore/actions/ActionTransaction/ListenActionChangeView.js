import {assert} from 'flexio-jshelpers'
import {StoreTransaction} from '../../stores/StoreTransaction/StoreTransaction'

/**
 *
 * @param {DocComponent} component
 */
export const listenActionTransaction = (component) => {
  assert(component.__actionTransaction !== 'undefined',
    'listenActionTransaction: ActionTransaction should be initialized before using it'
  )

  component.__actionTransaction
    .listenWithCallback((payload) => {
      if (payload.isActive !== component.__transactionStoreHandler.isRunning) {
        component.__transactionStore.set(new StoreTransaction(payload.isActive))
      }
    })
}
