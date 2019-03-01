import {assert, isBoolean} from 'flexio-jshelpers'
import {ActionPayload} from 'hotballoon'

export class PayloadTransaction extends ActionPayload {
  /**
   *
   * @param {boolean} isActive
   */
  constructor(isActive = false) {
    super()
    assert(isBoolean(isActive), 'PayloadTransaction:constructor: `isActive` argument should be a boolean')
    this.isActive = isActive
  }
}
