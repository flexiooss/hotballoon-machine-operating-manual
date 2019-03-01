import {ComponentContext} from 'hotballoon'
import {ComponentCalculator} from '../../CalculatorComponent'

export class InitCalculatorComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   */
  constructor(payload, APP, parentNode, executor, transactionAction) {
    ComponentCalculator.create(
      APP.addComponentContext(new ComponentContext(APP)),
      parentNode,
      executor,
      transactionAction
    ).setEventLoop().mountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {function} transactionAction
   * @return {InitCalculatorComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, executor, transactionAction) {
    return new this(payload, APP, parentNode, executor, transactionAction)
  }
}
