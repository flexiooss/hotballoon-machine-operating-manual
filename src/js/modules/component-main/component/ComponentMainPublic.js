import {assertType} from 'flexio-jshelpers'
import {ComponentMain} from './ComponentMain'

const __component = Symbol('__componentMainPublic')

export class ComponentMainPublic {
  constructor(component) {
    assertType(component instanceof ComponentMain, 'ComponentCounterPublic:constructor: `component` should be a ComponentBootstrap')
    /**
     * @private
     * @property {ComponentMain} ComponentMainPublic.__component
     */
    this[__component] = component
  }

  initDispatchActionInitialize(message) {
    this[__component].setEventLoop().dispatchActionInitializeDoc(message)
  }
}
