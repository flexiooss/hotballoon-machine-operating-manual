import {DataStoreInterface} from 'hotballoon'
import {OperatorNull} from '../component/operator/OperatorNull'

export const RESULT_STORE = 'RESULT_STORE'

/**
 * @extends DataStoreInterface
 */
export class DataResultStore extends DataStoreInterface {
  /**
   *
   * @param {string} lexp
   * @param {Operator} operator
   * @param {string} rexp
   */
  constructor(lexp = '', operator = OperatorNull, rexp = '') {
    super()
    this.lexp = lexp
    this.operator = operator
    this.rexp = rexp
  }
}
