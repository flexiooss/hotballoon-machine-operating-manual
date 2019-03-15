import {ComponentCalculator} from './ComponentCalculator'

export class InitCalculatorComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(payload, APP, parentNode, executor, transactionActionDispatcher) {
    ComponentCalculator.create(
      APP.addComponentContext(),
      parentNode,
      executor,
      transactionActionDispatcher
    ).setEventLoop().mountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @return {InitCalculatorComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, executor, transactionActionDispatcher) {
    return new this(payload, APP, parentNode, executor, transactionActionDispatcher)
  }
}
