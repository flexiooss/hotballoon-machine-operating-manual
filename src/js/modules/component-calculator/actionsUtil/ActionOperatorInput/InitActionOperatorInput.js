import {ActionBuilder, ActionParams} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionOperatorInput}
 */
const ActionOperatorInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionOperatorInput

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
