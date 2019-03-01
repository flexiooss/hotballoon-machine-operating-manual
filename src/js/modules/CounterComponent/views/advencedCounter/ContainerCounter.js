'use strict'
import {ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import {ViewCounter, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './ViewCounter'

import {PayloadModifyCounter} from '../../actions/PayloadModifyCounter'
import {ActionModifyCounter} from '../../actions/ActionModifyCounter'
import {CounterContainerStoresParameters} from '../ContainerStoreParametersCounter'

const MAIN_VIEW = Symbol('MAIN_VIEW')

/**
 * @extends ViewContainer
 */
export class ContainerCounter extends ViewContainer {
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
      new ViewCounter(
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
            ActionModifyCounter.withPayload(
              new PayloadModifyCounter(1)
            )
          )
        }).build()
    )

    this.view(MAIN_VIEW).on(
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

    this.view(MAIN_VIEW).on(
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
