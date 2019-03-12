/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {ActionNumberInput} from '../actions/ActionNumberInput/ActionNumberInput'
import {ActionOperatorInput} from '../actions/ActionOperatorInput/ActionOperatorInput'
import {OperatorPlus} from '../component/operator/OperatorPlus'
import {OperatorNull} from '../component/operator/OperatorNull'
import {ComponentCalculator} from '..'
import {OperatorDiv} from '../component/operator/OperatorDiv'
import {ExecutorInline} from '../component/Job/ExecutorInlineImpl'
import {StoreResult} from '../stores/StoreResult/StoreResult'
const assert = require('assert')

const APP = new App('Test', new AppDispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.calculatorComponent = null
  }

  setUp() {
    this.calculatorComponent = ComponentCalculator.create(APP.addComponentContext(new ComponentContext(APP)), HTML_NODE, new ExecutorInline())
  }

  testLeftExpression() {
    this.calculatorComponent.addResultStore()
      .addActionNumberInput()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    let expectedStore = new StoreResult('1', new OperatorNull())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testOperator() {
    this.calculatorComponent.addResultStore()
      .addActionNumberInput()
      .addActionOperatorInput()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorPlus())
    )
    let expectedStore = new StoreResult('1', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testRightExpression() {
    this.calculatorComponent.setEventLoop()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorPlus())
    )
    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    let expectedStore = new StoreResult('1', new OperatorPlus(), '1')
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testResult() {
    this.calculatorComponent.setEventLoop()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorPlus())
    )
    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorPlus())
    )
    let expectedStore = new StoreResult('2', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testDivisionPerZero() {
    this.calculatorComponent.setEventLoop()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorDiv())
    )
    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('0')
    )
    this.calculatorComponent.__actionOperatorInput.dispatch(
      new ActionOperatorInput(new OperatorPlus())
    )
    let expectedStore = new StoreResult()
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }
}

runTest(TestCounter)
