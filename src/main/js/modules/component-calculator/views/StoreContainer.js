import {TypeCheck} from 'hotballoon'
import {assert, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../generated/io/package'

/**
 *
 * @type {StoreResult}
 */
const StoreResult = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.stores.StoreResult

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
