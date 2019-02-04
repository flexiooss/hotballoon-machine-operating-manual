import {DataStoreInterface} from 'hotballoon'

export const RESULT_STORE = 'RESULT_STORE'

/**
 * @extends DataStoreInterface
 * @implements DataStoreInterface
 */
export class ResultStore extends DataStoreInterface {
  /**
   *
   * @return {{lexp: string}}
   */
  constructor(lexp = '', operator = '', rexp = '') {
    super()
    this.lexp = lexp
    this.operator = operator
    this.rexp = rexp
  }

  display() {
    return this.lexp + ' ' + this.operator.symbol + ' ' + this.rexp
  }
}
