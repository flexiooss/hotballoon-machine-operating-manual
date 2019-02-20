import {DocComponent} from '../../DocComponent'
import {ComponentContext} from 'hotballoon'

export class InitDocComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   */
  constructor(payload, APP, parentNode, routeHandler, changeRoute) {
    DocComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      routeHandler,
      changeRoute
    )
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, routeHandler, changeRoute) {
    return new this(payload, APP, parentNode, routeHandler, changeRoute)
  }
}
