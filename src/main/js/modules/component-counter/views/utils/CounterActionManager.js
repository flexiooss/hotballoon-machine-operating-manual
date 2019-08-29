import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

/**
 */
export class CounterActionManager {
  /**
   *
   * @param {ActionDispatcher<ActionModifyCounter>} actionModifyCounter
   */
  constructor(actionModifyCounter) {
    assertType(actionModifyCounter.isTypeOf(globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter),
      'CounterActionManager:constructor: `actionModifyCounter` should be an Action of ActionModifyCounter'
    )
    this.__actionModifyCounter = TypeCheck.assertIsActionDispatcher(actionModifyCounter)
  }

  /**
   *
   * @return {ActionDispatcher<ActionModifyCounter>}
   */
  actionModifyCounter() {
    return this.__actionModifyCounter
  }
}
