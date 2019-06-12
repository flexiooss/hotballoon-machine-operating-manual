'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import { default as Main } from './views/ViewCalculator'
import {StoreContainer} from '../StoreContainer'

import '../../assets/css/style.css'

import {globalFlexioImport} from '@flexio-oss/global-import-registry'

const ActionNumberInput = globalFlexioImport.io.flexio.component_calculator.actions.ActionNumberInput
const ActionOperatorInput = globalFlexioImport.io.flexio.component_calculator.actions.ActionOperatorInput

export class ContainerCalculator extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {StoreContainer} storeContainer
   * @param {ActionContainer} actionContainer
   */
  constructor(viewContainerParameters, storeContainer, actionContainer) {
    super(viewContainerParameters)
    this.__stores = storeContainer
    this.__actions = actionContainer
    this.__viewMain = null

    this.__registerViews()
  }

  /**
   *
   * @private
   */
  __registerViews() {
    this.__viewMain = this.addView(
      new Main(
        this,
        new StoreContainer(this.__stores.resultStore)
      )
    )
    this.__handleEvents()
  }

  __handleEvents() {
    this.__viewMain.on()
      .addNumber((payload) => {
        this.__actions.actionNumberInput.dispatch(
          new ActionNumberInput(payload.number)
        )
      })
    this.__viewMain.on()
      .addOperator((payload) => {
        this.__actions.actionOperatorInput.dispatch(
          new ActionOperatorInput(payload.operator)
        )
      })
    this.__viewMain.on()
      .addResult((payload) => {
        this.__actions.actionOperatorInput.dispatch(
          new ActionOperatorInput(payload.operator)
        )
      })
  }
}
