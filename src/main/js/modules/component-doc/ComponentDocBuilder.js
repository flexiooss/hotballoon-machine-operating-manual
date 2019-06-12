import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNode} from '@flexio-oss/assert'
import {ComponentDoc} from './component/ComponentDoc'
import {ComponentDocPublic} from './component/ComponentDocPublic'

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
      'ComponentCounterBuilder:build: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    assert(!!isNode(parentNode),
      'ComponentCounterBuilder:build: `parentNode` argument should be NodeType, %s given',
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
