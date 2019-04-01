import {Operator} from './Operator'

export class OperatorMoins extends Operator {
  constructor() {
    super('-')
  }
  operation(a, b) {
    return a - b
  }
}
