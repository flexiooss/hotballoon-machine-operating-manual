import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionBuilder, ActionParams, ActionTypeParam, TypeCheck} from '@flexio-oss/hotballoon'
import {StoreTransactionRegisteredList} from '../../generated/io/flexio/component_transaction_store/stores/storetransaction/StoreTransactionRegisteredList'

const ActionTransaction = globalFlexioImport.io.flexio.component_transaction_store.actions.ActionTransaction

export class ActionTransactionUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Store} store
   * @param {PublicStoreHandler} publicStore
   */
  constructor(dispatcher, store, publicStore) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionTransactionUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionTransactionUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isPublicStoreHandler(publicStore),
      'ActionTransactionUtils:constructor: `publicStore` should be a PublicStoreHandler'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__store = store
    this.__publicStore = publicStore
  }

  /**
   *
   * @returns {ActionModifyCounterUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionTransaction,
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
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionModifyCounterUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionTransactionUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionTransaction} payload
       */
      (payload) => {
        console.log(payload)
        let registered = new StoreTransactionRegisteredList(...this.__store.state().data.registered())
        if (payload.active()) {
          if (!this.__publicStore.isRegistered(payload.ticket())) {
            registered.push(payload.ticket())
            this.__store.set(
              this.__store.state().data.withRegistered(registered)
            )
          }
        } else {
          if (this.__publicStore.isRegistered(payload.ticket())) {
            let newRegistered = new StoreTransactionRegisteredList()
            registered.forEach(function(ticket) {
              if (ticket !== payload.ticket()) {
                newRegistered.push(ticket)
              }
            })
            console.log(newRegistered)
            this.__store.set(
              this.__store.state().data.withRegistered(newRegistered)
            )
          }
        }
      }
    )
    return this
  }

  /**
   *
   * @returns {Action<ActionModifyCounter>}
   */
  action() {
    return this.__action
  }
}
