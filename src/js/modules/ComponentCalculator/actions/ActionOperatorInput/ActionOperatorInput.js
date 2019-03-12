import {assert, isObject} from 'flexio-jshelpers'
import {OperatorNull} from '../../component/operator/OperatorNull'

export class ActionOperatorInput {
  /**
   *
   * @param {Operator} operator
   */
  constructor(operator = new OperatorNull()) {
    assert(isObject(operator), 'hotballoon:ActionNumberInput:constructor: `operator` argument should be an object')
    this.operator = operator
  }
}
