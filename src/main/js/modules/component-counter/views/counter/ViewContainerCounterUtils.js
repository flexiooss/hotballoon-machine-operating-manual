import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {assertType, isBoolean, isNode} from '@flexio-oss/assert'
import {ContainerCounter} from './ContainerCounter'
import {ContainerStore} from '../ContainerStore'
import {ContainerAction} from '../ContainerAction'

export class ViewContainerCounterUtils {
  constructor(componentContext, parentNode, action, store, withSubView) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ViewContainerCounterUtils:constructor: `componentContext` should be a ComponentContext'
    )
    assertType(isNode(parentNode),
      'ViewContainerCounterUtils:constructor: `parentNode` should be a Node'
    )
    assertType(TypeCheck.isAction(action),
      'ViewContainerCounterUtils:constructor: `action` should be a Action'
    )
    assertType(TypeCheck.isPublicStoreHandler(store),
      'ViewContainerCounterUtils:constructor: `store` should be a Store'
    )
    assertType(isBoolean(withSubView),
      'ViewContainerCounterUtils:constructor: `withSubView` should be a Store'
    )
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__action = action
    this.__store = store
    this.__withSubView = withSubView
    this.__viewContainerID = componentContext.nextID()
    this.__viewContainer = null
  }

  /**
   *
   * @returns {ViewContainer}
   */
  init() {
    this.__viewContainer = this.__componentContext.addViewContainer(
      new ContainerCounter(
        new ViewContainerParameters(
          this.__componentContext,
          this.__viewContainerID,
          this.__parentNode
        ),
        new ContainerStore(this.__store),
        new ContainerAction(this.__action),
        this.__withSubView
      )
    )
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
