import {State, InMemoryStorage} from 'hotballoon'
import {StoreNavbar} from '../../stores/StoreNavbar'
import {StoreDataNavbar, NAVBAR_STORE} from '../../stores/StoreDataNavbar'
import {SchemaLink} from '../../stores/SchemaLink'

/**
 *
 * @param {DocComponent} component
 * @return {StoreNavbar}
 */
export const addStoreNavbar = (component) => {
  let linkCollection = [
    new SchemaLink(component.__routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
    new SchemaLink(component.__routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
    new SchemaLink(component.__routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
  ]

  return component.__componentContext.addStore(
    new StoreNavbar(
      NAVBAR_STORE,
      new InMemoryStorage(
        new State(NAVBAR_STORE, new StoreDataNavbar(linkCollection, 0)),
        new StoreDataNavbar()
      )
    )
  )
}
