import {DocComponent} from '../../DocComponent'
import {ComponentContext} from 'hotballoon'

export class InitDocComponent {
  constructor(payload, APP, parentNode) {
    console.log(payload.message)

    DocComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode
    ).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode) {
    return new this(payload, APP, parentNode)
  }
}
