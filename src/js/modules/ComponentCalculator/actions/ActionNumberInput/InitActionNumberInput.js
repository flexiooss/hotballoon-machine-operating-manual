import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {ActionNumberInput} from './ActionNumberInput'

/**
 *
 * @param {ComponentCalculator} component
 * @return {Action.<ActionNumberInput>}
 */
export const initActionNumberInput = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionNumberInput,
      (payload) => {
        assert(
          payload instanceof ActionNumberInput,
          'ActionNumberInput:validate: `payload` argument should be an instance of ActionNumberInput'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
