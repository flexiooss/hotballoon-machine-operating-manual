import {assert, isBoolean} from 'flexio-jshelpers'

export class ActionTransaction {
  /**
   *
   * @param {boolean} isActive
   */
  constructor(isActive = false) {
    assert(isBoolean(isActive), 'PayloadTransaction:constructor: `isActive` argument should be a boolean')
    this.isActive = isActive
  }
}
