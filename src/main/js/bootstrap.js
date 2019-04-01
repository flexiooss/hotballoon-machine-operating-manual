import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'

import {ComponentMainBuilder} from './modules/component-main'
import {ExecutorWorker} from 'hotballoon'

export const APP = new App('Documentation', new AppDispatcher())
const HTML_NODE = document.body
;(function(app) {
  ComponentMainBuilder
    .build(app, HTML_NODE, new ExecutorWorker())
    .dispatchActionInitialize('topinambour !')
})(APP)
