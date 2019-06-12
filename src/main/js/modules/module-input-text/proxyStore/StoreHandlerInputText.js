import {PublicStoreHandler} from '@flexio-oss/hotballoon'

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
