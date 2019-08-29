import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 */
export class CalculatorStoreManager {
  /**
   * @param {PublicStoreHandler<StoreResult>} publicStoreResult
   */
  constructor(publicStoreResult) {
    assert(publicStoreResult.isTypeOf(globalFlexioImport.io.flexio.component_calculator.stores.StoreResult),
      'CounterContainerStoresParams: `publicStoreResult ` should be a Store of StoreResult'
    )
    this.__publicStoreResult = TypeCheck.assertStoreBase(publicStoreResult)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreResult>}
   */
  storeResult() {
    return this.__publicStoreResult
  }
}
