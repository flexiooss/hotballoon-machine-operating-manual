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
   * @param {ExecutorInterface} executor
   */
  constructor(payload, APP, parentNode, routeHandler, changeRoute, executor) {
    DocComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      routeHandler,
      changeRoute,
      executor
    )
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @param {ExecutorInterface} executor
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, routeHandler, changeRoute, executor) {
    return new this(payload, APP, parentNode, routeHandler, changeRoute, executor)
  }
}
