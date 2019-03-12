import {OperatorFactory} from '../operator/OperatorFactory'

export class OpertorJob {
  constructor(data) {
    this._dataLex = data.lexp
    this._dataRex = data.rexp
    this._dataOp = OperatorFactory.create(data.operator)
  }

  exec() {
    setTimeout(function() {
      // do what you need here
    }, 5000)
    return this._dataOp.operation(Number(this._dataLex), Number(this._dataRex))
  }
}
