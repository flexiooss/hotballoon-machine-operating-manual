import {DataStoreHandlerInterface} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {DataNavbarStore} from './DataNavbarStore'

/**
 * @extends DataStoreHandlerInterface
 * @implements DataStoreHandlerInterface
 */
export class NavbarStoreHandler extends DataStoreHandlerInterface {
  /**
   *
   * @param {DataNavbarStore} data
   */
  constructor(data) {
    super()
    assert(data instanceof DataNavbarStore,
      'hotballoon:' + this.constructor.name + ':constructor: `data` argument should be an instance of `DataNavbarStore`')
    this.__data = data
  }

  /**
   *
   * @return {int}
   */
  get selected() {
    return this.__data.selected
  }

  /**
   *
   * @return {int}
   */
  get size() {
    return this.__data.linkCollection.length
  }

  /**
   *
   * @return {URL}
   */
  url(id) {
    return this.__data.linkCollection[id]
  }

  data() {
    return this.__data
  }
}
