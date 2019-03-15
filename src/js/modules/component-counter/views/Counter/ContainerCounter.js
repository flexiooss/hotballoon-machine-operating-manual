'use strict'
import {ViewContainer, ViewParameters, ViewEventListenerBuilder} from 'hotballoon'
import {ViewCounter, INCREMENT_EVENT, DECREMENT_EVENT, ADD_NUMBER_EVENT} from './views/ViewCounter'
import {ContainerStore} from '../ContainerStore'

import {FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 * @type {ActionModifyCounter}
 */
const ActionModifyCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCounter.ActionModifyCounter

const MAIN_VIEW = Symbol('MAIN_VIEW')

/**
 * @extends ViewContainer
 */
export class ContainerCounter extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ContainerStore} counterContainerStore
   * @param {ContainerAction} counterContainerAction
   * @param {boolean} withSubView
   */
  constructor(viewContainerParameters, counterContainerStore, counterContainerAction, withSubView) {
    super(viewContainerParameters)
    this.__stores = counterContainerStore
    this.__actions = counterContainerAction
    this.__withSubView = withSubView
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
        new ContainerStore(this.__stores.counterStore),
        this.__withSubView
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
      ViewEventListenerBuilder
        .listen(INCREMENT_EVENT)
        .callback((payload) => {
          this.__actions.counterIncrementAction.dispatch(
            new ActionModifyCounter(1)
          )
        }).build()
    )

    this.view(MAIN_VIEW).on(
      ViewEventListenerBuilder
        .listen(DECREMENT_EVENT)
        .callback((payload) => {
          this.__actions.counterIncrementAction.dispatch(
            new ActionModifyCounter(-1)
          )
        }).build()
    )

    this.view(MAIN_VIEW).on(
      ViewEventListenerBuilder
        .listen(ADD_NUMBER_EVENT)
        .callback((payload) => {
          this.__actions.counterIncrementAction.dispatch(
            new ActionModifyCounter(payload.value)
          )
        }).build()
    )
  }
}
