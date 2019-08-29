import {View, e} from '@flexio-oss/hotballoon'

export class ViewPeer extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {CounterStoreManager} counterStoreManager
   */
  constructor(container, counterStoreManager) {
    super(container)
    this.__stores = counterStoreManager
    this.subscribeToStore(this.__stores.counterStore())
  }

  /**
   *
   * @return {Element}
   */
  template() {
    return this.html(
      e('div#peer.peer')
        .styles({ background: (this.__stores.counterStore().data().count() % 2 === 0 ? '#4EE695' : '#EB4876'), padding: '5em' })
    )
  }
}
