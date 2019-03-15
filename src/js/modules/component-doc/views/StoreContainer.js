import {TypeCheck} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {StoreNavbar} from '../stores/storeNavbar/StoreNavbar'

/**
 */
export class StoreContainer {
  /**
   *
   * @param {PublicStoreHandler} navbarStore
   */
  constructor(navbarStore) {
    assert(
      navbarStore.isTypeOf(StoreNavbar),
      'CounterContainerStoresParams: `navbarStore ` should be a Store of StoreNavbar')

    this.__navbarStore = TypeCheck.assertStoreBase(navbarStore)
  }

  /**
   *
   * @return {PublicStoreHandler}
   */
  get navbarStore() {
    return this.__navbarStore
  }
}
