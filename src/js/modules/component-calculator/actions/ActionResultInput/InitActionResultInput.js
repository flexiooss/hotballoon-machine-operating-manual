import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionNumberInput}
 */
const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionResultInput

/**
 *
 * @param {Dispatcher} dispatcher
 * @return {Action.<ActionResultInput>}
 */
export const initActionResultInput = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionResultInput,
        /**
         *
         * @param {ActionResultInput} data
         * @return {ActionResultInput}
         */
        (data) => {
          if (isNull(data.operator())) {
            return data.withOperator('')
          }
          return data
        },
        /**
         *
         * @param {ActionResultInput} payload
         * @return {boolean}
         */
        (payload) => {
          return !isNull(payload.operator())
        }
      ),
      dispatcher
    )
  )
}
