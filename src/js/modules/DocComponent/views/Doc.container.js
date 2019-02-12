'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import {CHANGE_ROUTE_EVENT, default as Main} from './Main.view'

import '../assets/css/style.css'
import {ChangeRouteAction} from '../../MainComponent/actions/ChangeRouteAction'
import {ChangeRoutePayload} from '../../MainComponent/actions/ChangeRoutePayload'

const MAIN_VIEW = Symbol('MAIN_VIEW')
export class DocContainer extends ViewContainer {
  /**
   * @override
   */
  registerViews() {
    // this.main =
    this.main = Main.create(new ViewParameters(MAIN_VIEW, this))
    this.addView(this.main)
    this._handleEvents()
  }

  _handleEvents() {
    this.view(MAIN_VIEW).on(
      ViewEventListenerFactory
        .listen(CHANGE_ROUTE_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ChangeRouteAction.withPayload(
              new ChangeRoutePayload(payload.route, payload.option)
            )
          )
        }).build()
    )
  }

  getDemoNode() {
    return this.main.getDemoDiv()
  }
}

/**
 * @extends ViewStoresParameters
 */
export class DocContainerStores extends ViewStoresParameters {
}
