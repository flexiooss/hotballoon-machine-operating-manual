import {assertType} from '@flexio-oss/assert'
import {ComponentRouter} from './ComponentRouter'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const __component = Symbol('__componentRouterPublic')

export class ComponentRouterPublic {
  /**
   *
   * @param {ComponentRouter} component
   */
  constructor(component) {
    assertType(component instanceof ComponentRouter, 'ComponentCounterPublic:constructor: `component` should be a ComponentBootstrap')
    /**
     * @private
     * @property {ComponentRouter} ComponentRouterPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @returns {PublicRouteHandler}
   */
  routeHandler() {
    return this[__component].routeHandler()
  }

  /**
   *
   * @returns {RouterActionDispatcher}
   */
  routerActionDispatcher() {
    return new RouterActionDispatcher(this[__component].actionChangeRoute(), globalFlexioImport.io.flexio.component_router.actions.ActionChangeRoute)
  }
}

class RouterActionDispatcher {
  constructor(action, actionObject) {
    this.__action = action
    this.__actionObject = actionObject
  }

  /**
   *
   * @param {URL} url
   */
  changeRoute(url) {
    this.__action.dispatch(new this.__actionObject(url))
  }
}
