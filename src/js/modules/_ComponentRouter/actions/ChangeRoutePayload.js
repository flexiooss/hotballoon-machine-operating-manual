import {ActionPayload} from 'hotballoon'

/**
 * @extends ActionPayload
 */
export class ChangeRoutePayload extends ActionPayload {
  /**
   *
   * @param {URL} url
   */
  constructor(url = null) {
    super()
    this.url = url
  }
}
