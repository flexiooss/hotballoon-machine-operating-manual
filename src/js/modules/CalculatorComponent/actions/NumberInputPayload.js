import {assert, isNumber} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class NumberInputPayload extends ActionPayload {
  /**
   *
   * @param number
   * @param component
   */
  constructor(number = 0, component = null) {
    super()
    assert(isNumber(number), 'hotballoon:NumberInputPayload:constructor: `number` argument should be a number')
    this.number = number
    this.component = component
  }
}
