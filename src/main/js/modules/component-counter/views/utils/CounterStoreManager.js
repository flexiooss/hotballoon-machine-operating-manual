import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 */
export class CounterStoreManager {
  /**
   * @param {PublicStoreHandler<StoreCounter>} publicStoreCounter
   */
  constructor(publicStoreCounter) {
    assert(publicStoreCounter.isTypeOf(globalFlexioImport.io.flexio.component_counter.stores.StoreCounter),
      'BuilderCounterStoreManager:publicStoreCounter: `publicStoreCounterParam ` should be a Store of StoreCounter'
    )
    this.__publicStoreCounter = TypeCheck.assertStoreBase(publicStoreCounter)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreCounter>}
   */
  counterStore() {
    return this.__publicStoreCounter
  }
}
