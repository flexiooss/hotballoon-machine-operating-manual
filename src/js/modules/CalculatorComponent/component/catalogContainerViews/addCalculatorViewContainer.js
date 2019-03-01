import {CalculatorContainerStoresParameters, ContainerCalculator} from '../../views/ContainerCalculator'
import {ViewContainerParameters} from 'hotballoon'

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
      new CalculatorContainerStoresParameters(component.__resultStoreHandler)
    )
  )

  component.__componentContext.debug.log('CALCULATOR_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(CALCULATOR_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return CALCULATOR_VIEWCONTAINER_INST
}
