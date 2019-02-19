'use strict'
import {
  ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import {CounterStores, CounterView, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './Counter.view'

import {CounterAddNumberPayload} from '../../actions/CounterAddNumberPayload'
import {CounterAddNumberAction} from '../../actions/CounterAddNumberAction'

const COUNT_STORE = 'COUNT_STORE'

const MAIN_VIEW = Symbol('MAIN_VIEW')

/**
 * @extends ViewContainer
 */
export class CounterContainer extends ViewContainer {
  /**
   * @override
   */
  registerViews() {
    this.addView(
      CounterView.create(
        new ViewParameters(MAIN_VIEW, this),
        new CounterStores(
          this.store(COUNT_STORE)
        )
      )
    )
    this.__handleEvents()
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.view(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(INCREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(1, this.componentContext())
            )
          )
        }).build()
    )

    this.view(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(-1, this.componentContext())
            )
          )
        }).build()
    )

    this.view(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(payload.value, this.componentContext())
            )
          )
        }).build()
    )
  }
}

/**
 * @extends ViewStoresParameters
 */
export class CounterContainerStores extends ViewStoresParameters {
  /**
   *
   * @param {Store} counterStore
   */
  constructor(counterStore) {
    super()
    this.setStore(COUNT_STORE, counterStore)
  }
}
