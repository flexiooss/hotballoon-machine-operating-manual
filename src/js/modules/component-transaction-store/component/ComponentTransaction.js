'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'
import {StoreHandlerTransaction} from '../stores/StoreTransaction/StoreHandlerTransaction'
import {addTransactionViewContainer} from '../views/Transaction/addTransactionViewContainer'
import {initActionTransaction} from '../actions/ActionTransaction/InitActionChangeView'
import {listenActionTransaction} from '../actions/ActionTransaction/ListenActionChangeView'
import {initStoreTransaction} from '../stores/StoreTransaction/InitStoreTransaction'
import {ActionTransaction} from '../actions/ActionTransaction/ActionTransaction'

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
    this.__transactionStore = initStoreTransaction(this)
    this.__transactionStoreHandler = new StoreHandlerTransaction(this.__transactionStore)
    return this
  }

  addActionTransaction() {
    this.__actionTransaction = initActionTransaction(this)
    listenActionTransaction(this)
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
  actionTansaction(isActive) {
    return this.__actionTransaction.dispatch(
      new ActionTransaction(isActive)
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
