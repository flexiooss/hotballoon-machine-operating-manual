import {ContainerCalculator} from './ContainerCalculator'
import {ViewContainerParameters} from 'hotballoon'
import {StoreContainer} from '../StoreContainer'
import {ActionContainer} from '../ActionContainer'

export class CalculatorViewContainerParams {
  /**
   *
   * @param resultStoreHandler
   * @param actionNumberInput
   * @param actionOperatorInput
   * @param actionResultInput
   */
  constructor(resultStoreHandler, actionNumberInput, actionOperatorInput, actionResultInput) {
    this.resultStoreHandler = resultStoreHandler
    this.actionNumberInput = actionNumberInput
    this.actionOperatorInput = actionOperatorInput
    this.actionResultInput = actionResultInput
  }
}

/**
 *
 * @param {ComponentContext} componentContext
 * @param {Node} parentNode
 * @param {CalculatorViewContainerParams} params
 * @returns {ViewContainer}
 */
export const initCalculatorViewContainer = (componentContext, parentNode, params) => {
  const CALCULATOR_VIEWCONTAINER_ID = componentContext.nextID()
  let CALCULATOR_VIEWCONTAINER_INST
  CALCULATOR_VIEWCONTAINER_INST = componentContext.addViewContainer(
    new ContainerCalculator(
      new ViewContainerParameters(
        componentContext,
        CALCULATOR_VIEWCONTAINER_ID,
        parentNode
      ),
      new StoreContainer(params.resultStoreHandler),
      new ActionContainer(params.actionNumberInput, params.actionOperatorInput, params.actionResultInput)
    )
  )

  componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
  componentContext.debug.object(CALCULATOR_VIEWCONTAINER_INST)
  componentContext.debug.print()

  return CALCULATOR_VIEWCONTAINER_INST
}
