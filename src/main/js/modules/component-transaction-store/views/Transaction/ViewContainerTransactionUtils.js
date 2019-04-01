import {TypeCheck, ViewContainerParameters} from 'hotballoon'
import {assertType, isNode} from 'flexio-jshelpers'
import {ContainerTransaction} from './ContainerTransaction'
import {StoreContainer} from '../StoreContainer'

export class ViewContainerTransactionUtils {
  constructor(componentContext, parentNode, store) {
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
    this.__store = store
  }

  /**
   *
   * @returns {ViewContainer}
   */
  init() {
    const viewContainer = this.__componentContext.addViewContainer(
      new ContainerTransaction(
        new ViewContainerParameters(
          this.__componentContext,
          this.__componentContext.nextID(),
          this.__parentNode
        ),
        new StoreContainer(this.__store)
      )
    )

    this.__componentContext.debug.log('VIEWCONTAINER_INST')
    this.__componentContext.debug.object(viewContainer)
    this.__componentContext.debug.print()

    viewContainer.renderAndMount(this.__parentNode)
    return viewContainer
  }
}
