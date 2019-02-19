/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {NumberInputAction} from '../actions/NumberInputAction'
import {NumberInputPayload} from '../actions/NumberInputPayload'
import {DataResultStore} from '../stores/DataResultStore'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {OperatorPlus} from '../component/operator/OperatorPlus'
import {OperatorNull} from '../component/operator/OperatorNull'
import {CalculatorComponent} from '..'
import {OperatorDiv} from '../component/operator/OperatorDiv'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.calculatorComponent = null
  }

  setUp() {
    this.calculatorComponent = CalculatorComponent.create(APP.addComponentContext(new ComponentContext(APP)), HTML_NODE)
  }

  testLeftExpression() {
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    let expectedStore = new DataResultStore('1', new OperatorNull())
    assert.deepStrictEqual(this.calculatorComponent.store.data(), expectedStore)
  }

  testOperator() {
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorPlus(), this.calculatorComponent.componentContext))
    )
    let expectedStore = new DataResultStore('1', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.store.data(), expectedStore)
  }

  testRightExpression() {
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorPlus(), this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    let expectedStore = new DataResultStore('1', new OperatorPlus(), '1')
    assert.deepStrictEqual(this.calculatorComponent.store.data(), expectedStore)
  }

  testResult() {
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorPlus(), this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorPlus(), this.calculatorComponent.componentContext))
    )
    let expectedStore = new DataResultStore('2', OperatorNull)
    assert.deepStrictEqual(this.calculatorComponent.store.data(), expectedStore)
  }

  testDivisionPerZero() {
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('1', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorDiv(), this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      NumberInputAction.withPayload(new NumberInputPayload('0', this.calculatorComponent.componentContext))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      OperatorInputAction.withPayload(new OperatorInputPayload(new OperatorPlus(), this.calculatorComponent.componentContext))
    )
    let expectedStore = new DataResultStore()
    assert.deepStrictEqual(this.calculatorComponent.store.data(), expectedStore)
  }
}

runTest(TestCounter)
