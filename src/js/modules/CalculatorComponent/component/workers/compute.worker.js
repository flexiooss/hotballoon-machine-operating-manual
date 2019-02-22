'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import {OpertorJob} from './OperatorExecutor'

self.onmessage = (e) => {
  console.log('%c Pipelines Worker', 'color: red; font-size:20px')
  console.log(e.data)
  postMessage(new OpertorJob(e.data).exec())
}
