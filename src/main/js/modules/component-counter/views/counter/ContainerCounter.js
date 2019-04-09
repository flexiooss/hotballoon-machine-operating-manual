'use strict'
import {ViewContainer} from 'hotballoon'
import {ViewCounter} from './views/ViewCounter'
import {ContainerStore} from '../ContainerStore'

import {FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 * @type {ActionModifyCounter}
 */
const ActionModifyCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.actions.ActionModifyCounter

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
    this.__main = null
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.__main = this.addView(
      new ViewCounter(
        this,
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
    this.__main.on()
      .increment((payload) => {
        this.__actions.counterIncrementAction.dispatch(
          new ActionModifyCounter(1)
        )
      })
    this.__main.on()
      .decrement((payload) => {
        this.__actions.counterIncrementAction.dispatch(
          new ActionModifyCounter(-1)
        )
      })
    this.__main.on()
      .add((payload) => {
        this.__actions.counterIncrementAction.dispatch(
          new ActionModifyCounter(payload.value)
        )
      })
  }
}
