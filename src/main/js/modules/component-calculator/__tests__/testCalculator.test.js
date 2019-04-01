/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication, Dispatcher, ExecutorInline} from 'hotballoon'
import {OperatorPlus} from '../component/workers/operator/OperatorPlus'
import {OperatorNull} from '../component/workers/operator/OperatorNull'
import {ComponentCalculator} from '../index'
import {OperatorDiv} from '../component/workers/operator/OperatorDiv'

import {FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../generated/io/package'

/**
 * @type {ActionNumberInput}
 */
const ActionNumberInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionNumberInput

/**
 * @type {ActionOperatorInput}
 */
const ActionOperatorInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionOperatorInput

/**
 * @type {ActionNumberInput}
 */
const StoreResult = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.StoreResult

const assert = require('assert')
const APP = new HotBalloonApplication('Test', new Dispatcher())
const HTML_NODE = {nodeType: 2}

class TestCounter extends TestCase {
  constructor() {
    super()
    this.calculatorComponent = null
  }

  setUp() {
    this.calculatorComponent = ComponentCalculator.create(APP.addComponentContext(), HTML_NODE, new ExecutorInline())
  }

  testLeftExpression() {
    this.calculatorComponent.setEventLoop()

    this.calculatorComponent.__actionNumberInput.dispatch(
      new ActionNumberInput('1')
    )
    let expectedStore = new StoreResult('1', new OperatorNull())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testOperator() {
    this.calculatorComponent.setEventLoop()

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
