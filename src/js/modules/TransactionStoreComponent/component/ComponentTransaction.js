'use strict'
import {TypeCheck} from 'hotballoon'
import {addStoreTransaction} from './catalogStores/addStoreTransaction'
import {isNode, assert} from 'flexio-jshelpers'
import {StoreHandlerTransaction} from '../stores/StoreHandlerTransaction'
import {addTransactionViewContainer} from './catalogContainerViews/addTransactionViewContainer'
import {addActionTransaction} from './catalogActions/addActionTransaction'
import {ActionTransaction} from '../actions/ActionTransaction'
import {PayloadTransaction} from '../actions/PayloadTransaction'

export class ComponentTransaction {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   */
  constructor(componentContext, parentNode) {
    assert(!!isNode(parentNode),
      'ComponentTransaction:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentTransaction:constructor: `componentContext` argument should be ComponentContext, %s given',
      typeof componentContext
    )
    this.__parentNode = parentNode
    this.__componentContext = componentContext
  }

  addStoreTransaction() {
    this.__transactionStore = addStoreTransaction(this)
    this.__transactionStoreHandler = new StoreHandlerTransaction(this.__transactionStore)
    return this
  }

  addActionTransaction() {
    addActionTransaction(this)
    return this
  }

  mountView() {
    addTransactionViewContainer(this)
      .renderAndMount(this.__parentNode)
    return this
  }

  setEventLoop() {
    this.addStoreTransaction()
    this.addActionTransaction()
    return this
  }

  /**
   *
   * @param {boolean} isActive
   */
  static actionTansaction(isActive) {
    return ActionTransaction.withPayload(
      new PayloadTransaction(isActive)
    )
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
   * @returns {Store}
   */
  get transactionStore() {
    return this.__transactionStore
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @return {ComponentTransaction}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode) {
    return new this(componentContext, parentNode)
  }
}
