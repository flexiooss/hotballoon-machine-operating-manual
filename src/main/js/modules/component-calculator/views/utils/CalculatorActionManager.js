import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType} from '@flexio-oss/assert'

/**
 */
export class CalculatorActionManager {
  /**
   *
   * @param {ActionDispatcher<ActionNumberInput>} actionNumberInput
   * @param {ActionDispatcher<ActionOperatorInput>} actionOperatorInput
   * @param {ActionDispatcher<ActionResultInput>} actionResultInput
   */
  constructor(actionNumberInput, actionOperatorInput, actionResultInput) {
    assertType(actionNumberInput.isTypeOf(globalFlexioImport.io.flexio.component_calculator.actions.ActionNumberInput),
      'CalculatorActionManager:constructor: `actionNumberInputParam` should be an Action of ActionNumberInput'
    )
    this.__actionNumberInput = TypeCheck.assertIsActionDispatcher(actionNumberInput)

    assertType(actionOperatorInput.isTypeOf(globalFlexioImport.io.flexio.component_calculator.actions.ActionOperatorInput),
      'CalculatorActionManager:constructor: `actionOperatorInputParam` should be an Action of ActionOperatorInput'
    )
    this.__actionOperatorInput = TypeCheck.assertIsActionDispatcher(actionOperatorInput)

    assertType(actionResultInput.isTypeOf(globalFlexioImport.io.flexio.component_calculator.actions.ActionResultInput),
      'CalculatorActionManager:constructor: `actionResultInput` should be an Action of ActionResultInput'
    )
    this.__actionResultInput = TypeCheck.assertIsActionDispatcher(actionResultInput)
  }

  /**
   *
   * @return {ActionDispatcher<ActionNumberInput>}
   */
  actionNumberInput() {
    return this.__actionNumberInput
  }

  /**
   *
   * @return {ActionDispatcher<ActionOperatorInput>}
   */
  actionOperatorInput() {
    return this.__actionOperatorInput
  }

  /**
   *
   * @return {ActionDispatcher<ActionResultInput>}
   */
  actionResultInput() {
    return this.__actionResultInput
  }
}