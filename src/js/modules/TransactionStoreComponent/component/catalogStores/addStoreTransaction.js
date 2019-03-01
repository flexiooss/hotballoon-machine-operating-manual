import {RESULT_STORE, StoreDataTransaction} from '../../stores/StoreDataTransaction'
import {State, InMemoryStorage} from 'hotballoon'
import {StoreTransaction} from '../../stores/StoreTransaction'

/**
 *
 * @param {ComponentTransaction} component
 * @returns {Store}
 */
export const addStoreTransaction = (component) => {
  return component.__componentContext.addStore(
    new StoreTransaction(RESULT_STORE, new InMemoryStorage(
      new State(RESULT_STORE, new StoreDataTransaction(false)),
      new StoreDataTransaction())
    )
  )
}
