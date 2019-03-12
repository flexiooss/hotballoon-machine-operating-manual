import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerInputText extends PublicStoreHandler {
  /**
   *
   * @returns {string}
   */
  get text() {
    return this.data().text
  }
}
