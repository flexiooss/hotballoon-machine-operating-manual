import {DocComponent} from '..'

export class InitDocComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(payload, APP, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    this.__docComponent = DocComponent.create(
      APP.addComponentContext(),
      parentNode,
      routeHandler,
      routerActionDispatcher,
      executor,
      transactionActionDispatcher
    ).setEventLoop().mountView()
  }

  dispatchActionInitialize() {
    this.__docComponent.dispatchActionInitialize()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    return new this(payload, APP, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher)
  }
}
