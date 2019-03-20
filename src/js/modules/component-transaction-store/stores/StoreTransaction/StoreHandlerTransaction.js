import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerTransaction extends PublicStoreHandler {
  /**
   *
   * @returns {boolean}
   */
  get isActive() {
    return this.state().data.registered().length !== 0
  }

  isRegistered(ticket) {
    console.log('TUviens la ' + ticket)
    return this.state().data.registered().indexOf(ticket) !== -1
  }
}
