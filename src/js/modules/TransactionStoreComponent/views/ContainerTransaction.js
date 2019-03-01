'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters} from 'hotballoon'

import '../assets/css/style.css'
import {ViewTransaction} from './ViewTransaction'

const TRANSACTION_VIEW = Symbol('TRANSACTION_VIEW')

export class ContainerTransaction extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {TransactionContainerStoresParameters} transactionContainerStoresParameters
   */
  constructor(viewContainerParameters, transactionContainerStoresParameters) {
    super(viewContainerParameters)
    this.__stores = transactionContainerStoresParameters
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      new ViewTransaction(
        new ViewParameters(TRANSACTION_VIEW, this),
        new TransactionContainerStoresParameters(this.__stores.transactionStore)
      )
    )
  }
}

/**
 * @extends ViewStoresParameters
 */
export class TransactionContainerStoresParameters extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} transactionStore
   */
  constructor(transactionStore) {
    super()
    this.__transactionStore = this.validate(transactionStore)
  }

  /**
   *
   * @return {StoreHandlerTransaction}
   */
  get transactionStore() {
    return this.__transactionStore
  }
}
