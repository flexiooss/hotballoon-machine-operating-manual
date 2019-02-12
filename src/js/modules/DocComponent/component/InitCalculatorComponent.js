import {CalculatorComponent} from '../../CalculatorComponent'
import {ComponentContext} from 'hotballoon'

export class InitCalculatorComponent {
  constructor(payload, APP, parentNode) {
    CalculatorComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode
    ).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param mode
   * @return {InitCalculatorComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, mode) {
    return new this(payload, APP, parentNode)
  }
}
