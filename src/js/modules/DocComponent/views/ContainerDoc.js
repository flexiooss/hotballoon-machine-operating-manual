'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'

import '../assets/css/style.css'
import '../assets/css/normalize.css'
import '../assets/css/navbar.css'

import ViewHeader from './ViewHeader'
import ViewFooter from './ViewFooter'
import ViewNavbar, {CHANGE_COMPONENT_EVENT} from './ViewNavbar'
import ViewMain from './ViewMain'

const HEADER_VIEW = Symbol('HEADER_VIEW')
const FOOTER_VIEW = Symbol('FOOTER_VIEW')
const MAIN_VIEW = Symbol('MAIN_VIEW')
const NAVBAR_VIEW = Symbol('NAVBAR_VIEW')

/**
 * @extends ViewContainer
 */
export class ContainerDoc extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {DocContainerStoresParameters } DocContainerStoresParameters
   * @param {function} changeRoute
   */
  constructor(viewContainerParameters, DocContainerStoresParameters, changeRoute) {
    super(viewContainerParameters)
    this.__stores = DocContainerStoresParameters
    this.__changeRoute = changeRoute
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
        new DocContainerStoresParameters(this.__stores.navbarStore)
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
      ViewEventListenerFactory
        .listen(CHANGE_COMPONENT_EVENT)
        .callback((payload) => {
          this.dispatchAction(this.__changeRoute(payload.link))
        }).build()
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

/**
 * @extends ViewStoresParameters
 */
export class DocContainerStoresParameters extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} navbarStore
   */
  constructor(navbarStore) {
    super()
    this.__navbarStore = this.validate(navbarStore)
  }

  /**
   *
   * @returns {StoreHandlerNavbar}
   */
  get navbarStore() {
    return this.__navbarStore
  }
}
