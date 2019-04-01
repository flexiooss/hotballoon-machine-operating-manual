import {TypeCheck, ViewContainerParameters} from 'hotballoon'
import {assertType, isNode} from 'flexio-jshelpers'
import {StoreContainer} from '../StoreContainer'
import {ActionContainer} from '../ActionContainer'
import {ContainerCalculator} from './ContainerCalculator'

export class ViewContainerCalculatorUtils {
  constructor(componentContext, parentNode, actionNumberInput, actionOperatorInput, actionResultInput, store) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ViewContainerCalculatorUtils:constructor: `componentContext` should be a ComponentContext'
    )
    assertType(isNode(parentNode),
      'ViewContainerCalculatorUtils:constructor: `parentNode` should be a Node'
    )
    assertType(TypeCheck.isAction(actionNumberInput),
      'ViewContainerCalculatorUtils:constructor: `actionNumberInput` should be a Action'
    )
    assertType(TypeCheck.isAction(actionOperatorInput),
      'ViewContainerCalculatorUtils:constructor: `actionOperatorInput` should be a Action'
    )
    assertType(TypeCheck.isAction(actionResultInput),
      'ViewContainerCalculatorUtils:constructor: `actionResultInput` should be a Action'
    )
    assertType(TypeCheck.isPublicStoreHandler(store),
      'ViewContainerCalculatorUtils:constructor: `store` should be a Store'
    )
    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__actionNumberInput = actionNumberInput
    this.__actionOperatorInput = actionOperatorInput
    this.__actionResultInput = actionResultInput
    this.__store = store
    this.__viewContainerID = componentContext.nextID()
    this.__viewContainer = null
  }

  /**
   *
   * @returns {ViewContainer}
   */
  init() {
    this.__viewContainer = this.__componentContext.addViewContainer(
      new ContainerCalculator(
        new ViewContainerParameters(
          this.__componentContext,
          this.__viewContainerID,
          this.__parentNode
        ),
        new StoreContainer(this.__store),
        new ActionContainer(this.__actionNumberInput, this.__actionOperatorInput, this.__actionResultInput)
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
