import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {ActionModifyCounter} from './ActionModifyCounter'

/**
 *
 * @param component
 * @returns {!Action<ActionModifyCounter>}
 */
export const initActionModifyCounter = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionModifyCounter,
      (payload) => {
        assert(
          payload instanceof ActionModifyCounter,
          'ActionModifyCounter:validate: `payload` argument should be an instance of ActionModifyCounter'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
