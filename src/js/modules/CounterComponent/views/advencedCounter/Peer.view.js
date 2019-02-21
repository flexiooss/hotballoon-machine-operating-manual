/* global Blob:false */
import {View, HtmlParams} from 'hotballoon'

export class PeerView extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CounterContainerStoresParameters} counterContainerStoresParameters
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
    return this.html('div#peer.peer', HtmlParams
      .withStyles({ background: this.__stores.counterStore.color, padding: '5em' })
    )
  }
}
