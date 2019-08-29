'use strict'
import '../import'
import {assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {RouterBuilder} from 'flexio-jsrouter'
import {UrlConfiguration} from 'flexio-jsrouter/src/js/UrlConfiguration'
import {PublicRouteHandler} from 'flexio-jsrouter/src/js/Route/PublicRouteHandler'
import {Route} from 'flexio-jsrouter/src/js/Route/Route'
import {ActionChangeRouteMaker} from '../actions/ActionChangeRoute/ActionChangeRouteMaker'

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
    this.__actionChangeRoute = ActionChangeRouteMaker.create(this.__componentContext.dispatcher())

    this.__actionChangeRoute.listen(this.__router)
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
   * @returns {ActionDispatcher}
   */
  actionChangeRoute() {
    return this.__actionChangeRoute.action()
  }
}
