'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assertType} from 'flexio-jshelpers'
import {StoreHandlerTransaction} from '../stores/StoreTransaction/StoreHandlerTransaction'
import {addTransactionViewContainer} from '../views/Transaction/addTransactionViewContainer'
import {initActionTransaction} from '../actions/ActionTransaction/InitActionChangeView'
import {
  listenActionTransaction,
  ListenActionTransactionParams
} from '../actions/ActionTransaction/ListenActionChangeView'
import {initStoreTransaction} from '../stores/StoreTransaction/InitStoreTransaction'

export class ComponentTransaction {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   */
  constructor(componentContext, parentNode) {
    assertType(!!isNode(parentNode),
      'ComponentTransaction:constructor: `parentNode` argument should be NodeType'
    )
    assertType(
      TypeCheck.isComponentContext(componentContext),
      'ComponentTransaction:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__parentNode = parentNode
    this.__componentContext = componentContext
  }

  addStoreTransaction() {
    this.__transactionStore = initStoreTransaction(this.__componentContext)
    this.__transactionStoreHandler = new StoreHandlerTransaction(this.__transactionStore)
    return this
  }

  addActionTransaction() {
    this.__actionTransaction = initActionTransaction(this.__componentContext.dispatcher())
    listenActionTransaction(
      new ListenActionTransactionParams(
        this.__actionTransaction,
        this.__transactionStore,
        this.__transactionStoreHandler
      )
    )
    return this
  }

  mountView() {
    addTransactionViewContainer(this.__componentContext, this.__parentNode, this.__transactionStoreHandler)
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
   * @returns {!Action<ActionTransaction>}
   */
  get actionTransaction() {
    return this.__actionTransaction
  }
}
