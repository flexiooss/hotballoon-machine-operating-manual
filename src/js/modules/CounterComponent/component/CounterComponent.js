'use strict'
import {ViewContainerParameters} from 'hotballoon'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'

import {CounterContainerStores, CounterContainer} from '../views/advencedCounter/Counter.container'
import {SimpleCounterContainer, SimpleCounterContainerStores} from '../views/simpleCounter/SimpleCounter.container'

export class CounterComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {String} mode
   */
  constructor(componentContext, parentNode, mode) {
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__componentContext = componentContext
    this.__store = initStores(this.__componentContext)
    this.__mode = mode
    this.__parentNode = parentNode

    initActionsListeners(this.__componentContext, this.__store)
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }

  /**
   *
   * @return {Store}
   */
  get store() {
    return this.__store
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {string} mode
   * @return {CounterComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, mode) {
    return new this(componentContext, parentNode, mode)
  }

  createRenderMountView() {
    this.__addCounterViewContainer().renderAndMount(this.__parentNode)
  }

  /**
   *
   * @returns {ViewContainer}
   * @private
   */
  __addCounterViewContainer() {
    const COUNTER_VIEWCONTAINER_ID = this.__componentContext.nextID()
    let COUNTER_VIEWCONTAINER_INST
    if (this.__mode.option !== 'simple') {
      COUNTER_VIEWCONTAINER_INST = this.__componentContext.addViewContainer(
        new CounterContainer(
          new ViewContainerParameters(
            this.__componentContext,
            COUNTER_VIEWCONTAINER_ID,
            this.__parentNode
          ),
          new CounterContainerStores(this.__store)
        )
      )
    } else if (this.__mode.option !== 'subview') {
      COUNTER_VIEWCONTAINER_INST = this.__componentContext.addViewContainer(
        new SimpleCounterContainer(
          new ViewContainerParameters(
            this.__componentContext,
            COUNTER_VIEWCONTAINER_ID,
            this.__parentNode
          ),
          new SimpleCounterContainerStores(this.__store)
        )
      )
    }

    this.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
    this.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
    this.__componentContext.debug.print()

    return COUNTER_VIEWCONTAINER_INST
  }
}
