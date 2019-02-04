'use strict'
import {Component, ViewContainerParameters} from 'hotballoon'
import {RESULT_STORE} from '../stores/ResultStore'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'
import {CALCULATOR_VIEWCONTAINER, CalculatorContainer, CalculatorContainerStores} from '../views/CalculatorContainer'

export class CalculatorComponent extends Component {
  constructor(hotBalloonApplication, parentNode) {
    super(hotBalloonApplication)

    initStores(this)
    initActionsListeners(this)
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
         * @name CalculatorComponent#_parentNode
         */
        value: parentNode
      }
    })
  }

  /**
   *
   * @param {HotballoonApplication} hotballoonApplication
   * @param {Node} parentNode
   * @param mode
   * @return {CalculatorComponent}
   * @constructor
   * @static
   */
  static create(hotballoonApplication, parentNode) {
    return new this(hotballoonApplication, parentNode)
  }

  createRenderMountView() {
    this._addCounterViewContainer().renderAndMount(this._parentNode)
  }

  _addCounterViewContainer() {
    const CALCULATOR_VIEWCONTAINER_ID = this.nextID()
    var CALCULATOR_VIEWCONTAINER_INST
    console.log(this._mode)
    CALCULATOR_VIEWCONTAINER_INST = this.addViewContainer(
      new CalculatorContainer(
        new ViewContainerParameters(
          this,
          CALCULATOR_VIEWCONTAINER_ID,
          this._parentNode
        ),
        new CalculatorContainerStores(
          this.StoreByRegister(RESULT_STORE)
        )
      )
    )
    this.viewContainersKey.set(CALCULATOR_VIEWCONTAINER, CALCULATOR_VIEWCONTAINER_ID)

    this.debug.log('CALCULATOR_VIEWCONTAINER_INST')
    this.debug.object(CALCULATOR_VIEWCONTAINER_INST)
    this.debug.print()

    return CALCULATOR_VIEWCONTAINER_INST
  }
}
