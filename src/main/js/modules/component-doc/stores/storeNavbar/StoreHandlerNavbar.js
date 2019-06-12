import {PublicStoreHandler} from '@flexio-oss/hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerNavbar extends PublicStoreHandler {
  /**
   *
   * @return {int}
   */
  selected(id) {
    return this.data().selected === id
  }

  /**
   *
   * @return {int}
   */
  get size() {
    return this.data().linkCollection.length
  }

  /**
   *
   * @return {URL}
   */
  url(id) {
    return this.data().linkCollection[id]
  }
}
