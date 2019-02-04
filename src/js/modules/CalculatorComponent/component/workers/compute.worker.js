'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import {OperatorPlus} from '../operator/OperatorPlus'
import {OperatorMoins} from '../operator/OperatorMoins'
import {OperatorMul} from '../operator/OperatorMul'
import {OperatorDiv} from '../operator/OperatorDiv'

self.onmessage = (e) => {
  console.log('%c Pipelines Worker', 'color: red; font-size:20px')
  console.log(e.data)

  var operator
  switch (e.data.operator) {
    case 'OperatorPlus' :
      operator = new OperatorPlus()
      break
    case 'OperatorMoins' :
      operator = new OperatorMoins()
      break
    case 'OperatorMul' :
      operator = new OperatorMul()
      break
    case 'OperatorDiv' :
      operator = new OperatorDiv()
      break
  }

  postMessage(operator.operation(Number(e.data.lexp), Number(e.data.rexp)))
}
