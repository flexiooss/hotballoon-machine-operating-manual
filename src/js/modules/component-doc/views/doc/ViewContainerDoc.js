'use strict'
import {ViewContainer, ViewParameters, ViewEventListenerBuilder} from 'hotballoon'

import '../../assets/css/style.css'
import '../../assets/css/normalize.css'
import '../../assets/css/navbar.css'
import ViewHeader from './views/ViewHeader'
import ViewNavbar, {CHANGE_COMPONENT_EVENT} from './views/ViewNavbar'
import ViewMain from './views/ViewMain'
import ViewFooter from './views/ViewFooter'
import {StoreContainer} from '../StoreContainer'

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
    this.__registerViews()
  }
  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(new ViewHeader(new ViewParameters(HEADER_VIEW, this)))
    this.addView(
      new ViewNavbar(
        new ViewParameters(NAVBAR_VIEW, this),
        new StoreContainer(this.__stores.navbarStore)
      )
    )
    this.__main = new ViewMain(new ViewParameters(MAIN_VIEW, this))
    this.addView(this.__main)
    this.addView(new ViewFooter(new ViewParameters(FOOTER_VIEW, this)))
    this.__handleEvents()
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.view(NAVBAR_VIEW).on(
      ViewEventListenerBuilder
        .listen(CHANGE_COMPONENT_EVENT)
        .callback((payload) => {
          this.__routerActionDispatcher.changeRoute(payload.link)
        })
        .build()
    )
  }

  /**
   *
   * @returns {Node}
   */
  getDemoNode() {
    return this.__main.getDemoDiv()
  }

  resetDemoDiv() {
    this.__main.resetDemoDiv()
  }
}
