import {COUNT_STORE, StoreDataCounter} from '../../stores/StoreDataCounter'
import {State, InMemoryStorage} from 'hotballoon'
import {StoreCounter} from '../../stores/StoreCounter'

/**
 *
 * @param {ComponentCounter} component
 * @return {Store}
 */
export const addStoreCounter = (component) => {
  return component.__componentContext.addStore(
    new StoreCounter(COUNT_STORE, new InMemoryStorage(
      new State(COUNT_STORE, new StoreDataCounter(0)),
      new StoreDataCounter())
    )
  )
}
