import {assert, isNumber} from 'flexio-jshelpers'

export class ActionModifyCounter {
  /**
   *
   * @param {int} sum
   */
  constructor(sum = 0) {
    assert(isNumber(sum), 'hotballoon:ActionNumberInput:constructor: `sum` argument should be a number')
    this.sum = sum
  }
}
