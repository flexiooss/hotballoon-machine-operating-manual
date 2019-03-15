'use strict'
import {isNode, assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {InitRouterComponent} from '../../_component-router'
import {initActionInitialize} from '../actions/ActionInitialize/InitActionInitialize'
import {listenActionInitialize} from '../actions/ActionInitialize/ListenActionInitialize'
import {ActionInitialize} from '../actions/ActionInitialize/ActionInitialize'
import {InitTransactionStoreComponent} from '../../component-transaction-store/component/InitTransactionStoreComponent'

export class MainComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   */
  constructor(componentContext, parentNode, executor) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext)
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__executor = executor
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.addRouter()
    this.addActionInitialize()
    this.addTransactionStore()
  }

  /**
   *
   * @private
   */
  addActionInitialize() {
    this.__actionInitialize = initActionInitialize(this)
    listenActionInitialize(this)
  }

  addRouter() {
    const routerComponent = InitRouterComponent.create(this.__componentContext.APP())
    this.__routerActionDispatcher = routerComponent.routerActionDispatcher
    this.__routeHandler = routerComponent.routeHandler
  }

  addTransactionStore() {
    this.__transactionActionDispatcher = InitTransactionStoreComponent.create(
      this.componentContext.APP(),
      this.__parentNode
    ).transactionActionDispatcher()
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }

  dispatchActionInitialize(message) {
    this.__actionInitialize.dispatch(new ActionInitialize(message))
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @return {MainComponent}
   * @static
   */
  static create(componentContext, parentNode, executor) {
    return new this(componentContext, parentNode, executor)
  }
}
