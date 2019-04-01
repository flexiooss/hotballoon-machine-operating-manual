import {assertType} from 'flexio-jshelpers'
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
   *
   * @returns {ComponentCalculatorPublic}
   */
  mountView() {
    this[__component].mountView()
    return this
  }

  /**
   *
   * @returns {ComponentCalculatorPublic}
   */
  delete() {
    this[__component].unmountView()
    this[__component].componentContext.APP().removeComponentContext(this[__component].componentContext.ID)
    return this
  }
}
