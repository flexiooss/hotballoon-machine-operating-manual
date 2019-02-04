import {Operator} from './Operator'

export class OperatorDiv extends Operator {
  constructor() {
    super('/')
  }
  operation(a, b) {
    return a / b
  }
}
