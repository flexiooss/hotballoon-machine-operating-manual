import {ComponentContext} from 'hotballoon'
import {RouterComponent} from '../../_ComponentRouter'

export class InitComponentRouter {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   */
  constructor(payload, APP) {
    RouterComponent.create(APP.addComponentContext(new ComponentContext(APP)))
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @return {InitComponentRouter}
   * @constructor
   * @static
   */
  static create(payload, APP) {
    return new this(payload, APP)
  }
}
