import {assertType} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenActionChangeRouteParams {
  /**
   *
   * @param {Router} router
   * @param {Action<ActionChangeRoute>}actionChangeRoute
   */
  constructor(router, actionChangeRoute) {
    assertType(TypeCheck.isAction(actionChangeRoute),
      'ComponentRouter:ListenActionChangeRouteParams: actionChangeRoute should be an Action'
    )

    this.router = router
    this.actionChangeRoute = actionChangeRoute
  }
}

/**
 *
 * @param {ListenActionChangeRouteParams} params
 */
export const listenActionChangeRoute = (params) => {
  assertType(params instanceof ListenActionChangeRouteParams,
    'ComponentRouter:listenActionChangeRoute: `params` should be ListenActionChangeRouteParams'
  )

  params.actionChangeRoute
    .listenWithCallback((payload) => {
      let routePathname = params.router.urlHandler.urlToPathname(payload.url)
      const routeWithParams = params.router.routeByPathname(routePathname)
      routeWithParams.route.callback(
        routeWithParams.route.builder(routeWithParams.params)
      )
    })
}
