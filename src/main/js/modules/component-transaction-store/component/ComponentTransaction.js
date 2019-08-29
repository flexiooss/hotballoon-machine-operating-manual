'use strict'
import '../import'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {isNode, assertType} from '@flexio-oss/assert'
import {ActionTransactionMaker} from '../actions/ActionTransactionMaker'
import {StoreTransactionMaker} from '../stores/StoreTransactionMaker'
import {ViewContainerTransaction} from '../views/ViewContainerTransaction'
import {TransactionStoreManager} from '../views/utils/TransactionStoreManager'

export class ComponentTransaction {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assertType(
      TypeCheck.isComponentContext(componentContext),
      'ComponentTransaction:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__componentContext = componentContext
    this.__actionTransaction = ActionTransactionMaker.create(this.__componentContext.dispatcher())
    this.__transactionStore = StoreTransactionMaker.create(this.__componentContext)

    this.__actionTransaction.listen(this.__transactionStore.store())
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {ComponentTransaction}
   */
  mountView(parentNode) {
    assertType(!!isNode(parentNode),
      'ComponentTransaction:constructor: `parentNode` argument should be NodeType'
    )
    this.__viewContainer = new ViewContainerTransaction(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        parentNode
      ),
      new TransactionStoreManager(this.__transactionStore.storePublic())
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount()
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
   * @returns {!ActionDispatcher<ActionTransaction>}
   */
  get actionTransaction() {
    return this.__actionTransaction.action()
  }
}
