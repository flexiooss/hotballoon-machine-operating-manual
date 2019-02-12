'use strict'
import {ViewContainerParameters} from 'hotballoon'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'
import {CalculatorContainer, CalculatorContainerStores} from '../views/CalculatorContainer'

export class CalculatorComponent {
  constructor(componentContext, parentNode) {
    /**
     * @name CalculatorComponent#_componentContext
     * @type {ComponentContext}
     */
    Object.defineProperty(this, '_componentContext', {
      value: componentContext,
      enumerable: false,
      configurable: false
    })

    this.store = initStores(this._componentContext)
    initActionsListeners(componentContext, this.store)
    this._setParentNode(parentNode)
  }

  _setParentNode(parentNode) {
    assert(!!isNode(parentNode),
      'MainComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    Object.defineProperties(this, {
      _parentNode: {
        enumerable: false,
        value: parentNode
      }
    })
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
    this._addCounterViewContainer().renderAndMount(this._parentNode)
  }

  _addCounterViewContainer() {
    const CALCULATOR_VIEWCONTAINER_ID = this._componentContext.nextID()
    var CALCULATOR_VIEWCONTAINER_INST
    console.log(this._mode)
    CALCULATOR_VIEWCONTAINER_INST = this._componentContext.addViewContainer(
      new CalculatorContainer(
        new ViewContainerParameters(
          this._componentContext,
          CALCULATOR_VIEWCONTAINER_ID,
          this._parentNode
        ),
        new CalculatorContainerStores(
          this.store
        )
      )
    )

    this._componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
    this._componentContext.debug.object(CALCULATOR_VIEWCONTAINER_INST)
    this._componentContext.debug.print()

    return CALCULATOR_VIEWCONTAINER_INST
  }
}
