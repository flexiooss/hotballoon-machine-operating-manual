import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {ActionChangeRoute} from './ActionChangeRoute'

/**
 *
 * @param {RouterComponent} component
 * @returns {!Action<ActionChangeRoute>}
 */
export const initActionChangeRoute = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionChangeRoute,
      (payload) => {
        assert(
          payload instanceof ActionChangeRoute,
          'ActionChangeRoute:validate: `payload` argument should be an instance of ActionChangeRoute'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
