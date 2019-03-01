/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {ActionNumberInput} from '../actions/ActionNumberInput'
import {PayloadNumberInput} from '../actions/PayloadNumberInput'
import {StoreDataResult} from '../stores/StoreDataResult'
import {PayloadOperatorInput} from '../actions/PayloadOperatorInput'
import {ActionOperatorInput} from '../actions/ActionOperatorInput'
import {OperatorPlus} from '../component/operator/OperatorPlus'
import {OperatorNull} from '../component/operator/OperatorNull'
import {ComponentCalculator} from '..'
import {OperatorDiv} from '../component/operator/OperatorDiv'
import {ExecutorInline} from '../component/Job/ExecutorInlineImpl'
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
    
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    let expectedStore = new StoreDataResult('1', new OperatorNull())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testOperator() {
    this.calculatorComponent.addResultStore()
      .addActionNumberInput()
      .addActionOperatorInput()
    
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorPlus()))
    )
    let expectedStore = new StoreDataResult('1', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testRightExpression() {
    this.calculatorComponent.setEventLoop()
    
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorPlus()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    let expectedStore = new StoreDataResult('1', new OperatorPlus(), '1')
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testResult() {
    this.calculatorComponent.setEventLoop()
  
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorPlus()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorPlus()))
    )
    let expectedStore = new StoreDataResult('2', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testDivisionPerZero() {
    this.calculatorComponent.setEventLoop()
  
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorDiv()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('0'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionOperatorInput.withPayload(new PayloadOperatorInput(new OperatorPlus()))
    )
    let expectedStore = new StoreDataResult()
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }
}

runTest(TestCounter)
