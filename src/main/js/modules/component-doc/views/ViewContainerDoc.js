'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'

import '../../../assets/css/style.css'
import '../assets/css/normalize.css'
import '../assets/css/navbar.css'
import ViewHeader from './views/ViewHeader'
import ViewNavbar from './views/ViewNavbar'
import ViewMain from './views/ViewMain'
import ViewFooter from './views/ViewFooter'

/**
 * @extends ViewContainer
 */
export class ViewContainerDoc extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {NavbarStoreManager} navbarStoreManager
   * @param {RouterActionDispatcher} routerActionDispatcher
   */
  constructor(viewContainerParameters, navbarStoreManager, routerActionDispatcher) {
    super(viewContainerParameters)
    this.__stores = navbarStoreManager
    this.__routerActionDispatcher = routerActionDispatcher
    this.__viewHeader = this.addView(new ViewHeader(this))
    this.__viewNavbar = this.addView(new ViewNavbar(this, this.__stores))
    this.__viewMain = this.addView(new ViewMain(this))
    this.__viewFooter = this.addView(new ViewFooter(this))
    this.__handleEvents()
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.__viewNavbar.on()
      .changeView((payload) => {
        this.__routerActionDispatcher.changeRoute(payload.link)
      })
  }

  /**
   *
   * @returns {Node}
   */
  getDemoNode() {
    return this.__viewMain.getDemoDiv()
  }

  resetDemoDiv() {
    this.__viewMain.resetDemoDiv()
  }
}
