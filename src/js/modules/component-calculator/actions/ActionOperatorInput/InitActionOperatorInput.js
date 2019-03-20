import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionOperatorInput}
 */
const ActionOperatorInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionOperatorInput

/**
 *
 * @param {Dispatcher} dispatcher
 * @return {Action.<ActionOperatorInput>}
 */
export const initActionOperatorInput = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionOperatorInput,
        /**
         *
         * @param {ActionOperatorInput} data
         * @return {ActionOperatorInput}
         */
        (data) => {
          if (isNull(data.operator())) {
            return data.withOperator('')
          }
          return data
        },
        /**
         *
         * @param {ActionOperatorInput} payload
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
