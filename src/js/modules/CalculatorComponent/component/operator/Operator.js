// import {CoreException} from 'hotballoon'

/**
 * @interface
 */
export class Operator {
  constructor(symbol = '') {
    this.symbol = symbol
  }

  /**
   * CounterView method
   * @return {Node}
   */
  operation(a, b) {
  }
}
