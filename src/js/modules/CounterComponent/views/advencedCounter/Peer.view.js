/* global Blob:false */
import {View, ViewStoresParameters, HtmlParams} from 'hotballoon'

const COUNT_STORE = 'RESULT_STORE'

export class PeerView extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {PeerStoreParameters} stores
   */
  constructor(viewParameters, stores) {
    super(viewParameters, stores)
    this.suscribeToStore(COUNT_STORE)
  }

  /**
   *
   * @return {Node}
   */
  template() {
    return this.html('div#peer.peer', HtmlParams
      .withStyles({ background: this.__checkCounter(), padding: '5em' })
    )
  }

  /**
   *
   * @returns {string}
   * @private
   */
  __checkCounter() {
    const data = this.stateValue(COUNT_STORE)

    if (typeof data.count !== 'undefined') {
      if (data.count % 2 === 0) {
        return 'green'
      }
    }
    return 'red'
  }
}

/**
 * @extends ViewStoresParameters
 */
export class PeerStoreParameters extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} countStore
   */
  constructor(countStore) {
    super()
    this.setStore(COUNT_STORE, countStore)
  }
}
