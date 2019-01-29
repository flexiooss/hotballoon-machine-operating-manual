import {DocComponent} from '../../DocComponent'

export class InitDocComponent {
  constructor(payload, APP, parentNode) {
    console.log(payload.message)
    const DOC_COMPONENT_ID = APP.addComponent(
      DocComponent.create(
        APP, parentNode)
    )

    APP.Component(DOC_COMPONENT_ID).createRenderMountView()
  }

  /**
   *
   * @param {Object} payload
   * @param {HotballoonApplication} APP
   * @param {Node} parentNode
   * @return {InitDocComponent}
   * @constructor
   * @static
   */
  static create(payload, APP, parentNode) {
    return new this(payload, APP, parentNode)
  }
}
