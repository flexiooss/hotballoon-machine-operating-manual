import {TypeCheck} from 'hotballoon'
import {assert, isNode} from 'flexio-jshelpers'
import {ComponentDoc} from './ComponentDoc'
import {ComponentDocPublic} from './ComponentDocPublic'

export class ComponentDocBuilder {
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
  static build(payload, APP, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentDocBuilder:build: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    assert(!!isNode(parentNode),
      'ComponentDocBuilder:build: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    return new ComponentDocPublic(
      new ComponentDoc(
        APP.addComponentContext(),
        parentNode,
        routeHandler,
        routerActionDispatcher,
        executor,
        transactionActionDispatcher
      )
    )
  }
}
