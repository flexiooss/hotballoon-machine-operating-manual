import {CounterComponent} from '../../CounterComponent'
import {ComponentContext} from 'hotballoon'

export class InitCounterComponent {
  constructor(payload, APP, parentNode, mode) {
    console.log(payload.message)

    CounterComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      mode
    ).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param mode
   * @return {InitCounterComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, mode) {
    return new this(payload, APP, parentNode, mode)
  }
}
