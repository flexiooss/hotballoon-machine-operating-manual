import {State, InMemoryStorage} from 'hotballoon'
import {NAVBAR_STORE, DataNavbarStore} from '../stores/DataNavbarStore'
import {Link} from '../stores/Link'
import {NavbarStore} from '../stores/NavbarStore'

/**
 *
 * @param componentContext
 * @param {PublicRouteHandler} routeHandler
 * @return {NavbarStore}
 */
export const initStores = (componentContext, routeHandler) => {
  let linkCollection = [
    new Link(routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
    new Link(routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
    new Link(routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
  ]

  console.log(linkCollection[2])
  return componentContext.addStore(
    new NavbarStore(
      NAVBAR_STORE,
      new InMemoryStorage(
        new State(NAVBAR_STORE, new DataNavbarStore(linkCollection, 0)),
        new DataNavbarStore()
      )
    )
  )
}
