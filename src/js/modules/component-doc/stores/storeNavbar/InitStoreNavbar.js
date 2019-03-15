import {StoreBuilder, InMemoryStoreParams} from 'hotballoon'
import {StoreNavbar} from './StoreNavbar'
import {SchemaLink} from './SchemaLink'

/**
 *
 * @param {DocComponent} component
 * @return {StoreNavbar}
 */
export const initStoreNavbar = (component) => {
  let linkCollection = [
    new SchemaLink(component.__routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
    new SchemaLink(component.__routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
    new SchemaLink(component.__routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
  ]

  const navbarStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreNavbar,
      (data) => {
        return data instanceof StoreNavbar
      },
      new StoreNavbar(linkCollection, 0)
    )
  )

  component.__componentContext.addStore(navbarStore)
  return navbarStore
}
