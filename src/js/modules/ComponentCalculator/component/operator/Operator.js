// import {CoreException} from 'hotballoon'

/**
 * @interface
 */
export class Operator {
  constructor(symbol = '') {
    this.symbol = symbol
  }

  /**
   * views method
   * @return {Node}
   */
  operation(a, b) {
  }
}
