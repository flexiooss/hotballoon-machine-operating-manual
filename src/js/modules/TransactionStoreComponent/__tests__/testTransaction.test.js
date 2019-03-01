/* global runTest */

import {TestCase} from 'code-altimeter-js'
import {HotBalloonApplication as App, ComponentContext, Dispatcher as AppDispatcher} from 'hotballoon'
import {ActionNumberInput} from '../actions/ActionNumberInput'
import {PayloadNumberInput} from '../actions/PayloadNumberInput'
import {StoreDataTransaction} from '../stores/StoreDataTransaction'
import {PayloadTransaction} from '../actions/PayloadTransaction'
import {ActionTransaction} from '../actions/ActionTransaction'
import {OperatorPlus} from '../component/operator/OperatorPlus'
import {OperatorNull} from '../component/operator/OperatorNull'
import {ComponentTransaction} from '..'
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
    this.calculatorComponent = ComponentTransaction.create(APP.addComponentContext(new ComponentContext(APP)), HTML_NODE, new ExecutorInline())
  }

  testLeftExpression() {
    this.calculatorComponent.addResultStore()
      .addActionNumberInput()
    
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    let expectedStore = new StoreDataTransaction('1', new OperatorNull())
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
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorPlus()))
    )
    let expectedStore = new StoreDataTransaction('1', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testRightExpression() {
    this.calculatorComponent.setEventLoop()
    
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorPlus()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    let expectedStore = new StoreDataTransaction('1', new OperatorPlus(), '1')
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testResult() {
    this.calculatorComponent.setEventLoop()
  
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorPlus()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorPlus()))
    )
    let expectedStore = new StoreDataTransaction('2', new OperatorPlus())
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }

  testDivisionPerZero() {
    this.calculatorComponent.setEventLoop()
  
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('1'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorDiv()))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionNumberInput.withPayload(new PayloadNumberInput('0'))
    )
    this.calculatorComponent.componentContext.dispatchAction(
      ActionTransaction.withPayload(new PayloadTransaction(new OperatorPlus()))
    )
    let expectedStore = new StoreDataTransaction()
    assert.deepStrictEqual(this.calculatorComponent.resultStore.data(), expectedStore)
  }
}

runTest(TestCounter)
