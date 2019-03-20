import {InitCounterComponent} from '../../../component-counter/component/InitCounterComponent'
import {InitCalculatorComponent} from '../../../component-calculator/component/InitCalculatorComponent'
import {assertType} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'

export class ListenActionChangeViewParams {
  constructor(actionChangeView, navbarStoreHandler, componentContext, viewContainerID, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isAction(actionChangeView),
      'ComponentDoc:ListenActionChangeViewParams: actionChangeView should be an action'
    )

    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentDoc:ListenActionChangeViewParams: componentContext should be a ComponentContext'
    )

    this.actionChangeView = actionChangeView
    this.navbarStoreHandler = navbarStoreHandler
    this.componentContext = componentContext
    this.viewContainerID = viewContainerID
    this.executor = executor
    this.transactionActionDispatcher = transactionActionDispatcher
  }
}

/**
 *
 * @param {ListenActionChangeViewParams} params
 */
export const listenActionChangeView = (params) => {
  params.actionChangeView
    .listenWithCallback((payload) => {
      if (params.navbarStoreHandler.data().selected === 0) {
        InitCounterComponent.create(
          payload,
          params.componentContext.APP(),
          params.componentContext.viewContainer(params.viewContainerID).getDemoNode(),
          false
        )
      } else if (params.navbarStoreHandler.data().selected === 1) {
        InitCounterComponent.create(
          payload,
          params.componentContext.APP(),
          params.componentContext.viewContainer(params.viewContainerID).getDemoNode(),
          true
        )
      } else if (params.navbarStoreHandler.data().selected === 2) {
        InitCalculatorComponent.create(
          null,
          params.componentContext.APP(),
          params.componentContext.viewContainer(params.viewContainerID).getDemoNode(),
          params.executor,
          params.transactionActionDispatcher
        )
      }
    })
}
