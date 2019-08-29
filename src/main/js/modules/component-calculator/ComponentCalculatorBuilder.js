import {ComponentCalculatorPublic} from './component/ComponentCalculatorPublic'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNode} from '@flexio-oss/assert'
import {ComponentCalculator} from './component/ComponentCalculator'

export class ComponentCalculatorBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {ComponentCalculatorPublic}
   */
  static build(APP, executor, transactionActionDispatcher) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentCalculatorBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)

    return new ComponentCalculatorPublic(
      new ComponentCalculator(
        APP.addComponentContext(),
        executor,
        transactionActionDispatcher
      )
    )
  }
}
