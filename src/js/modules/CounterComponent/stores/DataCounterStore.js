import {DataStoreInterface} from 'hotballoon'


/**
 * @extends DataStoreInterface
 * @implements DataStoreInterface
 */
export class DataCounterStore extends DataStoreInterface {
  /**
   *
   * @return {{count: int}}
   */
  constructor(count = 0) {
    super()
    this.count = count
  }
}
