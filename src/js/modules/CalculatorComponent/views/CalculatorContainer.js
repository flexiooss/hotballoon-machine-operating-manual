'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import { default as Main, INPUT_NUMBER_EVENT, INPUT_OPERATOR_EVENT, INPUT_RESULT_EVENT } from './Calculator.view'

import '../assets/css/style.css'
import {NumberInputAction} from '../actions/NumberInputAction'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {ResultInputAction} from '../actions/ResultInputAction'
import {NumberInputPayload} from '../actions/NumberInputPayload'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'

const CALCULATOR_VIEW = Symbol('CALCULATOR_VIEW')

export class CalculatorContainer extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CalculatorContainerStoresParameters} calculatorContainerStoresParameters
   */
  constructor(viewContainerParameters, calculatorContainerStoresParameters) {
    super(viewContainerParameters)
    this.__resultStore = calculatorContainerStoresParameters.resultStore
    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.addView(
      Main.create(
        new ViewParameters(CALCULATOR_VIEW, this),
        new CalculatorContainerStoresParameters(this.__resultStore)
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
            NumberInputAction.withPayload(
              new NumberInputPayload(payload.number, this.componentContext())
            )
          )
        }).build()
    )

    this.view(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_OPERATOR_EVENT)
        .callback((payload) => {
          console.log(payload.operator)
          this.dispatchAction(
            OperatorInputAction.withPayload(
              new OperatorInputPayload(payload.operator, this.componentContext())
            )
          )
        }).build()
    )

    this.view(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_RESULT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ResultInputAction.withPayload(
              new OperatorInputPayload(payload.operator, this.componentContext())
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
   * @return {ResultStore}
   */
  get resultStore() {
    return this.__resultSotre
  }
}
