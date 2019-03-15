import {ActionBuilder, ActionParams} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionNumberInput}
 */
const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionResultInput

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
