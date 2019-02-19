import {ActionPayload} from 'hotballoon'
import {PathName} from 'flexio-jsrouter/src/URL/PathName'

/**
 * @extends ActionPayload
 */
export class ChangeComponentPayload extends ActionPayload {
  /**
   *
   * @param {PathName} link
   */
  constructor(link = new PathName('')) {
    super()
    this.link = link
  }
}
