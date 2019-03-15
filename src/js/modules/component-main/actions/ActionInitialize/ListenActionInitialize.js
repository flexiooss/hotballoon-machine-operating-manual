import {assert} from 'flexio-jshelpers'
import {InitDocComponent} from '../../../component-doc/component/InitDocComponent'

/**
 *
 * @param {MainComponent} component
 */
export const listenActionInitialize = (component) => {
  assert(component.__actionInitialize !== 'undefined',
    'listenActionInitialize: ActionChangeView should be initialized before using it'
  )

  component.__actionInitialize
    .listenWithCallback((payload) => {
      console.log(payload.message)
      InitDocComponent.create(
        payload,
        component.componentContext.APP(),
        component.__parentNode,
        component.__routeHandler,
        component.__routerActionDispatcher,
        component.__executor,
        component.__transactionActionDispatcher
      ).dispatchActionInitialize()
    })
}
