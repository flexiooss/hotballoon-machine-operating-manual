/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'

import {DocComponent} from '..'
import {InitRouterComponent} from '../../_ComponentRouter/component/InitRouterComponent'
import {ActionChangeRoute} from '../../_ComponentRouter/actions/ActionChangeRoute/ActionChangeRoute'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.componentRouter = null
    this.docComponent = null
    this.changeRoute = null
  }

  setUp() {
    const routerComponent = InitRouterComponent.create(APP)
    this.componentRouter = routerComponent.routeHandler
    this.changeRoute = routerComponent.changeRoute
    this.docComponent = DocComponent.create(
      APP.addComponentContext(
        new ComponentContext(APP)
      ),
      HTML_NODE,
      this.componentRouter.routeHandler,
      this.changeRoute
    )
  }

  testRouteInitialized() {
    this.docComponent.addDocRoute().addStoreNavbar()

    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 0)
  }

  testRouteCounterSimple() {
    this.docComponent.addDocRoute().addStoreNavbar()
    console.log(this.docComponent.navbarStore.data().linkCollection[0])
    this.docComponent.__actionModifyCounter.dispatch(
      new ActionChangeRoute(this.docComponent.navbarStore.data().linkCollection[0].url)
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 0)
  }

  testRouteCounterAdvanced() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.__actionModifyCounter.dispatch(
      new ActionChangeRoute(this.docComponent.navbarStore.data().linkCollection[1].url)
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 1)
  }

  testRouterCalculator() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.__actionModifyCounter.dispatch(
      new ActionChangeRoute(this.docComponent.navbarStore.data().linkCollection[2].url)
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 2)
  }
}

runTest(TestCounter)
