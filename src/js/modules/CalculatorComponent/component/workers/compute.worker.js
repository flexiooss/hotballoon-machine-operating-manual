'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import {OperatorFactory} from '../operator/OperatorFactory'

self.onmessage = (e) => {
  console.log('%c Pipelines Worker', 'color: red; font-size:20px')
  console.log(e.data)

  let operator = OperatorFactory.create(e.data.operator)

  postMessage(operator.operation(Number(e.data.lexp), Number(e.data.rexp)))
}

// import opertorExecutor
//
// self.onmessage = (e) => {
//  TODO   postMessage( opertorExecutor.with(e.data).exec())
//
// }
