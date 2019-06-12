import {assertType} from '@flexio-oss/assert'
import {ComponentMain} from './ComponentMain'

const __component = Symbol('__componentMainPublic')

export class ComponentMainPublic {
  /**
   *
   * @param {ComponentMain} component
   */
  constructor(component) {
    assertType(component instanceof ComponentMain, 'ComponentCounterPublic:constructor: `component` should be a ComponentBootstrap')
    /**
     * @private
     * @property {ComponentMain} ComponentMainPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {String} message
   */
  dispatchActionInitialize(message) {
    this[__component].dispatchActionInitializeDoc(message)
  }
}
