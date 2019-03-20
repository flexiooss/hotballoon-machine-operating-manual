import {StoreBuilder, InMemoryStoreParams, StoreTypeParam} from 'hotballoon'
import {StoreNavbar} from './StoreNavbar'
import {SchemaLink} from './SchemaLink'
import {isNull} from 'flexio-jshelpers'

/**
 *
 * @param {ComponentContext} componentContext
 * @param routeHandler
 * @return {StoreNavbar}
 */
export const initStoreNavbar = (componentContext, routeHandler) => {
  let linkCollection = [
    new SchemaLink(routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
    new SchemaLink(routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
    new SchemaLink(routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
  ]

  return componentContext.addStore(StoreBuilder.InMemory(
    new InMemoryStoreParams(
      new StoreTypeParam(
        StoreNavbar,
        /**
         *
         * @param {StoreNavbar} data
         * @return {StoreNavbar}
         */
        (data) => {
          return data
        },
        /**
         *
         * @param {StoreNavbar} data
         * @return {boolean}
         */
        (data) => {
          return true
        },
        /**
         *
         * @param {Object} obj
         * @return {StoreCounter}
         */
        (obj) => null
      ),
      new StoreNavbar(linkCollection, 0)
    )
  ))
}
