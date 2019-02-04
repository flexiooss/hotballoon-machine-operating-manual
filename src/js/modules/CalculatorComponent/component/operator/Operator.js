import {CoreException} from 'hotballoon'

export class Operator {
  constructor(symbol = '') {
    this.symbol = symbol
  }

  /**
   * Main method
   * @return {Node}
   */
  operation(a, b) {
    throw new CoreException('view should be override', 'METHOD_NOT_OVERRIDE')
  }
}
