import {ActionBuilder, ActionParams} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionNumberInput}
 */
const ActionNumberInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionNumberInput

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
