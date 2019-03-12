import {View, HtmlParams, e} from 'hotballoon'

export class ViewTransaction extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {ContainerStore} containerStore
   */
  constructor(viewParameters, containerStore) {
    super(viewParameters)
    this.__stores = containerStore
    this.subscribeToStore(this.__stores.transactionStore)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('div#loader' + (this.__stores.transactionStore.isRunning ? '.loader' : '.loader-hidden'))
    )
  }
}
