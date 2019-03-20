'use strict'
import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {RouterBuilder} from 'flexio-jsrouter'
import {UrlConfiguration} from 'flexio-jsrouter/src/UrlConfiguration'
import {PublicRouteHandler} from 'flexio-jsrouter/src/Route/PublicRouteHandler'
import {Route} from 'flexio-jsrouter/src/Route/Route'
import {initActionChangeRoute} from '../actions/ActionChangeRoute/InitActionChangeRoute'
import {
  listenActionChangeRoute,
  ListenActionChangeRouteParams
} from '../actions/ActionChangeRoute/ListenActionChangeRoute'

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
  }

  addActionChangeRoute() {
    this.__actionChangeRoute = initActionChangeRoute(this.__componentContext.dispatcher())
    listenActionChangeRoute(
      new ListenActionChangeRouteParams(
        this.__router,
        this.__actionChangeRoute
      )
    )
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
    return this.__actionChangeRoute
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {ComponentRouter}
   * @static
   */
  static create(componentContext) {
    return new this(componentContext)
  }
}
