import {ActionBuilder, ActionParams} from 'hotballoon'
import {ActionChangeView} from './ActionChangeView'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {DocComponent} component
 * @returns {!Action<ActionChangeView>}
 */
export const initActionChangeView = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionChangeView,
      (payload) => {
        assert(
          payload instanceof ActionChangeView,
          'ActionChangeView:validate: `payload` argument should be an instance of ActionChangeView'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
