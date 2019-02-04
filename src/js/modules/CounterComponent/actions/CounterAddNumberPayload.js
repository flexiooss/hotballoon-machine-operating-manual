import {assert, isNumber} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class CounterAddNumberPayload extends ActionPayload {
  /**
   *
   * @param sum
   * @param component
   */
  constructor(sum = 0, component = null) {
    super()
    assert(isNumber(sum), 'hotballoon:NumberInputPayload:constructor: `sum` argument should be a number')
    this.sum = sum
    this.component = component
  }
}
