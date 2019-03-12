import {ViewContainerParameters} from 'hotballoon'
import {ViewContainerDoc} from './ViewContainerDoc'
import {StoreContainer} from '../StoreContainer'

/**
 *
 * @param {DocComponent} component
 * @returns {ViewContainer}
 */
export const initDocViewContainer = (component) => {
  let COUNTER_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ViewContainerDoc(
      new ViewContainerParameters(
        component.__componentContext,
        component.__viewContainerID,
        component.__parentNode
      ),
      new StoreContainer(component.__navbarStoreHandler),
      component.__routerActionDispatcher
    )
  )

  component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
