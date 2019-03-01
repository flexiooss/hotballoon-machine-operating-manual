'use strict'
import {TypeCheck} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'
import {StoreHandlerNavbar} from '../stores/StoreHandlerNavbar'
import {addDocViewContainer} from './catalogContainerViews/addDocViewContainer'
import {addDocRoute} from './catalogRoutes/addRouteDoc'
import {addStoreNavbar} from './catalogStores/addStoreNavbar'
import {addActionInitializer} from './catalogActions/addActionInitializer'
import {addActionChangeView} from './catalogActions/addActionChangeView'

export class DocComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   */
  constructor(componentContext, parentNode, routeHandler, changeRoute, executor, transactionAction) {
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
    this.__changeRoute = changeRoute
    this.__executor = executor
    this.__viewContainerID = this.__componentContext.nextID()
    this.__transactionAction = transactionAction
  }

  addDocRoute() {
    addDocRoute(this)
    return this
  }

  addStoreNavbar() {
    this.__navbarStore = addStoreNavbar(this)
    this.__navbarStoreHandler = new StoreHandlerNavbar(this.__navbarStore)
    return this
  }

  addActionInitializer() {
    addActionInitializer(this)
    return this
  }

  addActionChangeView() {
    addActionChangeView(this)
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
    addDocViewContainer(this).renderAndMount(this.__parentNode)
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

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   * @return {DocComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, routeHandler, changeRoute, executor, transactionAction) {
    return new this(componentContext, parentNode, routeHandler, changeRoute, executor, transactionAction)
  }
}
