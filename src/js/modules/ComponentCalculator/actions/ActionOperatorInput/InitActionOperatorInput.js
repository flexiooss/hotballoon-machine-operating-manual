import {ActionOperatorInput} from './ActionOperatorInput'
import {ActionBuilder, ActionParams} from 'hotballoon'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {ComponentCalculator} component
 * @return {Action.<ActionOperatorInput>}
 */
export const initActionOperatorInput = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionOperatorInput,
      (payload) => {
        assert(
          payload instanceof ActionOperatorInput,
          'ActionOperatorInput:validate: `payload` argument should be an instance of ActionOperatorInput'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
