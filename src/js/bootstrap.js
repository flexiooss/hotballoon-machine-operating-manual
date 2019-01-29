import {App} from './app/App'
import {AppDispatcher} from './app/AppDispatcher'

import {MainComponent} from './modules/MainComponent'
import {AppInitializedAction, AppActionPayload} from './modules/MainComponent/actions/AppInitializedAction'

export const APP = new App('CounterApplication', new AppDispatcher())
const HTML_NODE = document.body

;(function (app) {
  const MAIN_COMPONENT_ID = app.addComponent(MainComponent.create(app, HTML_NODE))
  app.Component(MAIN_COMPONENT_ID)
    .dispatchAction(
      AppInitializedAction.withPayload(
        new AppActionPayload('Rutabaga !!')
      )
    )
})(APP)
