import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'
import {ConsoleLogger} from '@flexio-oss/js-logger'
import {ComponentMainBuilder} from './modules/component-main'
import {ExecutorWorker} from '@flexio-oss/hotballoon'
export const APP = new App('Documentation', new AppDispatcher(), new ConsoleLogger().debug())
const HTML_NODE = document.body

;(function(app) {
  ComponentMainBuilder
    .build(app, HTML_NODE, new ExecutorWorker())
    .dispatchActionInitialize('topinambour !')
})(APP)
