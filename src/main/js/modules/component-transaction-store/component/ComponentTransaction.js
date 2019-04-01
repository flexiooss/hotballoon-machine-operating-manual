'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assertType} from 'flexio-jshelpers'
import {ActionTransactionUtils} from '../actions/ActionTransaction/ActionTransactionUtils'
import {StoreTransactionUtils} from '../stores/StoreTransaction/StoreTransactionUtils'
import {ViewContainerTransactionUtils} from '../views/Transaction/ViewContainerTransactionUtils'

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

    this.__addStoreTransaction()
    this.__addActionTransaction()
  }

  __addStoreTransaction() {
    this.__transactionStore = new StoreTransactionUtils(this.__componentContext).build()
    return this
  }

  /**
   *
   * @returns {ComponentTransaction}
   */
  __addActionTransaction() {
    this.__actionTransaction = new ActionTransactionUtils(
      this.__componentContext.dispatcher(),
      this.__transactionStore.store(),
      this.__transactionStore.storePublic()
    ).init().listen()
    return this
  }

  mountView() {
    new ViewContainerTransactionUtils(this.__componentContext, this.__parentNode, this.__transactionStore.storePublic())
      .init()
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
    return this.__actionTransaction.action()
  }
}
