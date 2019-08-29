import {assertType} from '@flexio-oss/assert'
import {ComponentDoc} from './ComponentDoc'

const __component = Symbol('__componentMainPublic')

export class ComponentDocPublic {
  /**
   *
   * @param {ComponentDoc} component
   */
  constructor(component) {
    assertType(component instanceof ComponentDoc, 'ComponentDocPublic:constructor: `component` should be a ComponentDoc')
    /**
     * @private
     * @property {ComponentDoc} ComponentDocPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {this}
   */
  mountView(parentNode) {
    this[__component].mountView(parentNode)
    return this
  }

  /**
   *
   * @returns {this}
   */
  delete() {
    this[__component].unmountView()
    this[__component].componentContext.APP().removeComponentContext(this[__component].componentContext.ID)
    return this
  }

  /**
   *
   * @param {String} component
   * @param {String} mode
   * @returns {this}
   */
  dispatchActionInitialize(component, mode) {
    this[__component].dispatchActionInitialize(component, mode)
    return this
  }
}
