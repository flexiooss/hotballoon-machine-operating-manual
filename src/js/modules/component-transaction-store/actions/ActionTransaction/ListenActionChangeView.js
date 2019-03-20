import {assertType} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {StoreTransactionRegisteredList} from '../../generated/io/flexio/component_transaction_store/stores/storetransaction/StoreTransactionRegisteredList'

export class ListenActionTransactionParams {
  constructor(actionTransaction, transactionStore, transactionStoreHandler) {
    assertType(TypeCheck.isAction(actionTransaction),
      'ComponentTransactionStore:ListenActionTransactionParams: actionTransaction should be an Action'
    )
    assertType(TypeCheck.isStore(transactionStore),
      'ComponentTransactionStore:ListenActionTransactionParams: actionTransaction should be a Store'
    )
    this.actionTransaction = actionTransaction
    this.transactionStore = transactionStore
    this.transactionStoreHandler = transactionStoreHandler
  }
}

/**
 *
 * @param {ListenActionTransactionParams} params
 */
export const listenActionTransaction = (params) => {
  assertType(params instanceof ListenActionTransactionParams,
    'ComponentTransactionStore:listenActionTransaction: `params` should be ListenActionTransactionParams'
  )

  params.actionTransaction
    .listenWithCallback(
      /**
       *
       * @param {ActionTransaction} payload
       */
      (payload) => {
        let registered = new StoreTransactionRegisteredList(...params.transactionStore.state().data.registered())
        if (payload.active()) {
          if (!params.transactionStoreHandler.isRegistered(payload.ticket())) {
            registered.push(payload.ticket())
            params.transactionStore.set(
              params.transactionStore.state().data.withRegistered(registered)
            )
          }
        } else {
          if (params.transactionStoreHandler.isRegistered(payload.ticket())) {
            registered = registered.filter(ticket => ticket !== payload.ticket())
            params.transactionStore.set(
              params.transactionStore.state().data.withRegistered(registered)
            )
          }
        }

        console.log(registered)
        console.log(payload)
        console.log('ICICICICICICICI')
      }
    )
}
