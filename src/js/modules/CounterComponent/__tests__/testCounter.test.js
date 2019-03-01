/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {ComponentCounter} from '..'
import {ActionModifyCounter} from '../actions/ActionModifyCounter'
import {PayloadModifyCounter} from '../actions/PayloadModifyCounter'
import {addMultimeter} from '../component/catalogContainerViews/addMultimeter'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.counterComponent = null
  }

  setUp() {
    this.counterComponent = ComponentCounter.create(APP.addComponentContext(new ComponentContext(APP)), HTML_NODE, 'simple')
  }

  testIncrementNumber() {
    this.counterComponent.setEventLoop()
    this.multimeter = this.counterComponent.addMultimeter()

    this.multimeter.dispatchAction(
      ActionModifyCounter.withPayload(
        new PayloadModifyCounter(1)
      )
    )
    assert.deepStrictEqual(this.counterComponent.counterStore.data().count, 1)
  }

  testDecrementNumber() {
    this.counterComponent.setEventLoop()

    this.counterComponent.componentContext.dispatchAction(
      ActionModifyCounter.withPayload(
        new PayloadModifyCounter(-1)
      )
    )
    assert.deepStrictEqual(this.counterComponent.counterStore.data().count, 0)
  }

  testUnchanged() {
    this.counterComponent.setEventLoop()

    let tmpDataStore = this.counterComponent.counterStore.data
    this.counterComponent.componentContext.dispatchAction(
      ActionModifyCounter.withPayload(
        new PayloadModifyCounter(0)
      )
    )
    assert.deepStrictEqual(this.counterComponent.counterStore.data, tmpDataStore)
  }
}

runTest(TestCounter)
