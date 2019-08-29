import {View, e} from '@flexio-oss/hotballoon'
import style from '../../assets/css/style.css'

export class ViewTransaction extends View {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {TransactionStoreManager} transactionStoreManager
   */
  constructor(viewContainer, transactionStoreManager) {
    super(viewContainer)
    this.__stores = transactionStoreManager
    this.subscribeToStore(this.__stores.transactionStore())
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('div')
        .className((this.__stores.transactionStore().data().registered().length ? style.loader : style.loaderHidden))
    )
  }
}
