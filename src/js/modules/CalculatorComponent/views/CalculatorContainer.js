'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory} from 'hotballoon'
import { default as Main, ResultStores, INPUT_NUMBER_EVENT, INPUT_OPERATOR_EVENT, INPUT_RESULT_EVENT } from './Calculator.view'

import '../assets/css/style.css'
import {NumberInputAction} from '../actions/NumberInputAction'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {ResultInputAction} from '../actions/ResultInputAction'
import {NumberInputPayload} from '../actions/NumberInputPayload'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'

const RESULT_STORE = 'RESULT_STORE'

const CALCULATOR_VIEW = Symbol('CALCULATOR_VIEW')

export class CalculatorContainer extends ViewContainer {
  /**
   * @override
   */
  registerViews() {
    this.addView(
      Main.create(
        new ViewParameters(CALCULATOR_VIEW, this),
        new ResultStores(
          this.store(RESULT_STORE)
        )
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
export class CalculatorContainerStores extends ViewStoresParameters {
  /**
   *
   * @param {StoreInterface} resultStore
   */
  constructor(resultStore) {
    super()
    this.setStore(RESULT_STORE, resultStore)
  }
}
