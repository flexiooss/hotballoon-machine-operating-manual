'use strict'
import {ViewContainerParameters} from 'hotballoon'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'
import {CalculatorContainer, CalculatorContainerStoresParameters} from '../views/CalculatorContainer'

export class CalculatorComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   */
  constructor(componentContext, parentNode) {
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__parentNode = parentNode
    this.__componentContext = componentContext
    this.__store = initStores(this.__componentContext)

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
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @return {CalculatorComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode) {
    return new this(componentContext, parentNode)
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
    const CALCULATOR_VIEWCONTAINER_ID = this.__componentContext.nextID()
    let CALCULATOR_VIEWCONTAINER_INST
    CALCULATOR_VIEWCONTAINER_INST = this.__componentContext.addViewContainer(
      new CalculatorContainer(
        new ViewContainerParameters(
          this.__componentContext,
          CALCULATOR_VIEWCONTAINER_ID,
          this.__parentNode
        ),
        new CalculatorContainerStoresParameters(this.__store)
      )
    )

    this.__componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
    this.__componentContext.debug.object(CALCULATOR_VIEWCONTAINER_INST)
    this.__componentContext.debug.print()

    return CALCULATOR_VIEWCONTAINER_INST
  }
}
