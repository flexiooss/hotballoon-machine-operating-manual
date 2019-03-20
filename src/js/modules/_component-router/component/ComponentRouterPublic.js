import {assertType} from 'flexio-jshelpers'
import {ComponentRouter} from './ComponentRouter'
import {ActionChangeRoute} from '../actions/ActionChangeRoute/ActionChangeRoute'

const __component = Symbol('__componentRouterPublic')

export class ComponentRouterPublic {
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
   * @returns {ComponentRouterPublic}
   */
  initRouteAction() {
    this[__component]
      .addActionChangeRoute()
    return this
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
    return new RouterActionDispatcher(this[__component].actionChangeRoute(), ActionChangeRoute)
  }
}

class RouterActionDispatcher {
  constructor(action, actionObject) {
    this.__action = action
    this.__actionObject = actionObject
  }

  changeRoute(url) {
    this.__action.dispatch(new this.__actionObject(url))
  }
}
