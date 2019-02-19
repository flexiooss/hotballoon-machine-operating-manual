import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'

import {MainComponent} from './modules/MainComponent'
import {AppInitializedAction, AppActionPayload} from './modules/MainComponent/actions/AppInitializedAction'
import {ComponentContext} from 'hotballoon'

export const APP = new App('Documentation', new AppDispatcher())
const HTML_NODE = document.body

;(function(app) {
  (MainComponent
    .create(
      app.addComponentContext(
        new ComponentContext(app)
      ),
      HTML_NODE
    ))
    .componentContext
    .dispatchAction(
      AppInitializedAction.withPayload(
        new AppActionPayload('Topinambour !!!')
      )
    )
})(APP)
