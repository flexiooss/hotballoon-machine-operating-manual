import {ComponentCalculatorPublic} from './ComponentCalculatorPublic'
import {TypeCheck} from 'hotballoon'
import {assert, isNode} from 'flexio-jshelpers'
import {ComponentCalculator} from './ComponentCalculator'

export class ComponentCalculatorBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Element} parentNode
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {ComponentCalculatorPublic}
   */
  static build(APP, parentNode, executor, transactionActionDispatcher) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentCalculatorBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)

    assert(!!isNode(parentNode),
      'ComponentCalculatorBuilder:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    return new ComponentCalculatorPublic(
      new ComponentCalculator(
        APP.addComponentContext(),
        parentNode,
        executor,
        transactionActionDispatcher
      )
    )
  }
}
