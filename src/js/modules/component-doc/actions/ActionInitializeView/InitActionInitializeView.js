import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {ActionInitializeView} from './ActionInitializeView'
import {isNull} from 'flexio-jshelpers'

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionInitializeView>}
 */
export const initActionInitializeView = (dispatcher) => {
  /**
   *
   * @type {!Action<ActionInitializeView>}
   */
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionInitializeView,
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
          return !isNull(payload.message)
        }
      ),
      dispatcher
    )
  )
}
