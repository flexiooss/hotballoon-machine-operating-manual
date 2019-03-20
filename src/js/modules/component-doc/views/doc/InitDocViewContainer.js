import {ViewContainerParameters} from 'hotballoon'
import {ViewContainerDoc} from './ViewContainerDoc'
import {ContainerStore} from '../ContainerStore'

export class InitDocViewContainerParams {
  constructor(navbarStoreHandler, viewContainerID, routerActionDispatcher) {
    this.navbarStoreHandler = navbarStoreHandler
    this.viewContainerID = viewContainerID
    this.routerActionDispatcher = routerActionDispatcher
  }
}

/**
 *
 * @param {ComponentContext} componentContext
 * @param {Node} parentNode
 * @param params
 * @returns {ViewContainer}
 */
export const initDocViewContainer = (componentContext, parentNode, params) => {
  let COUNTER_VIEWCONTAINER_INST = componentContext.addViewContainer(
    new ViewContainerDoc(
      new ViewContainerParameters(
        componentContext,
        params.viewContainerID,
        parentNode
      ),
      new ContainerStore(params.navbarStoreHandler),
      params.routerActionDispatcher
    )
  )

  componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
