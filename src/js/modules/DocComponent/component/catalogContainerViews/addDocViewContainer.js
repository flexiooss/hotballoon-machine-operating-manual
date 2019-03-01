import {ViewContainerParameters} from 'hotballoon'
import {ContainerDoc, DocContainerStoresParameters} from '../../views/ContainerDoc'

/**
 *
 * @param {DocComponent} component
 * @returns {ViewContainer}
 */
export const addDocViewContainer = (component) => {
  let COUNTER_VIEWCONTAINER_INST
  COUNTER_VIEWCONTAINER_INST = component.__componentContext.addViewContainer(
    new ContainerDoc(
      new ViewContainerParameters(
        component.__componentContext,
        component.__viewContainerID,
        component.__parentNode
      ),
      new DocContainerStoresParameters(component.__navbarStoreHandler),
      component.__changeRoute
    )
  )

  component.__componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  component.__componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  component.__componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
