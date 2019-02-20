'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'

import '../assets/css/style.css'
import '../assets/css/normalize.css'
import '../assets/css/navbar.css'

import Header from './header.view'
import Footer from './footer.view'
import Head from './Head.view'
import Navbar, {CHANGE_COMPONENT_EVENT} from './Navbar.view'
import Main from './Main.view'

const HEAD_VIEW = Symbol('HEAD_VIEW')
const HEADER_VIEW = Symbol('HEADER_VIEW')
const FOOTER_VIEW = Symbol('FOOTER_VIEW')
const MAIN_VIEW = Symbol('MAIN_VIEW')
const NAVBAR_VIEW = Symbol('NAVBAR_VIEW')

/**
 * @extends ViewContainer
 */
export class DocContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {DocContainerStoresParameters } DocContainerStoresParameters
   * @param {function} changeRoute
   */
  constructor(viewContainerParameters, DocContainerStoresParameters, changeRoute) {
    super(viewContainerParameters)
    this.__navbarStore = DocContainerStoresParameters.navbarStore
    this.__changeRoute = changeRoute
    this.__registerViews()
  }
  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(Head.createWithParentNode(new ViewParameters(HEAD_VIEW, this), new ViewStoresParameters(),
      document.getElementsByTagName('head')[0])
    )
    this.addView(Header.create(new ViewParameters(HEADER_VIEW, this)))
    this.addView(
      Navbar.create(
        new ViewParameters(NAVBAR_VIEW, this),
        new DocContainerStoresParameters(this.__navbarStore)
      )
    )
    this.__main = Main.create(new ViewParameters(MAIN_VIEW, this))
    this.addView(this.__main)
    this.addView(Footer.create(new ViewParameters(FOOTER_VIEW, this)))
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
   * @param {NavbarStore} navbarStore
   */
  constructor(navbarStore) {
    super()
    this.__navbarStore = this.validate(navbarStore)
  }

  /**
   *
   * @returns {NavbarStore}
   */
  get navbarStore() {
    return this.__navbarStore
  }
}
