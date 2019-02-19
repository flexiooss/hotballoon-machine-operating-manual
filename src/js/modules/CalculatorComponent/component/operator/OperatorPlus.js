import {Operator} from './Operator'

export class OperatorPlus extends Operator {
  constructor() {
    super('+')
  }
  operation(a, b) {
    return a + b
  }
}
