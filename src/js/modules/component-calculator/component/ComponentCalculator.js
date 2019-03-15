'use strict'
import {TypeCheck} from 'hotballoon'
import {initStoreResult} from '../storesBuilder/StoreResult/InitStoreResult'
import {isNode, assert} from 'flexio-jshelpers'
import {addCalculatorViewContainer} from '../views/calculator/addCalculatorViewContainer'
import {initActionResultInput} from '../actionsUtil/ActionResultInput/InitActionResultInput'
import {initActionNumberInput} from '../actionsUtil/ActionNumberInput/InitActionNumberInput'
import {initActionOperatorInput} from '../actionsUtil/ActionOperatorInput/InitActionOperatorInput'
import {listenActionNumberInput} from '../actionsUtil/ActionNumberInput/ListenActionNumberInput'
import {listenActionResultInput} from '../actionsUtil/ActionResultInput/ListenActionResultInput'
import {listenActionOperatorInput} from '../actionsUtil/ActionOperatorInput/ListenActionOperatorInput'
import {StoreHandlerResult} from '../storesBuilder/StoreResult/StoreHandlerResult'

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
      'ComponentTransaction:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentTransaction:constructor: `componentContext` argument should be ComponentContext, %s given',
      typeof componentContext
    )

    this.__executor = executor
    this.__parentNode = parentNode
    this.__componentContext = componentContext
    this.__transactionActionDispatcher = transactionActionDispatcher
  }

  addResultStore() {
    this.__resultStore = initStoreResult(this)
    this.__resultStoreHandler = new StoreHandlerResult(this.__resultStore)
    return this
  }

  addActionInput() {
    this.__actionNumberInput = initActionNumberInput(this)
    this.__actionOperatorInput = initActionOperatorInput(this)
    this.__actionResultInput = initActionResultInput(this)
    return this
  }

  listenActionInput() {
    listenActionNumberInput(this)
    listenActionOperatorInput(this)
    listenActionResultInput(this)
    return this
  }

  mountView() {
    addCalculatorViewContainer(this)
      .renderAndMount(this.__parentNode)
    return this
  }

  setEventLoop() {
    this.addResultStore()
    this.addActionInput()
    this.listenActionInput()
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

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {ComponentCalculator}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, executor, transactionActionDispatcher) {
    return new this(componentContext, parentNode, executor, transactionActionDispatcher)
  }
}
