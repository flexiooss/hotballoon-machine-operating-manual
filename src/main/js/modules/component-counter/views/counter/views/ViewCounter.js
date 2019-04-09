import {View, ElementEventListenerBuilder, e, ViewPublicEventHandler, EventListenerOrderedBuilder} from 'hotballoon'
import balloon from '../../../assets/img/balloon.svg'
import {ViewPeer} from './subViews/ViewPeer'
import {ContainerStore} from '../../ContainerStore'
import {RECONCILIATION_RULES} from 'flexio-nodes-reconciliation'
import {assertType, isFunction} from 'flexio-jshelpers'

export const INCREMENT_EVENT = 'INCREMENT_EVENT'
export const DECREMENT_EVENT = 'DECREMENT_EVENT'
export const ADD_NUMBER_EVENT = 'ADD_NUMBER_EVENT'

const PEER_SUBVIEW = 'PEER_SUBVIEW'

export class ViewCounter extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {ContainerStore} containerStore
   * @param {boolean} withSubView
   */
  constructor(container, containerStore, withSubView) {
    super(container)
    this.__stores = containerStore
    this.__viewPeer = null
    this.subscribeToStore(this.__stores.counterStore)
    this.__subView = this.html(
      e('section#' + PEER_SUBVIEW + '.section')
    )
    if (withSubView) {
      this.__registerSubViews()
    }
  }

  /**
   *
   * @private
   */
  __registerSubViews() {
    this.__viewPeer = this.addView(
      new ViewPeer(
        this,
        new ContainerStore(this.__stores.counterStore)
      )
    )
    this.__subView = this.html(
      e('section#' + PEER_SUBVIEW + '.section')
        .views(this.__viewPeer)
    )
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
                    .text(this.__stores.counterStore.count)
                ),

                this.html(
                  e('input#decrement.button')
                    .attributes({ value: 'Dec', type: 'button' })
                    .listenEvent(
                      ElementEventListenerBuilder.listen('click')
                        .callback((e) => {
                          this.dispatch(DECREMENT_EVENT, null)
                        })
                        .build())
                    .styles({ visibility: (this.__stores.counterStore.count < 1 ? 'hidden' : 'visible') })
                ),

                this.html(
                  e('input#increment.button')
                    .attributes({ value: 'Inc', type: 'button' })
                    .listenEvent(
                      ElementEventListenerBuilder.listen('click')
                        .callback((e) => {
                          this.dispatch(INCREMENT_EVENT, null)
                        })
                        .build())
                    .reconciliationRules([RECONCILIATION_RULES.BYPATH])
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
                ),

                this.html(
                  e('img#hotballoon.hotballoon')
                    .attributes({ src: balloon })
                    .styles({'marginLeft': this.__stores.counterStore.count + 'em',
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
