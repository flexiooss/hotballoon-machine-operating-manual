import {assert, isString} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class PayloadNumberInput extends ActionPayload {
  /**
   *
   * @param {String} number
   */
  constructor(number = '') {
    super()
    assert(isString(number), 'hotballoon:PayloadNumberInput:constructor: `number` argument should be a string')
    this.number = number
  }
}
