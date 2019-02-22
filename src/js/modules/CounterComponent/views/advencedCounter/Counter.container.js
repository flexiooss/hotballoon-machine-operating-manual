'use strict'
import {ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
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
   * @param {ComponentContext} componentContext
   */
  constructor(viewContainerParameters, counterContainerStores, componentContext) {
    super(viewContainerParameters)
    this.__stores = counterContainerStores
    this.__componentContext = componentContext
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      new CounterView(
        new ViewParameters(MAIN_VIEW, this),
        new CounterContainerStoresParameters(this.__stores.counterStore)
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
              new CounterAddNumberPayload(1)
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
              new CounterAddNumberPayload(-1)
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
              new CounterAddNumberPayload(payload.value)
            )
          )
        }).build()
    )
  }
}
