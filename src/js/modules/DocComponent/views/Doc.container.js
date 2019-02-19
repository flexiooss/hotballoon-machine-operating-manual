'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'

import '../assets/css/style.css'
import '../assets/css/normalize.css'
import '../assets/css/navbar.css'

import Header from './header.view'
import Footer from './footer.view'
import Head from './Head.view'
import Navbar, {CHANGE_COMPONENT_EVENT, NavbarStores} from './Navbar.view'
import Main from './Main.view'
import {ChangeRouteAction} from '../../_ComponentRouter/actions/ChangeRouteAction'
import {ChangeRoutePayload} from '../../_ComponentRouter/actions/ChangeRoutePayload'

const NAVBAR_STORE = 'NAVBAR_STORE'

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
   * @override
   */
  registerViews() {
    this.addView(Head.createWithParentNode(new ViewParameters(HEAD_VIEW, this), new ViewStoresParameters(),
      document.getElementsByTagName('head')[0])
    )
    this.addView(Header.create(new ViewParameters(HEADER_VIEW, this)))
    this.addView(
      Navbar.create(
        new ViewParameters(NAVBAR_VIEW, this),
        new NavbarStores(
          this.store(NAVBAR_STORE)
        )
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
          this.dispatchAction(
            ChangeRouteAction.withPayload(
              new ChangeRoutePayload(payload.link)
            )
          )
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
export class DocContainerStores extends ViewStoresParameters {
  /**
   *
   * @param {Store} navbarStore
   */
  constructor(navbarStore) {
    super()
    this.setStore(NAVBAR_STORE, navbarStore)
  }
}
