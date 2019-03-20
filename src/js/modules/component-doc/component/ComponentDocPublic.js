import {assertType} from 'flexio-jshelpers'
import {ComponentDoc} from './ComponentDoc'

const __component = Symbol('__componentMainPublic')

export class ComponentDocPublic {
  constructor(component) {
    assertType(component instanceof ComponentDoc, 'ComponentDocPublic:constructor: `component` should be a ComponentDoc')
    /**
     * @private
     * @property {ComponentDoc} ComponentDocPublic.__component
     */
    this[__component] = component
  }

  initAndMount() {
    this[__component]
      .setEventLoop()
      .mountView()
    return this
  }

  dispatchActionInitialize() {
    this[__component].dispatchActionInitialize()
  }
}
