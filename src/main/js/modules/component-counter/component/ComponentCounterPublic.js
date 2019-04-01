import {assertType} from 'flexio-jshelpers'
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
   * @returns {ComponentCounterPublic}
   */
  mountView() {
    this[__component].mountView()
    return this
  }

  /**
   *
   * @returns {ComponentCounterPublic}
   */
  delete() {
    this[__component].unmountView()
    this[__component].componentContext.APP().removeComponentContext(this[__component].componentContext.ID)
    return this
  }
}
