import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

const ActionNumberInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionNumberInput

/**
 *
 * @param {Dispatcher} dispatcher
 * @return {Action.<ActionNumberInput>}
 */
export const initActionNumberInput = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionNumberInput,
        /**
         *
         * @param {ActionNumberInput} data
         * @return {ActionNumberInput}
         */
        (data) => {
          if (isNull(data.number())) {
            return data.withNumber('')
          }
          return data
        },
        /**
         *
         * @param {ActionNumberInput} payload
         * @return {boolean}
         */
        (payload) => {
          return !isNull(payload.number())
        }
      ),
      dispatcher
    )
  )
}
