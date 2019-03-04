import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerCounter extends PublicStoreHandler {
  /**
   *
   * @return {String}
   */
  get color() {
    return (this.data().count % 2 === 0 ? 'green' : 'red')
  }

  get count() {
    return this.data().count
  }
}