'use strict'
import {isNode, assert, isBoolean} from 'flexio-jshelpers'
import {initCounterViewContainer} from '../views/Counter/InitCounterViewContainer'
import {TypeCheck} from 'hotballoon'
import {initActionModifyCounter} from '../actions/ActionModifyCounter/InitActionModifyCounter'
import {listenActionModifyCounter} from '../actions/ActionModifyCounter/ListenActionModifyCounter'
import {initStoreCounter} from '../stores/CounterStore/InitStoreCounter'
import {StoreHandlerCounter} from '../stores/CounterStore/StoreHandlerCounter'

export class ComponentCounter {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {boolean} withSubView
   */
  constructor(componentContext, parentNode, withSubView) {
    assert(!!isNode(parentNode),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    assert(
      TypeCheck.isComponentContext(componentContext),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    assert(!!isBoolean(withSubView),
      'component-counter:constructor: `mode` argument should be Boolean, %s given',
      typeof withSubView)

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.withSubView = withSubView
  }

  addActionModifyCounter() {
    this.__actionModifyCounter = initActionModifyCounter(this)
    listenActionModifyCounter(this)
    return this
  }

  addStoreCounter() {
    this.__counterStore = initStoreCounter(this)
    this.__counterStoreHandler = new StoreHandlerCounter(this.__counterStore)
    return this
  }

  // /**
  //  *
  //  * @returns {Multimeter}
  //  */
  // addMultimeter() {
  //   return addMultimeter(this)
  // }

  setEventLoop() {
    this.addStoreCounter()
    this.addActionModifyCounter()
    return this
  }

  mountView() {
    let counterViewContainer = initCounterViewContainer(this)

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
    return this.__counterStoreHandler
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {boolean} withSubView
   * @return {ComponentCounter}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, withSubView) {
    return new this(componentContext, parentNode, withSubView)
  }
}
