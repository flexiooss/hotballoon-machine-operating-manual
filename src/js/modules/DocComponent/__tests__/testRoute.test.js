/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {RouterComponent} from '../../_ComponentRouter'
import {DocComponent} from '..'
import {ChangeRouteAction} from '../../_ComponentRouter/actions/ChangeRouteAction'
import {ChangeRoutePayload} from '../../_ComponentRouter/actions/ChangeRoutePayload'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.componentRouter = null
    this.docComponent = null
    this.changeRoute = RouterComponent.changeRoute
  }

  setUp() {
    this.componentRouter = RouterComponent.create(APP.addComponentContext(new ComponentContext(APP)))
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
    this.docComponent.componentContext.dispatchAction(
      ChangeRouteAction.withPayload(
        new ChangeRoutePayload(this.docComponent.navbarStore.data().linkCollection[0].url)
      )
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 0)
  }

  testRouteCounterAdvanced() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.componentContext.dispatchAction(
      ChangeRouteAction.withPayload(
        new ChangeRoutePayload(this.docComponent.navbarStore.data().linkCollection[1].url)
      )
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 1)
  }

  testRouterCalculator() {
    this.docComponent.addDocRoute().addStoreNavbar()

    this.docComponent.componentContext.dispatchAction(
      ChangeRouteAction.withPayload(
        new ChangeRoutePayload(this.docComponent.navbarStore.data().linkCollection[2].url)
      )
    )
    assert.deepStrictEqual(this.docComponent.navbarStore.data().selected, 2)
  }
}

runTest(TestCounter)
