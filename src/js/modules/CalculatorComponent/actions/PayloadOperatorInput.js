import {assert, isObject} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'
import {OperatorNull} from '../component/operator/OperatorNull'

export class PayloadOperatorInput extends ActionPayload {
  /**
   *
   * @param {Operator} operator
   */
  constructor(operator = new OperatorNull()) {
    super()
    assert(isObject(operator), 'hotballoon:PayloadNumberInput:constructor: `operator` argument should be an object')
    this.operator = operator
  }
}
