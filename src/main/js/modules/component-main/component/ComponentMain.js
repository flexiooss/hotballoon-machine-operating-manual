'use strict'
import '../import'
import {isNode, assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {ComponentRouterBuilder} from '../../_component-router'
import {ComponentTransactionBuilder} from '../../component-transaction-store/ComponentTransactionBuilder'
import {ActionInitializeUtils} from '../actions/ActionInitialize/ActionInitializeUtils'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const ActionInitialize = globalFlexioImport.io.flexio.component_main.actions.ActionInitialize

export class ComponentMain {
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
      'ComponentRouter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__executor = executor
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__actionInitialize = null
    this.__routeHandler = null
    this.__routerActionDispatcher = null
    this.__transactionActionDispatcher = null

    this.__addRouter()
    this.__addTransaction()
    this.__addActionInitialize()
  }

  /**
   *
   * @returns {ComponentMain}
   * @private
   */
  __addActionInitialize() {
    this.__actionInitialize = new ActionInitializeUtils(
      this.__componentContext.dispatcher(),
      this.__componentContext.APP(),
      this.__parentNode,
      this.__routeHandler,
      this.__routerActionDispatcher,
      this.__executor,
      this.__transactionActionDispatcher
    ).init().listen()
    return this
  }

  /**
   *
   * @returns {ComponentMain}
   * @private
   */
  __addRouter() {
    const routerComponent = ComponentRouterBuilder.build(this.__componentContext.APP())
    this.__routerActionDispatcher = routerComponent.routerActionDispatcher()
    this.__routeHandler = routerComponent.routeHandler()
    return this
  }

  /**
   *
   * @returns {ComponentMain}
   * @private
   */
  __addTransaction() {
    const transactionAction = ComponentTransactionBuilder.build(
      this.componentContext.APP(),
      this.__parentNode
    ).mountView()
    this.__transactionActionDispatcher = transactionAction.transactionActionDispatcher()
    return this
  }

  /**
   *
   * @param message
   */
  dispatchActionInitializeDoc(message) {
    this.__actionInitialize.action().dispatch(new ActionInitialize(message))
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }
}
