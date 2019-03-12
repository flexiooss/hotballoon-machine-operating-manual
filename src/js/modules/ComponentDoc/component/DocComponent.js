'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'
import {initDocViewContainer} from '../views/doc/InitDocViewContainer'
import {addDocRoute} from './catalogRoutes/addRouteDoc'
import {initStoreNavbar} from '../stores/storeNavbar/InitStoreNavbar'
import {initActionInitializeView} from '../actions/ActionInitializeView/InitActionInitializeView'
import {initActionChangeView} from '../actions/ActionChangeView/InitActionChangeView'
import {listenActionChangeView} from '../actions/ActionChangeView/ListenActionChangeView'
import {listenActionInitializeView} from '../actions/ActionInitializeView/ListenActionInitializeView'
import {ActionInitializeView} from '../actions/ActionInitializeView/ActionInitializeView'
import {StoreHandlerNavbar} from '../stores/storeNavbar/StoreHandlerNavbar'

export class DocComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(componentContext, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__routeHandler = routeHandler
    this.__routerActionDispatcher = routerActionDispatcher
    this.__executor = executor
    this.__viewContainerID = this.__componentContext.nextID()
    this.__transactionActionDispatcher = transactionActionDispatcher
  }

  addDocRoute() {
    addDocRoute(this)
    return this
  }

  addStoreNavbar() {
    this.__navbarStore = initStoreNavbar(this)
    this.__navbarStoreHandler = new StoreHandlerNavbar(this.__navbarStore)
    return this
  }

  addActionInitializer() {
    this.__actionInitializeView = initActionInitializeView(this)
    listenActionInitializeView(this)
    return this
  }

  addActionChangeView() {
    this.__actionChangeView = initActionChangeView(this)
    listenActionChangeView(this)
    return this
  }

  /**
   *
   * @returns {DocComponent}
   */
  setEventLoop() {
    this.addDocRoute()
    this.addStoreNavbar()
    this.addActionInitializer()
    this.addActionChangeView()
    return this
  }

  /**
   *
   * @returns {DocComponent}
   */
  mountView() {
    initDocViewContainer(this).renderAndMount(this.__parentNode)
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
   * @returns {StoreNavbar}
   */
  get navbarStore() {
    return this.__navbarStore
  }
  dispatchActionInitialize() {
    this.__actionInitializeView.dispatch(new ActionInitializeView())
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {DocComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    return new this(componentContext, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher)
  }
}
