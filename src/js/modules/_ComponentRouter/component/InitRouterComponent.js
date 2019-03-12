import {RouterComponent} from './RouterComponent'
import {ActionChangeRoute} from '../actions/ActionChangeRoute/ActionChangeRoute'

export class InitRouterComponent {
  /**
   *
   * @param {HotBalloonApplication} APP
   */
  constructor(APP) {
    this.__routerComponent = RouterComponent.create(APP.addComponentContext())
  }

  get routeHandler() {
    return this.__routerComponent.routeHandler
  }

  get routerActionDispatcher() {
    return new RouterActionDispatcher(this.__routerComponent.actionChangeRoute, ActionChangeRoute)
  }

  /**
   *
   * @param {HotBalloonApplication} APP
   * @return {InitRouterComponent}
   * @constructor
   * @static
   */
  static create(APP) {
    return new this(APP)
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
