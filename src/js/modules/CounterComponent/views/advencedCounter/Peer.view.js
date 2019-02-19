/* global Blob:false */
import {View, ViewStoresParameters, HtmlParams} from 'hotballoon'
import {CounterStoreHandler} from '../../stores/counterStoreHandler'

const COUNT_STORE = 'RESULT_STORE'

export class PeerView extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CounterContainerStoresParameters} counterContainerStoresParameters
   */
  constructor(viewParameters, counterContainerStoresParameters) {
    super(viewParameters)
    this.__counterStore = counterContainerStoresParameters.counterStore
    this.__counterStoreHandler = new CounterStoreHandler(this.__counterStore.data())
    this.subscribeToStore(this.__counterStore)
  }

  /**
   *
   * @return {Node}
   */
  template() {
    return this.html('div#peer.peer', HtmlParams
      .withStyles({ background: this.__counterStoreHandler.color, padding: '5em' })
    )
  }
}
