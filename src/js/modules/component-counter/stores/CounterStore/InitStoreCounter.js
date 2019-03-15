import {StoreBuilder, InMemoryStoreParams} from 'hotballoon'
import {assert, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {StoreCounter}
 */
const StoreCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCounter.StoreCounter

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
