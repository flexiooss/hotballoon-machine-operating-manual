import {InitCounterComponent} from '../../../ComponentCounter/component/InitCounterComponent'
import {InitCalculatorComponent} from '../../../ComponentCalculator/component/InitCalculatorComponent'
import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {DocComponent} component
 */
export const listenActionChangeView = (component) => {
  assert(component.__actionChangeView !== 'undefined',
    'listenActionInitialize: ActionChangeView should be initialized before using it'
  )

  component.__actionChangeView
    .listenWithCallback((payload) => {
      if (component.__navbarStoreHandler.data().selected === 0) {
        InitCounterComponent.create(
          payload,
          component.__componentContext.APP(),
          component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
          false
        )
      } else if (component.__navbarStoreHandler.data().selected === 1) {
        InitCounterComponent.create(
          payload,
          component.__componentContext.APP(),
          component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
          true
        )
      } else if (component.__navbarStoreHandler.data().selected === 2) {
        InitCalculatorComponent.create(
          null,
          component.__componentContext.APP(),
          component.__componentContext.viewContainer(component.__viewContainerID).getDemoNode(),
          component.__executor,
          component.__transactionActionDispatcher
        )
      }
    })
}
