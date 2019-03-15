import {ActionBuilder, ActionParams} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, assert} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionModifyCounter}
 */
const ActionModifyCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCounter.ActionModifyCounter

/**
 *
 * @param component
 * @returns {!Action<ActionModifyCounter>}
 */
export const initActionModifyCounter = (component) => {
  return ActionBuilder.build(
    new ActionParams(
      ActionModifyCounter,
      (payload) => {
        assert(
          payload instanceof ActionModifyCounter,
          'ActionModifyCounter:validate: `payload` argument should be an instance of ActionModifyCounter'
        )
        return true
      },
      component.__componentContext.dispatcher()
    )
  )
}
