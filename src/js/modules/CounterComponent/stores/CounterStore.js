import {DataStoreInterface} from 'hotballoon'

export const COUNT_STORE = 'COUNT_STORE'

/**
 * @extends DataStoreInterface
 */
export class CounterStore extends DataStoreInterface {
  /**
   *
   * @param {int} count
   */
  constructor(count = 0) {
    super()
    this.count = count
  }

  getColor() {
    return (this.count % 2 === 0 ? 'green' : 'red')
  }
}
