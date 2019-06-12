'use strict'
import '../import'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {isNode, assert} from '@flexio-oss/assert'
import {ViewContainerDocUtils} from '../views/doc/ViewContainerDocUtils'
import {ActionInitializeViewUtils} from '../actions/ActionInitializeView/ActionInitializeViewUtils'
import {Route} from 'flexio-jsrouter/src/Route/Route'
import {StoreNavbarUtils} from '../stores/storeNavbar/StoreNavbarUtils'
import {EventStoreChangeViewUtils} from './EventChangeView/EventStoreChangeViewUtils'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const ActionInitializeView = globalFlexioImport.io.flexio.component_doc.actions.ActionInitializeView

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
      'ComponentDoc:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentDoc:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__routeHandler = routeHandler
    this.__routerActionDispatcher = routerActionDispatcher
    this.__executor = executor
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__viewContainer = null
    this.__actionInitializeView = null
    this.__navbarStore = null

    this.__addDocRoute()
    this.__addStoreNavbar()
    this.__addActionInitializer()
  }
  /**
   *
   * @returns {ComponentDoc}
   * @private
   */
  __addDocRoute() {
    const docRoute = new Route(
      'doc',
      '/doc/{component}/{option}',
      obj => Object.assign({}, obj),
      (params) => {
        this.__actionInitializeView.action().dispatch(
          new ActionInitializeView(
            params.component,
            params.option
          )
        )
      }
    )
    this.__routeHandler.addRoute(docRoute)
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   * @private
   */
  __addStoreNavbar() {
    this.__navbarStore = new StoreNavbarUtils(this.__componentContext, this.__routeHandler).build()
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   * @private
   */
  __addEventStoreChangeView() {
    new EventStoreChangeViewUtils(
      this.__navbarStore.storePublic(),
      this.__componentContext,
      this.__viewContainer.ID(),
      this.__executor,
      this.__transactionActionDispatcher
    ).listen()
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   * @private
   */
  __addActionInitializer() {
    this.__actionInitializeView = new ActionInitializeViewUtils(
      this.__componentContext.dispatcher(),
      this.__navbarStore.store()
    ).init().listen()
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   */
  mountView() {
    this.__viewContainer = new ViewContainerDocUtils(
      this.__componentContext,
      this.__parentNode,
      this.__routerActionDispatcher,
      this.__navbarStore.storePublic()
    ).init()
    this.__addEventStoreChangeView()
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

  /**
   *
   * @param {String} component
   * @param {String} mode
   * @returns {ComponentDoc}
   */
  dispatchActionInitialize(component, mode) {
    this.__actionInitializeView.action().dispatch(new ActionInitializeView(component, mode))
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer.viewContainer()),
      'ComponentDoc:unmountView: `viewContainer` should be a instanciate before use it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID())
    return this
  }
}
