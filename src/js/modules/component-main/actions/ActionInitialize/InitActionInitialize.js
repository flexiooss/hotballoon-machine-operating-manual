import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

const ActionInitialize = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_main.actions.ActionInitialize

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionInitialize>}
 */
export const initActionInitialize = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionInitialize,
        /**
         *
         * @param {ActionInitialize} data
         * @return {ActionInitialize}
         */
        (data) => {
          if (isNull(data.message)) {
            return data.withMessage('Default message')
          }
          return data
        },
        /**
         *
         * @param {ActionInitialize} payload
         * @return {boolean}
         */
        (payload) => {
          return !isNull(payload.message())
        }
      ),
      dispatcher
    )
  )
}
