// import {CoreException} from '@flexio-oss/hotballoon'

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
