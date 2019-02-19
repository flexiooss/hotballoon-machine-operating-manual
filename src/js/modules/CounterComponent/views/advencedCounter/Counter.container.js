'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import {CounterView, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './Counter.view'

import {CounterAddNumberPayload} from '../../actions/CounterAddNumberPayload'
import {CounterAddNumberAction} from '../../actions/CounterAddNumberAction'
import {CounterContainerStoresParameters} from '../CounterContainerStoreParameters'

const MAIN_VIEW = Symbol('MAIN_VIEW')

/**
 * @extends ViewContainer
 */
export class CounterContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CounterContainerStoresParameters} counterContainerStores
   */
  constructor(viewContainerParameters, counterContainerStores) {
    super(viewContainerParameters)
    this.__counterStore = counterContainerStores.counterStore
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      CounterView.create(
        new ViewParameters(MAIN_VIEW, this),
        new CounterContainerStoresParameters(this.__counterStore)
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
