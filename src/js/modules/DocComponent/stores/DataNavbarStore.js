import {DataStoreInterface} from 'hotballoon'

export const NAVBAR_STORE = 'NAVBAR_STORE'

/**
 * @extends DataStoreInterface
 */
export class DataNavbarStore extends DataStoreInterface {
  /**
   *
   * @param {Link[]} linkCollection
   * @param {int} selected
   */
  constructor(linkCollection = null, selected = 0) {
    super()
    this.linkCollection = linkCollection
    this.selected = selected
  }
}
