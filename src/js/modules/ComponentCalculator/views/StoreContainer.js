import {TypeCheck} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {StoreResult} from '../stores/StoreResult/StoreResult'

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
