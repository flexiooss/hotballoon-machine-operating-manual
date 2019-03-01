'use strict'
import {
  ViewStoresParameters,
  ViewContainer,
  ViewParameters,
  ViewEventListenerFactory
} from 'hotballoon'
import {CounterViewSimple, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './ViewCounterSimple'

import {PayloadModifyCounter} from '../../actions/PayloadModifyCounter'
import {ActionModifyCounter} from '../../actions/ActionModifyCounter'
import {CounterContainerStoresParameters} from '../ContainerStoreParametersCounter'

const MAIN_SIMPLE_VIEW = Symbol('MAIN_SIMPLE_VIEW')

export class ContainerSimpleCounter extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CounterContainerStoresParameters} counterContainerStores
   */
  constructor(viewContainerParameters, counterContainerStores) {
    super(viewContainerParameters)
    this.__stores = counterContainerStores
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
            ActionModifyCounter.withPayload(
              new PayloadModifyCounter(1)
            )
          )
        }).build()
    )

    this.view(MAIN_SIMPLE_VIEW).on(
      ViewEventListenerFactory
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ActionModifyCounter.withPayload(
              new PayloadModifyCounter(-1)
            )
          )
        }).build()
    )

    this.view(MAIN_SIMPLE_VIEW).on(
      ViewEventListenerFactory
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ActionModifyCounter.withPayload(
              new PayloadModifyCounter(payload.value)
            )
          )
        }).build()
    )
  }
}
