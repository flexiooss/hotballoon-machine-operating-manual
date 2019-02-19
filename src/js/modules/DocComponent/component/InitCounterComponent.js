import {CounterComponent} from '../../CounterComponent'
import {ComponentContext} from 'hotballoon'

export class InitCounterComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {string} mode
   */
  constructor(payload, APP, parentNode, mode) {
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
   * @param {CounterViewModeParameterObject} mode
   * @return {InitCounterComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, mode) {
    return new this(payload, APP, parentNode, mode)
  }
}
