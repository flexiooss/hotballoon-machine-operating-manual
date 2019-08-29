import {assertType} from '@flexio-oss/assert'
import {ComponentCounter} from './ComponentCounter'

const __component = Symbol('__componentMainPublic')

export class ComponentCounterPublic {
  /**
   *
   * @param {ComponentCounter} component
   */
  constructor(component) {
    assertType(component instanceof ComponentCounter,
      'ComponentCounterPublic:constructor: `component` should be a ComponentCounter'
    )
    /**
     * @private
     * @property {ComponentDoc} ComponentCounterPublic.__component
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
    return this
  }
}
