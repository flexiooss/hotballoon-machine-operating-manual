import {CounterComponent} from '../../CounterComponent'

export class InitCounterComponent {
  constructor(payload, APP, parentNode, mode) {
    console.log(payload.message)
    const COUNTER_COMPONENT_ID = APP.addComponent(
      CounterComponent.create(
        APP, parentNode, mode)
    )

    APP.Component(COUNTER_COMPONENT_ID).createRenderMountView()
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
