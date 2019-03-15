import {Route} from 'flexio-jsrouter/src/Route/Route'
import {ActionChangeView} from '../../actions/ActionChangeView/ActionChangeView'
import {StoreNavbar} from '../../stores/storeNavbar/StoreNavbar'

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
      component.__navbarStore.set(new StoreNavbar(component.__navbarStoreHandler.data().linkCollection, selected))

      component.__actionChangeView.dispatch(
        new ActionChangeView()
      )
    }
  )
  component.__routeHandler.addRoute(docRoute)
}
