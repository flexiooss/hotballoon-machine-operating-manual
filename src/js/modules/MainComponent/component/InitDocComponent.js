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
   * @param {function} transactionAction
   */
  constructor(payload, APP, parentNode, routeHandler, changeRoute, executor, transactionAction) {
    DocComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      routeHandler,
      changeRoute,
      executor,
      transactionAction
    ).setEventLoop().mountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, routeHandler, changeRoute, executor, transactionAction) {
    return new this(payload, APP, parentNode, routeHandler, changeRoute, executor, transactionAction)
  }
}
