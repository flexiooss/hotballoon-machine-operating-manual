import {ContainerCounter} from '../../views/advencedCounter/ContainerCounter'
import {ViewContainerParameters} from 'hotballoon'
import {CounterContainerStoresParameters} from '../../views/ContainerStoreParametersCounter'

export const addCounterAdvancedViewContainer = (component) => {
  const COUNTER_VIEWCONTAINER_ID = component.__componentContext.nextID()
  let COUNTER_VIEWCONTAINER_INST
  COUNTER_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ContainerCounter(
      new ViewContainerParameters(
        component.__componentContext,
        COUNTER_VIEWCONTAINER_ID,
        component.__parentNode
      ),
      new CounterContainerStoresParameters(component.__counterStoreHandler)
    )
  )

  component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
