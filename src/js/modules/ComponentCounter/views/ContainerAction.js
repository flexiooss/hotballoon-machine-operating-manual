import {TypeCheck} from 'hotballoon'

/**
 */
export class ContainerAction {
  /**
   *
   * @param {Action.<ActionModifyCounter>} counterIncrementAction
   */
  constructor(counterIncrementAction) {
    this.__counterIncrementAction = TypeCheck.assertIsAction(counterIncrementAction)
  }

  /**
   *
   * @return {Action.<ActionModifyCounter>}
   */
  get counterIncrementAction() {
    return this.__counterIncrementAction
  }
}
