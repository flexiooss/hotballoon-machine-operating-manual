import {
  View,
  HtmlParams,
  NodeEventListenerFactory
} from 'hotballoon'
import balloon from '../../assets/img/balloon.svg'
import {CounterStoreHandler} from '../../stores/counterStoreHandler'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

/**
 * @extends View
 */
export class CounterViewSimple extends View {
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
                    .build())
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
                  { src: balloon })
                .addStyles({
                  'marginLeft': this.__counterStoreHandler.count + 'em',
                  'position': 'relative'
                })
            )
          ])
        )
      ])
    )
  }
}
