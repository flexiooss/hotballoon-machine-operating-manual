import {OperatorPlus} from './OperatorPlus'
import {OperatorMoins} from './OperatorMoins'
import {OperatorMul} from './OperatorMul'
import {OperatorDiv} from './OperatorDiv'

export class OperatorFactory {
  /**
   *
   * @param {string} typeOperation
   * @return {Operator}
   */
  static create(typeOperation) {
    switch (typeOperation) {
      case '+' :
        return new OperatorPlus()
      case '-' :
        return new OperatorMoins()
      case '*' :
        return new OperatorMul()
      case '/' :
        return new OperatorDiv()
    }
  }
}
