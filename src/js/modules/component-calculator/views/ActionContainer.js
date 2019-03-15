import {TypeCheck} from 'hotballoon'

/**
 */
export class ActionContainer {
  /**
   *
   * @param {Action.<ActionNumberInput>} actionNumberInput
   * @param {Action.<ActionOperatorInput>} actionOperatorInput
   * @param {Action.<ActionResultInput>} actionResultInput
   */
  constructor(actionNumberInput, actionOperatorInput, actionResultInput) {
    this.__actionNumberInput = TypeCheck.assertIsAction(actionNumberInput)
    this.__actionOperatorInput = TypeCheck.assertIsAction(actionOperatorInput)
    this.__actionResultInput = TypeCheck.assertIsAction(actionResultInput)
  }

  /**
   *
   * @return {Action.<ActionNumberInput>}
   */
  get actionNumberInput() {
    return this.__actionNumberInput
  }

  /**
   *
   * @return {Action.<ActionOperatorInput>}
   */
  get actionOperatorInput() {
    return this.__actionOperatorInput
  }

  /**
   *
   * @return {Action.<ActionResultInput>}
   */
  get actionResultInput() {
    return this.__actionResultInput
  }
}
