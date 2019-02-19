import {View, HtmlParams, ViewParameters, ViewStoresParameters, NodeEventListenerFactory} from 'hotballoon'
// import balloon from '../../assets/img/balloon.svg'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'
import {PeerView, PeerStoreParameters} from './Peer.view'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

const PEER_SUBVIEW = 'PEER_SUBVIEW'

const COUNT_STORE = 'COUNT_STORE'

export class CounterView extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {MainStores} mainStores
   */
  constructor(viewParameters, mainStores) {
    super(viewParameters, mainStores)
    this.suscribeToStore(COUNT_STORE)
    this.__registerSubViews()
  }

  /**
   *
   * @private
   */
  __registerSubViews() {
    this.addView(
      PeerView.create(
        new ViewParameters(PEER_SUBVIEW, this),
        new PeerStoreParameters(
          this.store(COUNT_STORE)
        )
      )
    )
  }
  /**
   *
   * @return {Node}
   */
  template() {
    return this.html(
      'div', HtmlParams.withChildNodes([
        this.html(
          'div', HtmlParams.withChildNodes([
            this.html('span#Counter.counter', HtmlParams.withText(this.__addCounter())),
            this.html('input#decrement.button',
              HtmlParams
                .withAttributes(
                  { value: 'Dec', type: 'button' })
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(DECREMENT_EVENT, null)
                    })
                    .build()
                )
                .addStyles({ visibility: (this.__addCounter() < 1 ? 'hidden' : 'visible') })
            ),
            this.html('input#increment.button',
              HtmlParams
                .withAttributes(
                  { value: 'Inc', type: 'button' })
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(INCREMENT_EVENT, null)
                    })
                    .build()
                )
            ),
            this.html('input#sum',
              HtmlParams
                .withAttributes(
                  { })
                .addEventListener(NodeEventListenerFactory.listen('keydown')
                  .callback((e) => {
                    if (e.key === 'Enter') {
                      this.dispatch(ADD_NUMBER_EVENT, { value: Number(e.target.value) })
                    }
                  })
                  .build())
            ),
            this.html('img#hotballoon.hotballoon',
              HtmlParams
                .withAttributes(
                  { src: 'balloon' })
                .addStyles({
                  'marginLeft': this.__addCounter() + 'em',
                  'position': 'relative'
                })
            )
          ])
        ),
        this.html('div#field.field',
          HtmlParams
            .withAttributes({ margin: '1em' })
        ),
        this.html('section#' + PEER_SUBVIEW + '.section',
          HtmlParams
            .withViews([this.view(PEER_SUBVIEW)])
            .addReconciliationRules([RECONCILIATION_RULES.BYPATH])
        )
      ])
    )
  }

  /**
   *
   * @returns {string}
   * @private
   */
  __addCounter() {
    const data = this.stateValue(COUNT_STORE)

    if (typeof data.count === 'undefined') {
      return 'counter not found'
    } else {
      return data.count
    }
  }
}

/**
 * @extends ViewStoresParameters
 */
export class CounterStores extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} countStore
   */
  constructor(countStore) {
    super()
    this.setStore(COUNT_STORE, countStore)
  }
}
