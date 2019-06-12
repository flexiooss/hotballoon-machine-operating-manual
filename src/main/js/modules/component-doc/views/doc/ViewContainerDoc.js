'use strict'
import {ViewContainer, ViewParameters, ViewEventListenerBuilder} from '@flexio-oss/hotballoon'

import '../../assets/css/style.css'
import '../../assets/css/normalize.css'
import '../../assets/css/navbar.css'
import ViewHeader from './views/ViewHeader'
import ViewNavbar, {CHANGE_COMPONENT_EVENT} from './views/ViewNavbar'
import ViewMain from './views/ViewMain'
import ViewFooter from './views/ViewFooter'
import {ContainerStore} from '../ContainerStore'

const HEADER_VIEW = Symbol('HEADER_VIEW')
const FOOTER_VIEW = Symbol('FOOTER_VIEW')
const MAIN_VIEW = Symbol('MAIN_VIEW')
const NAVBAR_VIEW = Symbol('NAVBAR_VIEW')

/**
 * @extends ViewContainer
 */
export class ViewContainerDoc extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {ContainerStore} containerStore
   * @param {RouterActionDispatcher} routerActionDispatcher
   */
  constructor(viewContainerParameters, containerStore, routerActionDispatcher) {
    super(viewContainerParameters)
    this.__stores = containerStore
    this.__routerActionDispatcher = routerActionDispatcher

    this.__viewHeader = null
    this.__viewNavbar = null
    this.__viewMain = null
    this.__viewFooter = null

    this.__registerViews()
  }
  /**
   *
   * @private
   */
  __registerViews() {
    this.__viewHeader = this.addView(new ViewHeader(this))
    this.__viewNavbar = this.addView(new ViewNavbar(this, new ContainerStore(this.__stores.navbarStore)))
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
