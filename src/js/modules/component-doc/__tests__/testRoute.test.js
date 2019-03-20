/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, Dispatcher as AppDispatcher} from 'hotballoon'

import {ComponentDoc} from '..'
import {ComponentRouterBuilder} from '../../_component-router/component/ComponentRouterBuilder'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.routerHandler = null
    this.docComponent = null
    this.actionRouterDispatcher = null
  }

  setUp() {
    const routerComponent = ComponentRouterBuilder.build(APP).init()
    this.routerHandler = routerComponent.routeHandler
    this.routerActionDispatcher = routerComponent.routerActionDispatcher
    this.docComponent = ComponentDoc.create(
      APP.addComponentContext(),
      HTML_NODE,
      this.routerHandler,
      this.routerActionDispatcher
    )
  }

  testRouteInitialized() {
    this.docComponent.addDocRoute().addStoreNavbar()

    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 0)
  }

  testRouteCounterSimple() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.__routerActionDispatcher.changeRoute(this.docComponent.navbarStore.data().linkCollection[0].url)
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 0)
  }

  testRouteCounterAdvanced() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.__routerActionDispatcher.changeRoute(this.docComponent.navbarStore.data().linkCollection[1].url)
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 1)
  }

  testRouterCalculator() {
    this.docComponent.addDocRoute().addStoreNavbar()
    this.docComponent.__routerActionDispatcher.changeRoute(this.docComponent.navbarStore.data().linkCollection[2].url)
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 2)
  }
}

runTest(TestCounter)
