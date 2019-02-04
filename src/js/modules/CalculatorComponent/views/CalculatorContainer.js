'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory, ActionPayload} from 'hotballoon'
import { default as Main, MainSimpleStores, INPUT_NUMBER_EVENT, INPUT_OPERATOR_EVENT, INPUT_RESULT_EVENT } from './Calculator.view'

import '../assets/css/style.css'
import {NumberInputAction} from '../actions/NumberInputAction'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {ResultInputAction} from '../actions/ResultInputAction'
import {NumberInputPayload} from '../actions/NumberInputPayload'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'

const RESULT_STORE = 'RESULT_STORE'
export const CALCULATOR_VIEWCONTAINER = 'CALCULATOR_VIEWCONTAINER'

const CALCULATOR_VIEW = Symbol('CALCULATOR_VIEW')

export class CalculatorContainer extends ViewContainer {

  /**
   * @override
   */
  registerViews() {
    this.addView(
      Main.create(
        new ViewParameters(CALCULATOR_VIEW, this),
        new MainSimpleStores(
          this.Store(RESULT_STORE)
        )
      )
    )
    this._handleEvents()
  }

  _handleEvents() {
    this.View(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_NUMBER_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            NumberInputAction.withPayload(
              new NumberInputPayload(payload.number, this.Component())
            )
          )
        }).build(this)
    )

    this.View(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_OPERATOR_EVENT)
        .callback((payload) => {
          console.log(payload.operator)
          this.dispatchAction(
            OperatorInputAction.withPayload(
              new OperatorInputPayload(payload.operator, this.Component())
            )
          )
        }).build(this)
    )

    this.View(CALCULATOR_VIEW).on(
      ViewEventListenerFactory
        .listen(INPUT_RESULT_EVENT)
        .callback((payload) => {
          this.dispatchAction(
            ResultInputAction.withPayload(
              new OperatorInputPayload(payload.operator, this.Component())
            )
          )
        }).build(this)
    )
  }
}

/**
 * @extends ViewStoresParameters
 */
export class CalculatorContainerStores extends ViewStoresParameters {
  /**
   *
   * @param {ResultStore} resultStore
   */
  constructor(resultStore) {
    super()
    this.setStore(RESULT_STORE, resultStore)
  }
}
