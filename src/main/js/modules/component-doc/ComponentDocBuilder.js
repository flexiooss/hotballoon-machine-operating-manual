import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert} from '@flexio-oss/assert'
import {ComponentDoc} from './component/ComponentDoc'
import {ComponentDocPublic} from './component/ComponentDocPublic'

export class ComponentDocBuilder {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  static build(payload, APP, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentCounterBuilder:build: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)

    return new ComponentDocPublic(
      new ComponentDoc(
        APP.addComponentContext(),
        routeHandler,
        routerActionDispatcher,
        executor,
        transactionActionDispatcher
      )
    )
  }
}
