import {assertType, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import {ComponentTransaction} from './ComponentTransaction'
import '../generated/io/package'

const __component = Symbol('__componentMainPublic')
const ActionTransaction = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.actions.ActionTransaction

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
   * @returns {ComponentTransactionPublic}
   */
  mountView() {
    this[__component].mountView()
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