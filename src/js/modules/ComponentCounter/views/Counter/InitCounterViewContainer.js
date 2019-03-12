import {ContainerCounter} from './ContainerCounter'
import {ViewContainerParameters} from 'hotballoon'
import {ContainerStore} from '../ContainerStore'
import {ContainerAction} from '../ContainerAction'

export const initCounterViewContainer = (component) => {
  const COUNTER_VIEWCONTAINER_ID = component.__componentContext.nextID()
  let COUNTER_VIEWCONTAINER_INST
  COUNTER_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ContainerCounter(
      new ViewContainerParameters(
        component.__componentContext,
        COUNTER_VIEWCONTAINER_ID,
        component.__parentNode
      ),
      new ContainerStore(component.__counterStoreHandler),
      new ContainerAction(component.__actionModifyCounter),
      component.withSubView
    )
  )

  component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
