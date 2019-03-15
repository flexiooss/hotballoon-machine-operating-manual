import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'

import {InitMainComponent} from './modules/component-main/component/InitMainComponent'
import {ExecutorWorker} from 'hotballoon'

export const APP = new App('Documentation', new AppDispatcher())
const HTML_NODE = document.body
;(function(app) {
  (InitMainComponent.create(
    app,
    HTML_NODE,
    new ExecutorWorker()
  )).dispatchActionInitialize('RUTABAGA !')
})(APP)
