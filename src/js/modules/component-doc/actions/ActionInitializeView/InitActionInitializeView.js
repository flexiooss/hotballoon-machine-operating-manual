import {ActionBuilder, ActionParams} from 'hotballoon'
import {ActionInitializeView} from './ActionInitializeView'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {DocComponent} component
 * @returns {!Action<ActionInitializeView>}
 */
export const initActionInitializeView = (component) => {
  /**
   *
   * @type {!Action<ActionInitializeView>}
   */
  return ActionBuilder.build(
    new ActionParams(
      ActionInitializeView,
      (payload) => {
        assert(
          payload instanceof ActionInitializeView,
          'ActionInitializeView:validate: `payload` argument should be an instance of ActionInitializeView'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
