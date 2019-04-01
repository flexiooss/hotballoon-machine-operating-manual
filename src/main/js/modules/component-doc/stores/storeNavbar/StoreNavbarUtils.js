import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck} from 'hotballoon'
import {assertType} from 'flexio-jshelpers'
import {StoreNavbar} from './StoreNavbar'
import {SchemaLink} from './SchemaLink'
import {StoreHandlerNavbar} from './StoreHandlerNavbar'

export class StoreNavbarUtils {
  constructor(componentContext, routeHandler) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreCounterUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__componentContext = componentContext
    this.__store = null
    this.__storePublic = null
    this.__routeHandler = routeHandler
  }

  /**
   *
   * @returns {StoreNavbarUtils}
   */
  build() {
    let linkCollection = [
      new SchemaLink(this.__routeHandler.url('doc', {component: 'counter', option: 'simple'}), 'starter'),
      new SchemaLink(this.__routeHandler.url('doc', {component: 'counter', option: 'subview'}), 'sub view'),
      new SchemaLink(this.__routeHandler.url('doc', {component: 'calculator', option: 'default'}), 'calculatrice')
    ]
    this.__store = this.__componentContext.addStore(StoreBuilder.InMemory(
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
    this.__storePublic = new StoreHandlerNavbar(this.__store)
    return this
  }

  store() {
    return this.__store
  }

  storePublic() {
    return this.__storePublic
  }
}
