import {ActionBuilder, ActionParams, ActionTypeParam} from 'hotballoon'
import {ActionChangeView} from './ActionChangeView'

/**
 *
 * @param {Dispatcher} dispatcher
 * @returns {!Action<ActionChangeView>}
 */
export const initActionChangeView = (dispatcher) => {
  return ActionBuilder.build(
    new ActionParams(
      new ActionTypeParam(
        ActionChangeView,
        /**
         *
         * @param {ActionChangeView} data
         * @return {ActionChangeView}
         */
        (data) => {
          return data
        },
        /**
         *
         * @param {ActionChangeView} payload
         * @return {boolean}
         */
        (payload) => {
          return true
        }
      ),
      dispatcher
    )
  )
}
