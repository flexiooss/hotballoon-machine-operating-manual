'use strict'
import {
  ViewStoresParameters,
  ViewContainer,
  ViewParameters,
  ViewEventListenerFactory
} from 'hotballoon'
import { default as Main, MainStores, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT } from './Counter.view'

import '../../assets/css/style.css'
import {CounterAddNumberPayload} from '../../actions/CounterAddNumberPayload'
import {CounterAddNumberAction} from '../../actions/CounterAddNumberAction'

const COUNT_STORE = 'RESULT_STORE'
export const COUNTER_VIEWCONTAINER = 'COUNTER_VIEWCONTAINER'

const MAIN_VIEW = Symbol('MAIN_VIEW')

export class CounterContainer extends ViewContainer {
  /**
   * @override
   */
  registerViews() {
    this.addView(
      Main.create(
        new ViewParameters(MAIN_VIEW, this),
        new MainStores(
          this.store(COUNT_STORE)
        )
      )
    )
    this._handleEvents()
  }

  _handleEvents() {
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
