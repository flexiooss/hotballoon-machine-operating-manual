'use strict'
/* global self:false, onmessage:false, postMessage:false, Request:false, URL:false, XMLHttpRequest:false, Headers:false */

import {OpertorJob} from './OperatorExecutor'

self.onmessage = (e) => {
  setTimeout(function() {
    postMessage(new OpertorJob(e.data).exec())
  }, 2000)
}
