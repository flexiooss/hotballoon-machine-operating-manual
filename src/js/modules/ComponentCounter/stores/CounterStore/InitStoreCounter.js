import {StoreBuilder, InMemoryStoreParams} from 'hotballoon'
import {StoreCounter} from './StoreCounter'

/**
 *
 * @param {ComponentCounter} component
 * @return {Store}
 */
export const initStoreCounter = (component) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  const counterStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreCounter,
      (data) => {
        return data instanceof StoreCounter
      },
      new StoreCounter(0)
    )
  )

  component.__componentContext.addStore(counterStore)
  return counterStore
}
