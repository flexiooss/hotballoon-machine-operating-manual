'use strict'
import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {RouterBuilder} from 'flexio-jsrouter'
import {UrlConfiguration} from 'flexio-jsrouter/src/UrlConfiguration'
import {PublicRouteHandler} from 'flexio-jsrouter/src/Route/PublicRouteHandler'
import {Route} from 'flexio-jsrouter/src/Route/Route'
import {ActionChangeRouteUtils} from '../actions/ActionChangeRoute/ActionChangeRouteUtils'

export class ComponentRouter {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `componentContext` argument should be ComponentContext, %s given',
      typeof componentContext)

    this.__componentContext = componentContext
    this.__router = RouterBuilder.build(new UrlConfiguration('https', 'localhost', '8080'))
    this.__routeHandler = new PublicRouteHandler(this.__router, Route)
    this.__actionChangeRoute = null

    this.__addActionChangeRoute()
  }

  /**
   *
   * @returns {ComponentRouter}
   * @private
   */
  __addActionChangeRoute() {
    this.__actionChangeRoute = new ActionChangeRouteUtils(
      this.__componentContext.dispatcher(),
      this.__router
    ).init().listen()
    return this
  }

  /**
   *
   * @return {PublicRouteHandler}
   */
  routeHandler() {
    return this.__routeHandler
  }

  /**
   *
   * @returns {Action}
   */
  actionChangeRoute() {
    return this.__actionChangeRoute.action()
  }
}
