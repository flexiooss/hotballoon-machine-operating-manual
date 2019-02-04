import {CalculatorComponent} from '../../CalculatorComponent'

export class InitCalculatorComponent {
  constructor(payload, APP, parentNode, mode) {
    console.log(payload.message)
    const CALCULATOR_COMPONENT_ID = APP.addComponent(
      CalculatorComponent.create(
        APP, parentNode, mode)
    )

    APP.Component(CALCULATOR_COMPONENT_ID).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotballoonApplication} APP
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
