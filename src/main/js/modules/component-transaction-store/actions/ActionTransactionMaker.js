import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck} from '@flexio-oss/hotballoon'
import {StoreTransactionRegisteredList} from '../generated/io/flexio/component_transaction_store/stores/storetransaction/StoreTransactionRegisteredList'

export class ActionTransactionMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionTransaction>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionTransactionMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionTransactionMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_transaction_store.actions.ActionTransaction,
          /**
           *
           * @param {ActionTransaction} data
           * @return {ActionTransaction}
           */
          (data) => {
            if (isNull(data.active()) || isNull(data.ticket())) {
              return data.withActive(false).withTicket('default ticket')
            }
            return data
          },
          /**
           *
           * @param {ActionTransaction} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.active()) && !isNull(payload.ticket())
          }
        ),
        dispatcher
      )
    )
    return new ActionTransactionMaker(action)
  }

  /**
   *
   * @param {Store<StoreTransaction>} storeTransaction
   * @returns {ActionTransactionMaker}
   */
  listen(storeTransaction) {
    assertType(TypeCheck.isStore(storeTransaction),
      'ActionTransactionMaker:listen: `store` should be a Store'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionTransaction} payload
       */
      (payload) => {
        let registered = new StoreTransactionRegisteredList(...storeTransaction.state().data.registered())
        if (payload.active()) {
          if (!storeTransaction.state().data.registered().includes((payload.ticket()))) {
            registered.push(payload.ticket())
            storeTransaction.set(
              storeTransaction.state().data.withRegistered(registered)
            )
          }
        } else {
          if (storeTransaction.state().data.registered().includes((payload.ticket()))) {
            let newRegistered = new StoreTransactionRegisteredList()
            registered.forEach(function(ticket) {
              if (ticket !== payload.ticket()) {
                newRegistered.push(ticket)
              }
            })
            storeTransaction.set(
              storeTransaction.state().data.withRegistered(newRegistered)
            )
          }
        }
      }
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionTransaction>}
   */
  action() {
    return this.__action
  }
}
