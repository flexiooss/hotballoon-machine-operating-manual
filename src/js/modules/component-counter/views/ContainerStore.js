import {TypeCheck} from 'hotballoon'
import {assert, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../generated/io/package'

/**
 *
 * @type {StoreCounter}
 */
const StoreCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCounter.StoreCounter

export class ContainerStore {
  /**
   *
   * @param {StoreHandlerCounter} counterStore
   */
  constructor(counterStore) {
    assert(
      counterStore.isTypeOf(StoreCounter),
      'CounterContainerStoresParams: `counterStore ` should be a Store of CounterStore')
    this.__counterStore = TypeCheck.assertStoreBase(counterStore)
  }

  /**
   *
   * @return {StoreHandlerCounter}
   */
  get counterStore() {
    return this.__counterStore
  }
}
