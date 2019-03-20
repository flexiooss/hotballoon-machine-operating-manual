'use strict'
import {TypeCheck} from 'hotballoon'
import {initStoreResult} from '../stores/StoreResult/InitStoreResult'
import {isNode, assert} from 'flexio-jshelpers'
import {initCalculatorViewContainer, CalculatorViewContainerParams} from '../views/calculator/initCalculatorViewContainer'
import {initActionResultInput} from '../actions/ActionResultInput/InitActionResultInput'
import {initActionNumberInput} from '../actions/ActionNumberInput/InitActionNumberInput'
import {initActionOperatorInput} from '../actions/ActionOperatorInput/InitActionOperatorInput'
import {
  listenActionNumberInput,
  ListenerActionNumberInputParams
} from '../actions/ActionNumberInput/ListenActionNumberInput'
import {
  listenActionResultInput,
  ListenerActionResultInputParams
} from '../actions/ActionResultInput/ListenActionResultInput'
import {
  listenActionOperatorInput,
  ListenerActionOperatorInputParams
} from '../actions/ActionOperatorInput/ListenActionOperatorInput'
import {StoreHandlerResult} from '../stores/StoreResult/StoreHandlerResult'

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
      'ComponentTransaction:constructor: `parentNode` argument should be NodeType'
    )
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentTransaction:constructor: `componentContext` argument should be ComponentContext'
    )

    this.__executor = executor
    this.__parentNode = parentNode
    this.__componentContext = componentContext
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__resultStore = null
    this.__resultStoreHandler = null
    this.__actionNumberInput = null
    this.__actionOperatorInput = null
    this.__actionResultInput = null
  }

  addResultStore() {
    this.__resultStore = initStoreResult(this.__componentContext)
    console.log(this.__resultStore)
    this.__resultStoreHandler = new StoreHandlerResult(this.__resultStore)
    return this
  }

  addActionInput() {
    this.__actionNumberInput = initActionNumberInput(this.__componentContext.dispatcher())
    this.__actionOperatorInput = initActionOperatorInput(this.__componentContext.dispatcher())
    this.__actionResultInput = initActionResultInput(this.__componentContext.dispatcher())
    return this
  }

  listenActionInput() {
    listenActionNumberInput(
      new ListenerActionNumberInputParams(
        this.__actionNumberInput,
        this.__resultStoreHandler,
        this.__resultStore
      )
    )
    listenActionOperatorInput(
      new ListenerActionOperatorInputParams(
        this.__actionOperatorInput,
        this.__actionResultInput,
        this.__resultStoreHandler,
        this.__resultStore
      )
    )
    listenActionResultInput(
      new ListenerActionResultInputParams(
        this.__actionResultInput,
        this.__resultStoreHandler,
        this.__resultStore,
        this.__transactionActionDispatcher,
        this.__componentContext.nextID(),
        this.__executor
      )
    )
    return this
  }

  mountView() {
    initCalculatorViewContainer(
      this.__componentContext,
      this.__parentNode,
      new CalculatorViewContainerParams(
        this.__resultStoreHandler,
        this.__actionNumberInput,
        this.__actionOperatorInput,
        this.__actionResultInput
      )
    )
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
