import { assertType, isNull } from 'flexio-jshelpers'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from 'hotballoon'
import {ActionChangeRoute} from './ActionChangeRoute'

export class ActionChangeRouteUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Router} router
   */
  constructor(dispatcher, router) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionChangeRouteUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    this.__dispatcher = dispatcher
    this.__router = router
    this.__action = null
  }

  /**
   *
   * @returns {ActionChangeRouteUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionChangeRoute,
          /**
           *
           * @param {ActionChangeRoute} data
           * @return {ActionChangeRoute}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {ActionChangeRoute} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.url)
          }
        ),
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionChangeRouteUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionChangeRouteUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      let routePathname = this.__router.urlHandler.urlToPathname(payload.url)
      const routeWithParams = this.__router.routeByPathname(routePathname)
      routeWithParams.route.callback(
        routeWithParams.route.builder(routeWithParams.params)
      )
    })
    return this
  }

  /**
   *
   * @returns {Action<ActionChangeRoute>}
   */
  action() {
    return this.__action
  }
}
