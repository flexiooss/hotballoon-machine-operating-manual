import {assertType} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ComponentTransaction} from './ComponentTransaction'

const __component = Symbol('__componentMainPublic')
const ActionTransaction = globalFlexioImport.io.flexio.component_transaction_store.actions.ActionTransaction

export class ComponentTransactionPublic {
  constructor(component) {
    assertType(component instanceof ComponentTransaction, 'ComponentCounterPublic:constructor: `component` should be a ComponentBootstrap')
    /**
     * @private
     * @property {ComponentTransaction} ComponentTransactionPublic.__component
     */
    this[__component] = component
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {ComponentTransactionPublic}
   */
  mountView(parentNode) {
    this[__component].mountView(parentNode)
    return this
  }

  /**
   *
   * @returns {TransactionActionDispatcher}
   */
  transactionActionDispatcher() {
    return new TransactionActionDispatcher(this[__component].actionTransaction, ActionTransaction)
  }
}

class TransactionActionDispatcher {
  constructor(action, actionObject) {
    this.__action = action
    this.__actionObject = actionObject
  }

  /**
   *
   * @param {String} ticket
   * @param {boolean} isActive
   */
  actionTansaction(ticket, isActive) {
    this.__action.dispatch(new this.__actionObject(ticket, isActive))
  }
}
