'use strict'
import '../import'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {isNode, assert} from '@flexio-oss/assert'
import {ViewContainerDoc} from '../views/ViewContainerDoc'
import {ActionInitializeViewMaker} from '../actions/ActionInitializeViewMaker'
import {Route} from 'flexio-jsrouter/src/js/Route/Route'
import {StoreNavbarMaker} from '../stores/StoreNavbarMaker'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {NavbarStoreManager} from '../views/utils/NavbarStoreManager'

export class ComponentDoc {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(componentContext, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'ComponentDoc:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    this.__componentContext = componentContext
    this.__routeHandler = routeHandler
    this.__routerActionDispatcher = routerActionDispatcher
    this.__executor = executor
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__actionInitializeView = ActionInitializeViewMaker.create(this.__componentContext.dispatcher())
    this.__routeHandler.addRoute(new Route(
      'doc',
      '/doc/{component}/{option}',
      obj => Object.assign({}, obj),
      (params) => {
        this.__actionInitializeView.action().dispatch(
          new globalFlexioImport.io.flexio.component_doc.actions.ActionInitializeView(
            params.component,
            params.option
          )
        )
      }
    ))
    this.__navbarStore = StoreNavbarMaker.create(this.__componentContext, this.__routeHandler)

    this.__actionInitializeView.listen(this.__navbarStore.store())
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {ComponentDoc}
   */
  mountView(parentNode) {
    assert(!!isNode(parentNode),
      'ComponentDoc:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode
    )
    this.__viewContainer = new ViewContainerDoc(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        parentNode
      ),
      new NavbarStoreManager(this.__navbarStore.storePublic()),
      this.__routerActionDispatcher
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount()
    this.__navbarStore.listen(this.__componentContext, this.__viewContainer.ID, this.__executor, this.__transactionActionDispatcher)
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
    this.__actionInitializeView.action().dispatch(new globalFlexioImport.io.flexio.component_doc.actions.ActionInitializeView(component, mode))
    return this
  }

  /**
   *
   * @returns {ComponentDoc}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer),
      'ComponentDoc:unmountView: `viewContainer` should be a instanciate before use it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID)
    return this
  }
}
