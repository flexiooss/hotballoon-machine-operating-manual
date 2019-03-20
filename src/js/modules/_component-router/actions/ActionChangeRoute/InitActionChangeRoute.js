import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {isNull} from 'flexio-jshelpers'
import {ActionChangeRoute} from './ActionChangeRoute'

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionChangeRoute>}
 */
export const initActionChangeRoute = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionChangeRoute,
        /**
         *
         * @param {ActionChangeRoute} data
         * @return {ActionChangeRoute}
         */
        (data) => {
          return data
        },
        /**
         *
         * @param {ActionChangeRoute} payload
         * @return {boolean}
         */
        (payload) => {
          return !isNull(payload.url)
        }
      ),
      dispatcher
    )
  )
}
