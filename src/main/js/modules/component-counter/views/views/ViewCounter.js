import {View, ElementEventListenerBuilder, e, ViewPublicEventHandler, EventListenerOrderedBuilder, RECONCILIATION_RULES} from '@flexio-oss/hotballoon'
import balloon from '../../../../assets/img/balloon.svg'
import {ViewPeer} from './subViews/ViewPeer'
import {assertType, isFunction} from '@flexio-oss/assert'
import style from '../../../../assets/css/style.css'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

const PEER_SUBVIEW = 'PEER_SUBVIEW'

export class ViewCounter extends View {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {CounterStoreManager} counterStoreManager
   * @param {boolean} withSubView
   */
  constructor(viewContainer, counterStoreManager, withSubView) {
    super(viewContainer)
    this.__stores = counterStoreManager
    this.subscribeToStore(this.__stores.counterStore())
    this.__subView = this.html(
      e('section#' + PEER_SUBVIEW)
    )
    if (withSubView) {
      this.__viewPeer = this.addView(new ViewPeer(this, this.__stores))
      this.__subView = this.html(
        e('section#' + PEER_SUBVIEW)
          .views(this.__viewPeer)
      )
    }
  }

  /**
   *
   * @return {ViewCounterEvent}
   */
  on() {
    return new ViewCounterEvent((a) => {
      return this._on(a)
    })
  }

  /**
   *
   * @return {Element}
   */
  template() {
    return this.html(
      e('div')
        .childNodes(

          this.html(
            e('div')
              .childNodes(

                this.html(
                  e('span#views.counter')
                    .className(style.counter)
                    .text(this.__stores.counterStore().data().count())
                ),

                this.html(
                  e('input#decrement')
                    .className(style.button)
                    .attributes({ value: 'Dec', type: 'button' })
                    .listenEvent(
                      ElementEventListenerBuilder.listen('click')
                        .callback((e) => {
                          this.dispatch(DECREMENT_EVENT, null)
                        })
                        .build())
                    .styles({ visibility: (this.__stores.counterStore().data().count() < 1 ? 'hidden' : 'visible') })
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                ),

                this.html(
                  e('input#increment')
                    .className(style.button)
                    .attributes({ value: 'Inc', type: 'button' })
                    .listenEvent(
                      ElementEventListenerBuilder.listen('click')
                        .callback((e) => {
                          this.dispatch(INCREMENT_EVENT, null)
                        })
                        .build())
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                ),

                this.html(
                  e('input#sum')
                    .listenEvent(ElementEventListenerBuilder.listen('keydown')
                      .callback((e) => {
                        if (e.key === 'Enter') {
                          this.dispatch(ADD_NUMBER_EVENT, { value: Number(e.target.value) })
                        }
                      })
                      .build()
                    )
                    .reconciliationRules(RECONCILIATION_RULES.BYPASS_LISTENERS)
                ),

                this.html(
                  e('img#hotballoon')
                    .attributes({ src: balloon })
                    .styles({'marginLeft': this.__stores.counterStore().data().count() + 'em',
                      'position': 'relative'}
                    )
                )
              )
          ),
          this.__subView
        )
    )
  }
}

class ViewCounterEvent extends ViewPublicEventHandler {
  /**
   *
   * @param {ViewCounterEvent~incrementClb} clb
   * @return {String}
   */
  increment(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(INCREMENT_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {ViewCounterEvent~incrementClb} clb
   * @return {String}
   */
  decrement(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   *
   * @param {ViewCounterEvent~incrementClb} clb
   * @return {String}
   */
  add(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   * @callback ViewCounterEvent~incrementClb
   */
}
