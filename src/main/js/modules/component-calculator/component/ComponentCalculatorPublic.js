import {assertType} from '@flexio-oss/assert'
import {ComponentCalculator} from './ComponentCalculator'

const __component = Symbol('__componentBootstrapPublic')

export class ComponentCalculatorPublic {
  /**
   *
   * @param {ComponentCalculator} component
   */
  constructor(component) {
    assertType(component instanceof ComponentCalculator,
      'ComponentCalculatorPublic:constructor: `component` should be a ComponentCalculator'
    )
    /**
     * @private
     * @property {ComponentCalculator} ComponentCalculatorPublic.__component
     */
    this[__component] = component
  }

  /**
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
