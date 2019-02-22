import {CalculatorComponent} from '../../CalculatorComponent'
import {ComponentContext} from 'hotballoon'

export class InitCalculatorComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   */
  constructor(payload, APP, parentNode, executor) {
    CalculatorComponent.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      executor
    ).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @return {InitCalculatorComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, executor) {
    return new this(payload, APP, parentNode, executor)
  }
}
