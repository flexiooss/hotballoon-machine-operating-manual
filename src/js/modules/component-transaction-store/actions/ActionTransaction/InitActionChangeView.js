import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

const ActionTransaction = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.actions.ActionTransaction

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionTransaction>}
 */
export const initActionTransaction = (dispatcher) => {
  return ActionBuilder.build(
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
      dispatcher
    )
  )
}
