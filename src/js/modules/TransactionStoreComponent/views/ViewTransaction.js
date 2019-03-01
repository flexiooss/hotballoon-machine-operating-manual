import {View, HtmlParams} from 'hotballoon'

export class ViewTransaction extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {TransactionContainerStoresParameters} calculatorContainerStoresParameters
   */
  constructor(viewParameters, calculatorContainerStoresParameters) {
    super(viewParameters)
    this.__stores = calculatorContainerStoresParameters
    this.subscribeToStore(this.__stores.transactionStore)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('div#loader' + (this.__stores.transactionStore.isRunning ? '.loader' : '.loader-hidden'),
      HtmlParams.withAttributes()
    )
  }
}
