/* global Blob:false */
import {View, HtmlParams, e} from 'hotballoon'

export class ViewPeer extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {ContainerStore} counterContainerStoresParameters
   */
  constructor(viewParameters, counterContainerStoresParameters) {
    super(viewParameters)
    this.__stores = counterContainerStoresParameters
    this.subscribeToStore(this.__stores.counterStore)
  }

  /**
   *
   * @return {Node}
   */
  template() {
    return this.html(
      e('div#peer.peer')
        .styles({ background: this.__stores.counterStore.color, padding: '5em' })
    )
  }
}
