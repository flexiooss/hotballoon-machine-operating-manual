import {DataStoreHandlerInterface} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {DataCounterStore} from './DataCounterStore'

/**
 * @extends DataStoreHandlerInterface
 * @implements DataStoreHandlerInterface
 */
export class CounterStoreHandler extends DataStoreHandlerInterface {
  /**
   *
   * @param {DataCounterStore} data
   */
  constructor(data) {
    super()
    assert(data instanceof DataCounterStore,
      'hotballoon:' + this.constructor.name + ':constructor: `data` argument should be an instance of `DataNavbarStore`')
    this.__data = data
  }

  /**
   *
   * @return {String}
   */
  get color() {
    return (this.count % 2 === 0 ? 'green' : 'red')
  }

  get count() {
    return this.__data.count
  }

  data() {
    return this.__data
  }
}
