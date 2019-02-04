import {assert, isNumber, isObject} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'
import {OperatorNull} from '../component/operator/OperatorNull'

export class OperatorInputPayload extends ActionPayload {
  /**
   *
   * @param operator
   * @param component
   */
  constructor(operator = new OperatorNull(), component = null) {
    super()
    assert(isObject(operator), 'hotballoon:NumberInputPayload:constructor: `operator` argument should be an object')
    this.operator = operator
    this.component = component
  }
}
