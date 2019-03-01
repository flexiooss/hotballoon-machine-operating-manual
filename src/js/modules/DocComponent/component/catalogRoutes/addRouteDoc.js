import {Route} from 'flexio-jsrouter/src/Route/Route'
import {StoreDataNavbar} from '../../stores/StoreDataNavbar'
import {ActionChangeView} from '../../actions/ActionChangeView'
import {ActionPayload} from 'hotballoon'

export const addDocRoute = (component) => {
  const docRoute = new Route(
    'doc',
    '/doc/{component}/{option}',
    obj => Object.assign({}, obj),
    (params) => {
      let selected = -1
      if (params.component === 'counter') {
        if (params.option === 'simple') {
          selected = 0
        } else if (params.option === 'subview') {
          selected = 1
        }
      } else if (params.component === 'calculator') {
        selected = 2
      }
      component.__navbarStore.set(new StoreDataNavbar(component.__navbarStore.data().linkCollection, selected))

      component.__componentContext.dispatchAction(
        ActionChangeView.withPayload(
          new ActionPayload()
        )
      )
    }
  )
  component.__routeHandler.addRoute(docRoute)
}
