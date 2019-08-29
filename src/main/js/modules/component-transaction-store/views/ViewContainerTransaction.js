'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewTransaction} from './views/ViewTransaction'

export class ViewContainerTransaction extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {TransactionStoreManager} transactionStoreManager
   */
  constructor(viewContainerParameters, transactionStoreManager) {
    super(viewContainerParameters)
    this.__stores = transactionStoreManager
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      new ViewTransaction(
        this,
        this.__stores
      )
    )
  }
}
