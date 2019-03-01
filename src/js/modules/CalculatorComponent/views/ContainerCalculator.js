'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory, TypeCheck} from 'hotballoon'
import { default as Main, INPUT_NUMBER_EVENT, INPUT_OPERATOR_EVENT, INPUT_RESULT_EVENT } from './ViewCalculator'

import '../assets/css/style.css'
import {ActionNumberInput} from '../actions/ActionNumberInput'
import {ActionOperatorInput} from '../actions/ActionOperatorInput'
import {ActionResultInput} from '../actions/ActionResultInput'
import {PayloadNumberInput} from '../actions/PayloadNumberInput'
import {PayloadOperatorInput} from '../actions/PayloadOperatorInput'

const CALCULATOR_VIEW = Symbol('CALCULATOR_VIEW')

export class ContainerCalculator extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CalculatorContainerStoresParameters} calculatorContainerStoresParameters
   */
  constructor(viewContainerParameters, calculatorContainerStoresParameters) {
    super(viewContainerParameters)
    this.__stores = calculatorContainerStoresParameters
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      new Main(
        new ViewParameters(CALCULATOR_VIEW, this),
        new CalculatorContainerStoresParameters(this.__stores.resultStore)
      )
    )
    this.__handleEvents()
  }

  __handleEvents() {
    this.view(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ActionNumberInput.withPayload(
              new PayloadNumberInput(payload.number)
            )
          )
        }).build()
    )

    this.view(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_OPERATOR_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ActionOperatorInput.withPayload(
              new PayloadOperatorInput(payload.operator)
            )
          )
        }).build()
    )

    this.view(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_RESULT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ActionResultInput.withPayload(
              new PayloadOperatorInput(payload.operator)
            )
          )
        }).build()
    )
  }
}

/**
 * @extends ViewStoresParameters
 */
export class CalculatorContainerStoresParameters extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} resultStore
   */
  constructor(resultStore) {
    super()
    this.__resultSotre = this.validate(resultStore)
  }

  /**
   *
   * @return {StoreHandlerTransaction}
   */
  get resultStore() {
    return this.__resultSotre
  }
}
