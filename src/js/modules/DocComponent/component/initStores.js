import {Store, State, InMemoryStorage} from 'hotballoon'
import {NAVBAR_STORE, NavbarStore} from '../stores/NavbarStore'
import {Link} from '../stores/Link'

/**
 *
 * @param componentContext
 * @param {PublicRouteHandler} routeHandler
 * @return {Store}
 */
export const initStores = (componentContext, routeHandler) => {
  let linkCollection = [
    new Link(routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
    new Link(routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
    new Link(routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
  ]

  console.log(linkCollection[2])
  return componentContext.addStore(
    new Store(
      NAVBAR_STORE,
      new InMemoryStorage(
        new State(NAVBAR_STORE, new NavbarStore(linkCollection, 0)),
        new NavbarStore()
      )
    )
  )
}
