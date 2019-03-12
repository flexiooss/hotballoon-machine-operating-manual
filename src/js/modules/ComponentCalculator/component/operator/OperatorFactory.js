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
      case 'OperatorPlus' :
        return new OperatorPlus()
      case 'OperatorMoins' :
        return new OperatorMoins()
      case 'OperatorMul' :
        return new OperatorMul()
      case 'OperatorDiv' :
        return new OperatorDiv()
    }
  }
}
