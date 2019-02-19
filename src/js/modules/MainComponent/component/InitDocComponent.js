import {DocComponent} from '../../DocComponent'
import {ComponentContext} from 'hotballoon'

export class InitDocComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   */
  constructor(payload, APP, parentNode, routeHandler) {
    DocComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      routeHandler
    )
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, routeHandler) {
    return new this(payload, APP, parentNode, routeHandler)
  }
}
