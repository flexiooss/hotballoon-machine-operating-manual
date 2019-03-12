import {ActionBuilder, ActionParams} from 'hotballoon'
import {ActionResultInput} from './ActionResultInput'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {ComponentCalculator} component
 * @return {Action.<ActionResultInput>}
 */
export const initActionResultInput = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionResultInput,
      (payload) => {
        assert(
          payload instanceof ActionResultInput,
          'ActionResultInput:validate: `payload` argument should be an instance of ActionResultInput'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
