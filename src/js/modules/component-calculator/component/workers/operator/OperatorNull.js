import {Operator} from './Operator'

export class OperatorNull extends Operator {
  constructor() {
    super('')
  }
  operation(a, b) {
    return null
  }
}
