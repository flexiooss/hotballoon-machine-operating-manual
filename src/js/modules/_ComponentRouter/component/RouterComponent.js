'use strict'
import {assert} from 'flexio-jshelpers'
import {DispatcherEventListenerFactory, TypeCheck} from 'hotballoon'
import {ChangeRouteAction} from '../actions/ChangeRouteAction'
import {RouterBuilder} from 'flexio-jsrouter'
import {UrlConfiguration} from 'flexio-jsrouter/src/UrlConfiguration'
import {PublicRouteHandler} from 'flexio-jsrouter/src/Route/PublicRouteHandler'
import {Route} from 'flexio-jsrouter/src/Route/Route'
import {PathName} from 'flexio-jsrouter/src/URL/PathName'

export class RouterComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   */
  constructor(componentContext) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)
    this.__componentContext = componentContext
    this.__router = RouterBuilder.build(new UrlConfiguration('https', 'localhost', '8080'))
    this.__routeHandler = new PublicRouteHandler(this.__router, Route)

    this.__initListener()
  }

  /**
   *
   * @return {PublicRouteHandler}
   */
  get routeHandler() {
    return this.__routeHandler
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @return {RouterComponent}
   * @static
   */
  static create(componentContext) {
    return new this(componentContext)
  }

  /**
   *
   * @param {Route} route
   */
  addRoute(route) {
    this.__routeHandler.addRoute(route)
  }

  /**
   *
   * @param {string} routeName
   */
  removeRoute(routeName) {
    this.__routeHandler.removeRoute(routeName)
  }

  /**
   *
   * @private
   */
  __initListener() {
    this.__componentContext.listenAction(
      DispatcherEventListenerFactory.listen(
        new ChangeRouteAction())
        .callback((payload) => {
          console.trace()
          console.log(payload.url)
          console.log(typeof payload.url)
          console.log(payload.url.pathname)
          let routePathname = this.__router.urlHandler.urlToPathname(payload.url)
          console.log(routePathname)
          const routeWithParams = this.__router.routeByPathname(routePathname)
          routeWithParams.route.callback(
            routeWithParams.route.builder(routeWithParams.params)
          )
        })
        .build()
    )
  }
}
