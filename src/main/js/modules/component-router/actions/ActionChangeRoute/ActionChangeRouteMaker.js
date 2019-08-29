import { assertType, isNull } from '@flexio-oss/assert'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class ActionChangeRouteMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionChangeRoute>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionChangeRouteMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionChangeRouteMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_router.actions.ActionChangeRoute,
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
        dispatcher
      )
    )
    return new ActionChangeRouteMaker(action)
  }

  /**
   * @param {Router} router
   * @returns {ActionChangeRouteMaker}
   */
  listen(router) {
    assertType(!isNull(this.__action),
      'ActionChangeRouteMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      let routePathname = router.urlHandler.urlToPathname(payload.url())
      const routeWithParams = router.routeByPathname(routePathname)
      routeWithParams.route.callback(
        routeWithParams.route.builder(routeWithParams.params)
      )
    })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionChangeRoute>}
   */
  action() {
    return this.__action
  }
}
