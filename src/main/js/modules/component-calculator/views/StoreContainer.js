import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
/**
 *
 * @type {StoreResult}
 */
const StoreResult = globalFlexioImport.io.flexio.component_calculator.stores.StoreResult

/**
 */
export class StoreContainer {
  /**
   *
   * @param {StoreHandlerInputText} resultStore
   */
  constructor(resultStore) {
    assert(
      resultStore.isTypeOf(StoreResult),
      'CounterContainerStoresParams: `navbarStore ` should be a Store of StoreNavbar')

    this.__resultStore = TypeCheck.assertStoreBase(resultStore)
  }

  /**
   *
   * @return {PublicStoreHandler}
   */
  get resultStore() {
    return this.__resultStore
  }
}
