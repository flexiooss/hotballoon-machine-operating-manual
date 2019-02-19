import {DataStoreInterface} from 'hotballoon'

export const COUNT_STORE = 'COUNT_STORE'

/**
 * @extends DataStoreInterface
 */
export class DataCounterStore extends DataStoreInterface {
  /**
   *
   * @param {int} count
   */
  constructor(count = 0) {
    super()
    this.count = count
  }
}
