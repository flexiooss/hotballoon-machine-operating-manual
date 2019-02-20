import {View, HtmlParams, ViewParameters, ViewStoresParameters, NodeEventListenerFactory} from 'hotballoon'
import balloon from '../../assets/img/balloon.svg'
import {PeerView} from './Peer.view'
import {CounterContainerStoresParameters} from '../CounterContainerStoreParameters'
import {CounterStoreHandler} from '../../stores/counterStoreHandler'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

const PEER_SUBVIEW = 'PEER_SUBVIEW'

export class CounterView extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CounterContainerStoresParameters} counterContainerStoresParameters
   */
  constructor(viewParameters, counterContainerStoresParameters) {
    super(viewParameters)
    this.__counterStore = counterContainerStoresParameters.counterStore
    this.subscribeToStore(this.__counterStore)
    this.__counterStoreHandler = new CounterStoreHandler(this.__counterStore.data())
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
        new CounterContainerStoresParameters(this.__counterStore)
      )
    )
  }
  /**
   *
   * @return {Node}
   */
  template() {
    this.__updateStoreHandler()
    return this.html(
      'div', HtmlParams.withChildNodes([
        this.html(
          'div', HtmlParams.withChildNodes([
            this.html('span#Counter.counter', HtmlParams.withText(this.__counterStoreHandler.count)),
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
                .addStyles({ visibility: (this.__counterStoreHandler.count < 1 ? 'hidden' : 'visible') })
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
                ).addReconciliationRules([RECONCILIATION_RULES.BYPATH])
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
                  .build()
                )
            ),
            this.html('img#hotballoon.hotballoon',
              HtmlParams
                .withAttributes(
                  { src: balloon })
                .addStyles({
                  'marginLeft': this.__counterStoreHandler.count + 'em',
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
        )
      ])
    )
  }

  /**
   *
   * @private
   */
  __updateStoreHandler() {
    this.__counterStoreHandler = new CounterStoreHandler(this.__counterStore.data())
  }
}
