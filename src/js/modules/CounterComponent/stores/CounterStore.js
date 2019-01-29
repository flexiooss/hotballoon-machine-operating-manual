import {DataStoreInterface} from 'hotballoon'

export const COUNT_STORE = 'COUNT_STORE'

/**
 * @extends DataStoreInterface
 * @implements DataStoreInterface
 */
export class CounterStore extends DataStoreInterface {
  /**
   *
   * @return {{count: int}}
   */
  constructor(count = 0) {
    super()
    this.count = count
  }
}
