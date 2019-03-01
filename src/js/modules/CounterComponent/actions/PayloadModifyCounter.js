import {assert, isNumber} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class PayloadModifyCounter extends ActionPayload {
  /**
   *
   * @param {int} sum
   */
  constructor(sum = 0) {
    super()
    assert(isNumber(sum), 'hotballoon:PayloadNumberInput:constructor: `sum` argument should be a number')
    this.sum = sum
  }
}
