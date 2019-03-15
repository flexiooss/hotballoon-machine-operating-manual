import {ComponentCounter} from './ComponentCounter'

export class InitCounterComponent {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {boolean} withSubView
   */
  constructor(payload, APP, parentNode, withSubView) {
    ComponentCounter.create(
      APP.addComponentContext(),
      parentNode,
      withSubView
    ).setEventLoop().mountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {string} withSubView
   * @return {InitCounterComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode, withSubView) {
    return new this(payload, APP, parentNode, withSubView)
  }
}
