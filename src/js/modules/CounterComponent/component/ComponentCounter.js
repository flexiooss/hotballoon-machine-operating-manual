'use strict'
import {isNode, assert, isString} from 'flexio-jshelpers'
import {StoreHandlerCounter} from '../stores/StoreHandlerCounter'
import {addCounterSimpleViewContainer} from './catalogContainerViews/addCounterSimpleViewContainer'
import {addCounterAdvancedViewContainer} from './catalogContainerViews/addCounterAdvancedViewContainer'
import {TypeCheck} from 'hotballoon'
import {addActionModifyCounter} from './catalogActions/addActionModifyCounter'
import {addStoreCounter} from './catalogStores/addStoreCounter'
import {addMultimeter} from './catalogContainerViews/addMultimeter'

export class ComponentCounter {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {String} mode
   */
  constructor(componentContext, parentNode, mode) {
    assert(!!isNode(parentNode),
      'ComponentCounter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentCounter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    assert(!!isString(mode),
      'ComponentCounter:constructor: `mode` argument should be String, %s given',
      typeof mode)

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__mode = mode
  }

  addActionModifyCounter() {
    addActionModifyCounter(this)
    return this
  }

  addStoreCounter() {
    this.__counterStore = addStoreCounter(this)
    this.__counterStoreHandler = new StoreHandlerCounter(this.__counterStore)
    console.log(this.__counterStoreHandler)
    return this
  }

  /**
   *
   * @returns {Multimeter}
   */
  addMultimeter() {
    return addMultimeter(this)
  }

  setEventLoop() {
    this.addStoreCounter()
    this.addActionModifyCounter()
    return this
  }

  mountView() {
    let counterViewContainer
    if (this.__mode === 'simple') {
      counterViewContainer = addCounterSimpleViewContainer(this)
    } else if (this.__mode === 'subview') {
      counterViewContainer = addCounterAdvancedViewContainer(this)
    }

    if (counterViewContainer !== undefined) {
      counterViewContainer.renderAndMount(this.__parentNode)
    }
    return this
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
  get counterStore() {
    return this.__counterStore
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {string} mode
   * @return {ComponentCounter}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, mode) {
    return new this(componentContext, parentNode, mode)
  }
}
