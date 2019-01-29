'use strict'
import {Component, ViewContainerParameters} from 'hotballoon'
import {COUNT_STORE} from '../stores/CounterStore'
import {initStores} from './initStores'
import {initActionsListeners} from './initActionsListeners'
import {isNode, assert} from 'flexio-jshelpers'

import {CounterContainerStores, COUNTER_VIEWCONTAINER, CounterContainer} from '../views/advencedCounter/Counter.container'
import {
  SimpleCounterContainer,
  SIMPLE_COUNTER_VIEWCONTAINER,
  SimpleCounterContainerStores
} from '../views/simpleCounter/SimpleCounter.container'

export class CounterComponent extends Component {
  constructor(hotBalloonApplication, parentNode, mode) {
    super(hotBalloonApplication)

    initStores(this)
    initActionsListeners(this)
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
   * @param {HotballoonApplication} hotballoonApplication
   * @param {Node} parentNode
   * @param mode
   * @return {CounterComponent}
   * @constructor
   * @static
   */
  static create(hotballoonApplication, parentNode, mode) {
    return new this(hotballoonApplication, parentNode, mode)
  }

  createRenderMountView() {
    this._addCounterViewContainer().renderAndMount(this._parentNode)
  }

  _addCounterViewContainer() {
    const COUNTER_VIEWCONTAINER_ID = this.nextID()
    var COUNTER_VIEWCONTAINER_INST
    console.log(this._mode)
    if (this._mode.option !== "SIMPLE") {
      COUNTER_VIEWCONTAINER_INST = this.addViewContainer(
        new CounterContainer(
          new ViewContainerParameters(
            this,
            COUNTER_VIEWCONTAINER_ID,
            this._parentNode
          ),
          new CounterContainerStores(
            this.StoreByRegister(COUNT_STORE)
          )
        )
      )
      this.viewContainersKey.set(COUNTER_VIEWCONTAINER, COUNTER_VIEWCONTAINER_ID)
    }
    else if(this._mode.option !== "SUB_VIEW") {
      COUNTER_VIEWCONTAINER_INST = this.addViewContainer(
        new SimpleCounterContainer(
          new ViewContainerParameters(
            this,
            COUNTER_VIEWCONTAINER_ID,
            this._parentNode
          ),
          new SimpleCounterContainerStores(
            this.StoreByRegister(COUNT_STORE)
          )
        )
      )
      this.viewContainersKey.set(SIMPLE_COUNTER_VIEWCONTAINER, COUNTER_VIEWCONTAINER_ID)
    }

    this.debug.log('COUNTER_VIEWCONTAINER_INST')
    this.debug.object(COUNTER_VIEWCONTAINER_INST)
    this.debug.print()

    return COUNTER_VIEWCONTAINER_INST
  }
}

export class CounterContainerPO {
  constructor(option){
    this.option = option
  }
}
