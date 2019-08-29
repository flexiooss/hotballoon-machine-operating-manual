import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 */
export class NavbarStoreManager {
  /**
   *
   * @param {PublicStoreHandler<StoreNavbar>} publicStoreNavbar
   */
  constructor(publicStoreNavbar) {
    assert(publicStoreNavbar.isTypeOf(globalFlexioImport.io.flexio.component_doc.stores.StoreNavbar),
      'CounterContainerStoresParams: `navbarStore ` should be a Store of StoreNavbar'
    )
    this.__publicStoreNavbar = TypeCheck.assertStoreBase(publicStoreNavbar)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreNavbar>}
   */
  navbarStore() {
    return this.__publicStoreNavbar
  }
}
