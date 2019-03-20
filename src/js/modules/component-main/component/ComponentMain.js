'use strict'
import {isNode, assert, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {ComponentRouterBuilder} from '../../_component-router'
import {initActionInitialize} from '../actions/ActionInitialize/InitActionInitialize'
import {listenActionInitialize, ListenActionInitializeParams} from '../actions/ActionInitialize/ListenActionInitialize'
import {ComponentTransactionBuilder} from '../../component-transaction-store/component/ComponentTransactionBuilder'
import '../generated/io/package'

const ActionInitialize = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_main.actions.ActionInitialize

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
  }

  /**
   *
   * @private
   */
  addActionInitialize() {
    this.__actionInitialize = initActionInitialize(this.__componentContext.dispatcher())
    listenActionInitialize(new ListenActionInitializeParams(
      this.__actionInitialize,
      this.__componentContext.APP(),
      this.__parentNode,
      this.__routeHandler,
      this.__routerActionDispatcher,
      this.__executor,
      this.__transactionActionDispatcher
    ))
  }

  addRouter() {
    const routerComponent = ComponentRouterBuilder.build(this.__componentContext.APP()).initRouteAction()
    this.__routerActionDispatcher = routerComponent.routerActionDispatcher()
    this.__routeHandler = routerComponent.routeHandler()
  }

  addTransaction() {
    const transactionAction = ComponentTransactionBuilder.build(
      this.componentContext.APP(),
      this.__parentNode
    ).initTransaction()
    this.__transactionActionDispatcher = transactionAction.transactionActionDispatcher()
  }

  setEventLoop() {
    this.addRouter()
    this.addTransaction()
    this.addActionInitialize()
    return this
  }

  dispatchActionInitializeDoc(message) {
    this.__actionInitialize.dispatch(new ActionInitialize(message))
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }
}
