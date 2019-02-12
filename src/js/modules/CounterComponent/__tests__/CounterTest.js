import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {CounterComponent} from '..'
import {CounterAddNumberAction} from '../actions/CounterAddNumberAction'
import {CounterAddNumberPayload} from '../actions/CounterAddNumberPayload'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

export class CounterTest extends TestCase {
  constructor() {
    super()
    this.counterComponent = null
  }

  setUp() {
    this.counterComponent = CounterComponent.create(APP.addComponentContext(new ComponentContext(APP)), HTML_NODE, 'SIMPLE')
  }

  testIncrementNumber() {
    this.counterComponent.componentContext.dispatchAction(
      CounterAddNumberAction.withPayload(
        new CounterAddNumberPayload(1, this.counterComponent.componentContext)
      )
    )
    assert.deepStrictEqual(this.counterComponent.store.data().count, 1)
  }

  testDecrementNumber() {
    this.counterComponent.componentContext.dispatchAction(
      CounterAddNumberAction.withPayload(
        new CounterAddNumberPayload(-1, this.counterComponent.componentContext)
      )
    )
    assert.deepStrictEqual(this.counterComponent.store.data().count, -1)
  }

  testUnchanged() {
    let tmpDataStore = this.counterComponent.store.data()
    this.counterComponent.componentContext.dispatchAction(
      CounterAddNumberAction.withPayload(
        new CounterAddNumberPayload(0, this.counterComponent.componentContext)
      )
    )
    assert.deepStrictEqual(this.counterComponent.store.data(), tmpDataStore)
  }
}
