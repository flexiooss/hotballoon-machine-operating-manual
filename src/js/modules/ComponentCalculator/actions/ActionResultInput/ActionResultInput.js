import {OperatorNull} from '../../component/operator/OperatorNull'
import {assert, isObject} from 'flexio-jshelpers'

export class ActionResultInput {
  /**
   *
   * @param {Operator} operator
   */
  constructor(operator = new OperatorNull()) {
    assert(isObject(operator), 'hotballoon:ActionNumberInput:constructor: `operator` argument should be an object')
    this.operator = operator
  }
}
