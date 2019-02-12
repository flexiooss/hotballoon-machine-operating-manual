import {ActionPayload} from 'hotballoon'

export class ChangeRouteDocPayload extends ActionPayload {
  /**
   *
   * @param component
   * @param option
   */
  constructor(component = '', option = '') {
    super()
    this.component = component
    this.option = option
  }
}
