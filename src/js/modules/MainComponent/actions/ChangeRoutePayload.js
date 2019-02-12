import {ActionPayload} from 'hotballoon'

export class ChangeRoutePayload extends ActionPayload {
  /**
   *
   * @param route
   * @param option
   * @param component
   */
  constructor(route = '', option = '', component = null) {
    super()
    this.route = route
    this.option = option
  }
}
