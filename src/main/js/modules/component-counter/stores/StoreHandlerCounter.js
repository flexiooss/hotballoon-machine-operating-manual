import {PublicStoreHandler} from '@flexio-oss/hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerCounter extends PublicStoreHandler {
  /**
   *
   * @return {String}
   */
  get color() {
    return (this.state().data.count() % 2 === 0 ? '#4EE695' : '#EB4876')
  }

  get count() {
    return this.state().data.count()
  }
}
