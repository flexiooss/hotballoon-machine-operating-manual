'use strict'
import {ViewContainer, ViewParameters} from 'hotballoon'

import '../../assets/css/style.css'
import {StoreContainer} from '../StoreContainer'
import {ViewTransaction} from './views/ViewTransaction'

const TRANSACTION_VIEW = Symbol('TRANSACTION_VIEW')

export class ContainerTransaction extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {StoreContainer} storeContainer
   */
  constructor(viewContainerParameters, storeContainer) {
    super(viewContainerParameters)
    this.__stores = storeContainer
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
        new StoreContainer(this.__stores.transactionStore)
      )
    )
  }
}
