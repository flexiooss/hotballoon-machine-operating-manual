import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {ActionInitialize} from './ActionInitialize'

/**
 *
 * @param {MainComponent} component
 * @returns {!Action<ActionInitialize>}
 */
export const initActionInitialize = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionInitialize,
      (payload) => {
        assert(
          payload instanceof ActionInitialize,
          'ActionInitialize:validate: `payload` argument should be an instance of ActionInitialize'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
