import {assert, isString} from 'flexio-jshelpers'

export class ActionNumberInput {
  /**
   *
   * @param {String} number
   */
  constructor(number = '') {
    assert(isString(number), 'hotballoon:ActionNumberInput:constructor: `number` argument should be a string')
    this.number = number
  }
}
