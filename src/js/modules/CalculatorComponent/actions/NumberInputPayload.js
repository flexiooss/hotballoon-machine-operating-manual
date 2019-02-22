import {assert, isString} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class NumberInputPayload extends ActionPayload {
  /**
   *
   * @param {String} number
   */
  constructor(number = '') {
    super()
    assert(isString(number), 'hotballoon:NumberInputPayload:constructor: `number` argument should be a string')
    this.number = number
  }
}
