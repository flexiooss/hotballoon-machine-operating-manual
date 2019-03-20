'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'
import {initDocViewContainer, InitDocViewContainerParams} from '../views/doc/InitDocViewContainer'
import {addDocRoute} from './catalogRoutes/addRouteDoc'
import {initStoreNavbar} from '../stores/storeNavbar/InitStoreNavbar'
import {initActionInitializeView} from '../actions/ActionInitializeView/InitActionInitializeView'
import {initActionChangeView} from '../actions/ActionChangeView/InitActionChangeView'
import {listenActionChangeView, ListenActionChangeViewParams} from '../actions/ActionChangeView/ListenActionChangeView'
import {
  listenActionInitializeView,
  ListenActionInitializeViewParams
} from '../actions/ActionInitializeView/ListenActionInitializeView'
import {ActionInitializeView} from '../actions/ActionInitializeView/ActionInitializeView'
import {StoreHandlerNavbar} from '../stores/storeNavbar/StoreHandlerNavbar'

export class ComponentDoc {
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
      'ComponentRouter:constructor: `parentNode` argument should be NodeType, %s given',
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
    this.__actionChangeView = null
    this.__actionInitializeView = null
    this.__navbarStore = null
    this.__navbarStoreHandler = null
  }

  addDocRoute() {
    addDocRoute(this)
    return this
  }

  addStoreNavbar() {
    this.__navbarStore = initStoreNavbar(this.__componentContext, this.__routeHandler)
    this.__navbarStoreHandler = new StoreHandlerNavbar(this.__navbarStore)
    return this
  }

  addActionInitializer() {
    this.__actionInitializeView = initActionInitializeView(this.__componentContext.dispatcher())
    listenActionInitializeView(
      new ListenActionInitializeViewParams(
        this.__actionInitializeView,
        this.__actionChangeView
      )
    )
    return this
  }

  addActionChangeView() {
    this.__actionChangeView = initActionChangeView(this.__componentContext.dispatcher())
    listenActionChangeView(
      new ListenActionChangeViewParams(
        this.__actionChangeView,
        this.__navbarStoreHandler,
        this.__componentContext,
        this.__viewContainerID,
        this.__executor,
        this.__transactionActionDispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   */
  setEventLoop() {
    this.addDocRoute()
    this.addStoreNavbar()
    this.addActionChangeView()
    this.addActionInitializer()
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   */
  mountView() {
    initDocViewContainer(
      this.__componentContext,
      this.__parentNode,
      new InitDocViewContainerParams(
        this.__navbarStoreHandler,
        this.__viewContainerID,
        this.__routerActionDispatcher
      )
    ).renderAndMount(this.__parentNode)
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
    return this.__navbarStoreHandler
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
   * @return {ComponentDoc}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    return new this(componentContext, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher)
  }
}
