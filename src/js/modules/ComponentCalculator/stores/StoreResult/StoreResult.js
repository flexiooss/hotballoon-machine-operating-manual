import {OperatorNull} from '../../component/operator/OperatorNull'

export class StoreResult {
  /**
   *
   * @param {string} lexp
   * @param {Operator} operator
   * @param {string} rexp
   */
  constructor(lexp = '', operator = new OperatorNull(), rexp = '') {
    this.lexp = lexp
    this.operator = operator
    this.rexp = rexp
  }
}
