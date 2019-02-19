import {DataStoreHandlerInterface} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {DataResultStore} from './DataResultStore'

/**
 * @extends DataStoreHandlerInterface
 * @implements DataStoreHandlerInterface
 */
export class ResultStoreHandler extends DataStoreHandlerInterface {
  /**
   *
   * @param {Store} data
   */
  constructor(data) {
    super()
    assert(data instanceof DataResultStore,
      'hotballoon:' + this.constructor.name + ':constructor: `data` argument should be an instance of `DataNavbarStore`')
    this.__data = data
  }

  /**
   *
   * @returns {string}
   */
  display() {
    return this.__data.lexp + ' ' + this.__data.operator.symbol + ' ' + this.__data.rexp
  }

  data() {
    return this.__data
  }
}
