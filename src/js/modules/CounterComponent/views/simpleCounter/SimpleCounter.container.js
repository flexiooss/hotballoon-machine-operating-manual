'use strict'
import {
  ViewStoresParameters,
  ViewContainer,
  ViewParameters,
  ViewEventListenerFactory
} from 'hotballoon'
import {CounterViewSimple, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './CounterSimple.view'

import {CounterAddNumberPayload} from '../../actions/CounterAddNumberPayload'
import {CounterAddNumberAction} from '../../actions/CounterAddNumberAction'
import {CounterContainerStoresParameters} from '../CounterContainerStoreParameters'

const MAIN_SIMPLE_VIEW = Symbol('MAIN_SIMPLE_VIEW')

export class SimpleCounterContainer extends ViewContainer {
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
      new CounterViewSimple(
        new ViewParameters(MAIN_SIMPLE_VIEW, this),
        new CounterContainerStoresParameters(this.__stores.counterStore)
      )
    )
    this.__handleEvents()
  }

  __handleEvents() {
    this.view(MAIN_SIMPLE_VIEW).on(
      ViewEventListenerFactory
        .listen(INCREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(1, this.__componentContext)
            )
          )
        }).build()
    )

    this.view(MAIN_SIMPLE_VIEW).on(
      ViewEventListenerFactory
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(-1, this.__componentContext)
            )
          )
        }).build()
    )

    this.view(MAIN_SIMPLE_VIEW).on(
      ViewEventListenerFactory
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            CounterAddNumberAction.withPayload(
              new CounterAddNumberPayload(payload.value, this.__componentContext)
            )
          )
        }).build()
    )
  }
}
