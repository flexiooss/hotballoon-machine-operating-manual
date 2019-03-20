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

  initTransaction() {
    this[__component]
      .setEventLoop()
      .mountView()
    return this
  }

  transactionActionDispatcher() {
    return new TransactionActionDispatcher(this[__component].actionTransaction, ActionTransaction)
  }
}

class TransactionActionDispatcher {
  constructor(action, actionObject) {
    this.__action = action
    this.__actionObject = actionObject
  }

  actionTansaction(ticket, isActive) {
    this.__action.dispatch(new this.__actionObject(ticket, isActive))
  }
}
