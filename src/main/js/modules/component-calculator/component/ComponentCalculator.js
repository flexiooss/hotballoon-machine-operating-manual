'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'
import {ActionNumberInputUtils} from '../actions/ActionNumberInputUtils/ActionNumberInputUtils'
import {ActionOperatorInputUtils} from '../actions/ActionOperatorInput/ActionOperatorInputUtils'
import {ActionResultInputUtils} from '../actions/ActionResultInput/ActionResultInputUtils'
import {StoreResultUtils} from '../stores/StoreResult/StoreResultUtils'
import {ViewContainerCalculatorUtils} from '../views/calculator/ViewContainerCalculatorUtils'

export class ComponentCalculator {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(componentContext, parentNode, executor, transactionActionDispatcher) {
    assert(!!isNode(parentNode),
      'ComponentCalculator:constructor: `parentNode` argument should be NodeType'
    )
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentCalculator:constructor: `componentContext` argument should be ComponentContext'
    )

    this.__executor = executor
    this.__parentNode = parentNode
    this.__componentContext = componentContext
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__resultStore = null
    this.__actionNumberInput = null
    this.__actionOperatorInput = null
    this.__actionResultInput = null
    this.__viewContainer = null

    this.__addResultStore()
    this.__addActionInput()
  }

  /**
   *
   * @returns {ComponentCalculator}
   * @private
   */
  __addResultStore() {
    this.__resultStore = new StoreResultUtils(this.__componentContext).build()
    return this
  }

  /**
   *
   * @returns {ComponentCalculator}
   * @private
   */
  __addActionInput() {
    this.__actionNumberInput = new ActionNumberInputUtils(
      this.__componentContext.dispatcher(),
      this.__resultStore.store(),
      this.__resultStore.storePublic()
    ).init()
    this.__actionResultInput = new ActionResultInputUtils(
      this.__componentContext.dispatcher(),
      this.__resultStore.store(),
      this.__resultStore.storePublic(),
      this.__transactionActionDispatcher,
      this.__componentContext.nextID(),
      this.__executor
    ).init()
    this.__actionOperatorInput = new ActionOperatorInputUtils(
      this.__componentContext.dispatcher(),
      this.__resultStore.store(),
      this.__resultStore.storePublic(),
      this.__actionResultInput.action()
    ).init()
    this.__actionNumberInput.listen()
    this.__actionResultInput.listen()
    this.__actionOperatorInput.listen()
    return this
  }

  /**
   *
   * @returns {ComponentCalculator}
   */
  mountView() {
    this.__viewContainer = new ViewContainerCalculatorUtils(
      this.__componentContext,
      this.__parentNode,
      this.__actionNumberInput.action(),
      this.__actionOperatorInput.action(),
      this.__actionResultInput.action(),
      this.__resultStore.storePublic()
    ).init()
    return this
  }

  /**
   *
   * @returns {ComponentCalculator}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer.viewContainer()),
      'ComponentCalculator:unmountView: `viewContainer` should be a instanciate before use it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID())
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
  get resultStore() {
    return this.__resultStoreHandler
  }
}
