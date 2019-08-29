'use strict'
import '../import'
import {isNode, assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {ComponentRouterBuilder} from '../../component-router'
import {ComponentTransactionBuilder} from '../../component-transaction-store/ComponentTransactionBuilder'
import {ActionInitializeMaker} from '../actions/ActionInitializeMaker'
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

    const routerComponent = ComponentRouterBuilder.build(this.__componentContext.APP())
    this.__routerActionDispatcher = routerComponent.routerActionDispatcher()
    this.__routeHandler = routerComponent.routeHandler()
    this.__transactionActionDispatcher = ComponentTransactionBuilder.build(this.componentContext.APP()).mountView(this.__parentNode).transactionActionDispatcher()
    this.__actionInitialize = ActionInitializeMaker.create(this.__componentContext.dispatcher())

    this.__actionInitialize.listen(this.__componentContext.APP(), this.__parentNode, this.__routeHandler, this.__routerActionDispatcher, this.__executor, this.__transactionActionDispatcher)
  }

  /**
   *
   * @param {string} message
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
