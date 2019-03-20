import {ContainerCounter} from './ContainerCounter'
import {ViewContainerParameters} from 'hotballoon'
import {ContainerStore} from '../ContainerStore'
import {ContainerAction} from '../ContainerAction'

export class InitCounterViewContainerParams {
  constructor(actionModifyCounter, counterStoreHandler, withSubView) {
    this.actionModifyCounter = actionModifyCounter
    this.counterStoreHandler = counterStoreHandler
    this.withSubView = withSubView
  }
}

/**
 *
 * @param {ComponentContext} componentContext
 * @param {Node} parentNode
 * @param {InitCounterViewContainerParams} params
 * @returns {ViewContainer}
 */
export const initCounterViewContainer = (componentContext, parentNode, params) => {
  const COUNTER_VIEWCONTAINER_ID = componentContext.nextID()
  let COUNTER_VIEWCONTAINER_INST
  COUNTER_VIEWCONTAINER_INST = componentContext.addViewContainer(
    new ContainerCounter(
      new ViewContainerParameters(
        componentContext,
        COUNTER_VIEWCONTAINER_ID,
        parentNode
      ),
      new ContainerStore(params.counterStoreHandler),
      new ContainerAction(params.actionModifyCounter),
      params.withSubView
    )
  )

  componentContext.debug.log('COUNTER_VIEWCONTAINER_INST')
  componentContext.debug.object(COUNTER_VIEWCONTAINER_INST)
  componentContext.debug.print()

  return COUNTER_VIEWCONTAINER_INST
}
