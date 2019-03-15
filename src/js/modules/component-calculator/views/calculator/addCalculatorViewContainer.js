import {ContainerCalculator} from './ContainerCalculator'
import {ViewContainerParameters} from 'hotballoon'
import {StoreContainer} from '../StoreContainer'
import {ActionContainer} from '../ActionContainer'

export const addCalculatorViewContainer = (component) => {
  const CALCULATOR_VIEWCONTAINER_ID = component.__componentContext.nextID()
  let CALCULATOR_VIEWCONTAINER_INST
  CALCULATOR_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ContainerCalculator(
      new ViewContainerParameters(
        component.__componentContext,
        CALCULATOR_VIEWCONTAINER_ID,
        component.__parentNode
      ),
      new StoreContainer(component.__resultStoreHandler),
      new ActionContainer(component.__actionNumberInput, component.__actionOperatorInput, component.__actionResultInput)
    )
  )

  component.__componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(CALCULATOR_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return CALCULATOR_VIEWCONTAINER_INST
}
