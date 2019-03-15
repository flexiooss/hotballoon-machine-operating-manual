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
      let registered = [...component.__transactionStore.state().data.registered]
      if (payload.active) {
        if (!component.__transactionStoreHandler.isRegistered(payload.ticket)) {
          registered.push(payload.ticket)
          component.__transactionStore.set(new StoreTransaction(registered))
        }
      } else {
        if (component.__transactionStoreHandler.isRegistered(payload.ticket)) {
          registered = registered.filter(ticket => ticket !== payload.ticket)
          component.__transactionStore.set(new StoreTransaction(registered))
        }
      }
    })
}
