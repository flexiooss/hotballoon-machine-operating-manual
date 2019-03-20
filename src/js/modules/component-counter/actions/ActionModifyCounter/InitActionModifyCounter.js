import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionModifyCounter}
 */
const ActionModifyCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.actions.ActionModifyCounter

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionModifyCounter>}
 */
export const initActionModifyCounter = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionModifyCounter,
        /**
         *
         * @param {ActionModifyCounter} data
         * @return {ActionModifyCounter}
         */
        (data) => {
          if (isNull(data.sum())) {
            return data.withSum(0)
          }
          return data
        },
        /**
         *
         * @param {ActionModifyCounter} payload
         * @return {boolean}
         */
        (payload) => {
          return !isNull(payload.sum())
        }
      ),
      dispatcher
    )
  )
}
