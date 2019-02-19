import {
  View,
  HtmlParams,
  ViewStoresParameters,
  NodeEventListenerFactory
} from 'hotballoon'
// import balloon from '../../assets/img/balloon.svg'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

const COUNT_STORE = 'COUNT_STORE'

/**
 * @extends View
 */
export class CounterViewSimple extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {CounterSimpleStores} CounterSimpleStores
   */
  constructor(viewParameters, CounterSimpleStores) {
    super(viewParameters, CounterSimpleStores)
    this.suscribeToStore(COUNT_STORE)
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
                  { src: '' })
                .addStyles({
                  'marginLeft': this.__addCounter() + 'em',
                  'position': 'relative'
                })
            )
          ])
        )
      ])
    )
  }

  /**
   *
   * @returns {String}
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
export class CounterSimpleStores extends ViewStoresParameters {
  /**
   *
   * @param countStore
   */
  constructor(countStore) {
    super()
    this.setStore(COUNT_STORE, countStore)
  }
}
