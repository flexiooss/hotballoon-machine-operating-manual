import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class HandlerNavbarStore extends PublicStoreHandler {
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
