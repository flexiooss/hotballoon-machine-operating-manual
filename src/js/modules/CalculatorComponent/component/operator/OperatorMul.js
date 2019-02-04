import {Operator} from './Operator'

export class OperatorMul extends Operator {
  constructor() {
    super('*')
  }
  operation(a, b) {
    return a * b
  }
}
