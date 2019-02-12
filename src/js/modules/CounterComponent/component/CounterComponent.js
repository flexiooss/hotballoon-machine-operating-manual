'use strict'
import {ViewContainerParameters} from 'hotballoon'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'

import {CounterContainerStores, CounterContainer} from '../views/advencedCounter/Counter.container'
import {SimpleCounterContainer, SimpleCounterContainerStores} from '../views/simpleCounter/SimpleCounter.container'

export class CounterComponent {
  constructor(componentContext, parentNode, mode) {
    /**
     * @name CounterComponent#_componentContext
     * @type {ComponentContext}
     */
    Object.defineProperty(this, '_componentContext', {
      value: componentContext,
      enumerable: false,
      configurable: false
    })

    this.counterStore = initStores(this._componentContext)
    initActionsListeners(this._componentContext, this.counterStore)
    this._mode = mode
    this._setParentNode(parentNode)
  }

  _setParentNode(parentNode) {
    assert(!!isNode(parentNode),
      'MainComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    Object.defineProperties(this, {
      _parentNode: {
        enumerable: false,
        /**
         * @property {Node} _parentNode
         * @name CounterComponent#_parentNode
         */
        value: parentNode
      }
    })
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this._componentContext
  }

  /**
   *
   * @return {ComponentContext}
   */
  get store() {
    return this.counterStore
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param mode
   * @return {CounterComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, mode) {
    return new this(componentContext, parentNode, mode)
  }

  createRenderMountView() {
    this._addCounterViewContainer().renderAndMount(this._parentNode)
  }

  _addCounterViewContainer() {
    const COUNTER_VIEWCONTAINER_ID = this._componentContext.nextID()
    let COUNTER_VIEWCONTAINER_INST
    if (this._mode.option !== 'SIMPLE') {
      COUNTER_VIEWCONTAINER_INST = this._componentContext.addViewContainer(
        new CounterContainer(
          new ViewContainerParameters(
            this._componentContext,
            COUNTER_VIEWCONTAINER_ID,
            this._parentNode
          ),
          new CounterContainerStores(
            this.counterStore
          )
        )
      )
    } else if (this._mode.option !== 'SUB_VIEW') {
      COUNTER_VIEWCONTAINER_INST = this._componentContext.addViewContainer(
        new SimpleCounterContainer(
          new ViewContainerParameters(
            this._componentContext,
            COUNTER_VIEWCONTAINER_ID,
            this._parentNode
          ),
          new SimpleCounterContainerStores(
            this.counterStore
          )
        )
      )
    }

    this._componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
    this._componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
    this._componentContext.debug.print()

    return COUNTER_VIEWCONTAINER_INST
  }
}
