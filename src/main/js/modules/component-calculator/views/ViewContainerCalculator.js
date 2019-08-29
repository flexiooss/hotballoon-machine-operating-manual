'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewCalculator} from './views/ViewCalculator'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class ViewContainerCalculator extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CalculatorStoreManager} storeContainer
   * @param {CalculatorActionManager} actionContainer
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
      new ViewCalculator(
        this,
        this.__stores
      )
    )
    this.__handleEvents()
  }

  __handleEvents() {
    this.__viewMain.on()
      .addNumber((payload) => {
        this.__actions.actionNumberInput().dispatch(
          new globalFlexioImport.io.flexio.component_calculator.actions.ActionNumberInputBuilder()
            .number(payload.number)
            .build()
        )
      })
    this.__viewMain.on()
      .addOperator((payload) => {
        this.__actions.actionOperatorInput().dispatch(
          new globalFlexioImport.io.flexio.component_calculator.actions.ActionOperatorInputBuilder()
            .operator(payload.operator)
            .build()
        )
      })
    this.__viewMain.on()
      .addResult((payload) => {
        this.__actions.actionResultInput().dispatch(
          new globalFlexioImport.io.flexio.component_calculator.actions.ActionResultInputBuilder()
            .operator(payload.operator)
            .build()
        )
      })
  }
}
