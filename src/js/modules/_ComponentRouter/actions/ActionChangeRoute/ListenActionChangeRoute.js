import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {RouterComponent} component
 */
export const listenActionChangeRoute = (component) => {
  assert(component.__actionChangeRoute !== 'undefined',
    'listenActionChangeRoute: ActionChangeRoute should be initialized before using it'
  )

  component.__actionChangeRoute
    .listenWithCallback((payload) => {
      let routePathname = component.__router.urlHandler.urlToPathname(payload.url)
      console.log(routePathname)
      const routeWithParams = component.__router.routeByPathname(routePathname)
      routeWithParams.route.callback(
        routeWithParams.route.builder(routeWithParams.params)
      )
    })
}
