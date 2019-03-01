import {DataStoreInterface} from 'hotballoon'

export const NAVBAR_STORE = 'NAVBAR_STORE'

/**
 * @extends DataStoreInterface
 */
export class StoreDataNavbar extends DataStoreInterface {
  /**
   *
   * @param {SchemaLink[]} linkCollection
   * @param {int} selected
   */
  constructor(linkCollection = null, selected = 0) {
    super()
    this.linkCollection = linkCollection
    this.selected = selected
  }
}
