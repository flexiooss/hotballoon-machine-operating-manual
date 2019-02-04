'use strict'
import {
  ViewStoresParameters,
  ViewContainer,
  ViewParameters,
  ViewEventListenerFactory
} from 'hotballoon'
import { default as Main, MainStores, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT } from './Main.view'

import '../../assets/css/style.css'
import {CounterAddNumberPayload} from '../../actions/CounterAddNumberPayload'
import {CounterAddNumberAction} from '../../actions/CounterAddNumberAction'

const COUNT_STORE = 'RESULT_STORE'
export const COUNTER_VIEWCONTAINER = 'COUNTER_VIEWCONTAINER'

const MAIN_VIEW = Symbol('MAIN_VIEW')

export class CounterContainer extends ViewContainer {

  constructor(viewContainerParameters, stores) {
    super(viewContainerParameters, stores)
    console.log(Object.isExtensible(this))
  }

  /**
   * @override
   */
  registerViews() {
    this.addView(
      Main.create(
        new ViewParameters(MAIN_VIEW, this),
        new MainStores(
          this.Store(COUNT_STORE)
        )
      )
    )
    this._handleEvents()
  }

  _handleEvents() {
    this.View(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(INCREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(1, this.Component())
            )
          )
        }).build(this)
    )

    this.View(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(-1, this.Component())
            )
          )
        }).build(this)
    )

    this.View(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(payload.value, this.Component())
            )
          )
        }).build(this)
    )
  }
}

/**
 * @extends ViewStoresParameters
 */
export class CounterContainerStores extends ViewStoresParameters {
  /**
   *
   * @param {ResultStore} counterStore
   */
  constructor(counterStore) {
    super()
    this.setStore(COUNT_STORE, counterStore)
  }
}
