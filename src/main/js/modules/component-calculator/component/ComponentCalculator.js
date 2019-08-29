'use strict'
import '../import'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {isNode, assert} from '@flexio-oss/assert'
import {ActionNumberInputMaker} from '../actions/ActionNumberInputMaker'
import {ActionOperatorInputMaker} from '../actions/ActionOperatorInputMaker'
import {ActionResultInputMaker} from '../actions/ActionResultInputMaker'
import {StoreResultMaker} from '../stores/StoreResultMaker'
import {ViewContainerCalculator} from '../views/ViewContainerCalculator'
import {CalculatorActionManager} from '../views/utils/CalculatorActionManager'
import {CalculatorStoreManager} from '../views/utils/CalculatorStoreManager'

export class ComponentCalculator {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(componentContext, executor, transactionActionDispatcher) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentCalculator:constructor: `componentContext` argument should be ComponentContext'
    )
    this.__executor = executor
    this.__componentContext = componentContext
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__actionNumberInput = ActionNumberInputMaker.create(this.__componentContext.dispatcher())
    this.__actionResultInput = ActionResultInputMaker.create(this.__componentContext.dispatcher())
    this.__actionOperatorInput = ActionOperatorInputMaker.create(this.__componentContext.dispatcher())
    this.__resultStore = StoreResultMaker.create(this.__componentContext)

    this.__actionNumberInput.listen(this.__resultStore.store())
    this.__actionResultInput.listen(this.__resultStore.store(), this.__transactionActionDispatcher, this.__executor, this.__componentContext.nextID())
    this.__actionOperatorInput.listen(this.__resultStore.store(), this.__actionResultInput.action())
  }

  /**
   * @param {Element} parentNode
   * @returns {this}
   */
  mountView(parentNode) {
    assert(!!isNode(parentNode),
      'ComponentCalculator:constructor: `parentNode` argument should be NodeType'
    )
    this.__viewContainer = new ViewContainerCalculator(
      new ViewContainerParameters(this.__componentContext, this.__componentContext.nextID(), parentNode),
      new CalculatorStoreManager(this.__resultStore.storePublic()),
      new CalculatorActionManager(
        this.__actionNumberInput.action(),
        this.__actionOperatorInput.action(),
        this.__actionResultInput.action()
      )
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount(parentNode)
    return this
  }

  /**
   *
   * @returns {this}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer),
      'ComponentCalculator:unmountView: `viewContainer` should be a instanciate before use it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID)
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
