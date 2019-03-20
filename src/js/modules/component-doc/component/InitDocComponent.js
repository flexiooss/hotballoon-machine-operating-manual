import {ComponentDoc} from '..'
import {assert, isNode} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

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
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentDoc:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    assert(!!isNode(parentNode),
      'ComponentDoc:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)
    this.__docComponent = ComponentDoc.create(
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
}
