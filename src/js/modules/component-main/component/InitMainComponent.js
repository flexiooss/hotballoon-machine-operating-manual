import {MainComponent} from './MainComponent'

export class InitMainComponent {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   */
  constructor(APP, parentNode, executor) {
    this.__docComponent = MainComponent.create(
      APP.addComponentContext(),
      parentNode,
      executor
    )
  }

  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {ExecutorInterface} executor
   * @return {InitMainComponent}
   * @constructor
   * @static
   */
  static create(APP, parentNode, executor) {
    return new this(APP, parentNode, executor)
  }

  dispatchActionInitialize(message) {
    this.__docComponent.dispatchActionInitialize(message)
  }
}
