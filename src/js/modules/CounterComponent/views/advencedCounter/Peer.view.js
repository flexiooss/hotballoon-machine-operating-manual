/* global Blob:false */
import {View, HtmlParams} from 'hotballoon'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'

export default class Peer extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CounterContainerStoresParameters} counterContainerStoresParameters
   */
  constructor(viewParameters, counterContainerStoresParameters) {
    super(viewParameters)

    this.counterStore = counterContainerStoresParameters.counterStore
    this.subscribeToStore(this.counterStore)
  }

  /**
   *
   * @return {Node}
   */
  template() {
    console.log('ici')
    // console.log(this.storeData(COUNT_STORE))
    // console.log(this.stateValue(COUNT_STORE))
    return this.html('div#peer.peer', HtmlParams
      .withStyles({background: this._checkCounter(), padding: '5em'})
      // .addReconciliationRules([RECONCILIATION_RULES.BYPATH])
    )
  }

  _checkCounter() {
    const data = this.counterStore.data()
    // const data = this.stateValue(COUNT_STORE)

    if (typeof data.count !== 'undefined') {
      if (data.count % 2 === 0) {
        return 'green'
      }
    }
    return 'red'
  }
}
