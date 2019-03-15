import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {ActionTransaction} from './ActionTransaction'

/**
 *
 * @param {DocComponent} component
 * @returns {!Action<ActionTransaction>}
 */
export const initActionTransaction = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionTransaction,
      (payload) => {
        assert(
          payload instanceof ActionTransaction,
          'ActionTransaction:validate: `payload` argument should be an instance of ActionTransaction'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
