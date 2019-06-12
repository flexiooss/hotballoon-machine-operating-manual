import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 *
 * @type {StoreCounter}
 */
const StoreCounter = globalFlexioImport.io.flexio.component_counter.stores.StoreCounter

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
