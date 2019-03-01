'use strict'
import {TypeCheck} from 'hotballoon'
import {addStoreResult} from './catalogStores/addStoreResult'
import {isNode, assert} from 'flexio-jshelpers'
import {StoreHandlerResult} from '../stores/StoreHandlerResult'
import {addCalculatorViewContainer} from './catalogContainerViews/addCalculatorViewContainer'
import {addActionNumberInput} from './catalogActions/addActionNumberInput'
import {addActionResultInput} from './catalogActions/addActionResultInput'
import {addActionOperatorInput} from './catalogActions/addActionOperatorInput'

export class ComponentCalculator {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   */
  constructor(componentContext, parentNode, executor, transactionAction) {
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
    this.__transactionAction = transactionAction
  }

  addResultStore() {
    this.__resultStore = addStoreResult(this)
    this.__resultStoreHandler = new StoreHandlerResult(this.__resultStore)
    return this
  }

  addActionNumberInput() {
    addActionNumberInput(this)
    return this
  }

  addActionOperatorInput() {
    addActionOperatorInput(this)
    return this
  }

  addActionResultInput() {
    addActionResultInput(this)
    return this
  }

  mountView() {
    addCalculatorViewContainer(this)
      .renderAndMount(this.__parentNode)
    return this
  }

  setEventLoop() {
    this.addResultStore()
    this.addActionNumberInput()
    this.addActionOperatorInput()
    this.addActionResultInput()
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
    return this.__resultStore
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   * @return {ComponentCalculator}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, executor, transactionAction) {
    return new this(componentContext, parentNode, executor, transactionAction)
  }
}
