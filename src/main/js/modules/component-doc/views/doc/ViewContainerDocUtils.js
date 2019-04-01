import {TypeCheck, ViewContainerParameters} from 'hotballoon'
import {assertType, isNode} from 'flexio-jshelpers'
import {ContainerStore} from '../ContainerStore'
import {ViewContainerDoc} from './ViewContainerDoc'

export class ViewContainerDocUtils {
  constructor(componentContext, parentNode, routerActionDispatcher, store) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ViewContainerDocUtils:constructor: `componentContext` should be a ComponentContext'
    )
    assertType(isNode(parentNode),
      'ViewContainerDocUtils:constructor: `parentNode` should be a Node'
    )
    assertType(TypeCheck.isPublicStoreHandler(store),
      'ViewContainerDocUtils:constructor: `store` should be a Store'
    )
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__routerActionDispatcher = routerActionDispatcher
    this.__store = store
    this.__viewContainerID = componentContext.nextID()
    this.__viewContainer = null
  }

  /**
   *
   * @returns {ViewContainerDocUtils}
   */
  init() {
    this.__viewContainer = this.__componentContext.addViewContainer(
      new ViewContainerDoc(
        new ViewContainerParameters(
          this.__componentContext,
          this.__viewContainerID,
          this.__parentNode
        ),
        new ContainerStore(this.__store),
        this.__routerActionDispatcher
      )
    )

    this.__componentContext.debug.log('VIEWCONTAINER_INST')
    this.__componentContext.debug.object(this.__viewContainer)
    this.__componentContext.debug.print()

    this.__viewContainer.renderAndMount(this.__parentNode)
    return this
  }

  /**
   *
   * @returns {String}
   */
  ID() {
    return this.__viewContainerID
  }

  /**
   *
   * @returns {ViewContainer}
   */
  viewContainer() {
    return this.__viewContainer
  }
}
