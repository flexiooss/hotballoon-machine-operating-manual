import {TypeCheck} from 'hotballoon'

export class ActionContainer {
  /**
   *
   * @param {Action.<ActionTransaction>} actionTransaction
   */
  constructor(actionTransaction) {
    this.__actionTransaction = TypeCheck.assertIsAction(actionTransaction)
  }

  /**
   *
   * @return {Action.<ActionTransaction>}
   */
  get actionTransaction() {
    return this.__actionTransaction
  }
}
