import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreCounterMaker {
  /**
   *
   * @private
   * @param {Store<StoreCounter>} store
   * @param {PublicStoreHandler<StoreCounter>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {ActionTransactionMaker}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreResultUtils:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.component_counter.stores.StoreCounter,
          /**
           *
           * @param {StoreCounter} data
           * @return {StoreCounter}
           */
          (data) => {
            if (isNull(data.count())) {
              return data.withCount(0)
            }
            return data
          },
          /**
           *
           * @param {StoreCounter} data
           * @return {boolean}
           */
          (data) => {
            return !isNull(data.count())
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreCounter}
           */
          (obj) => globalFlexioImport.io.flexio.component_counter.stores.StoreCounterBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.component_counter.stores.StoreCounterBuilder().count(0).build()
      )
    ))
    let storePublic = new PublicStoreHandler(store)
    return new StoreCounterMaker(store, storePublic)
  }
  
  /**
   *
   * @returns {Store<StoreCounterBuilder>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {StoreHandlerCounter<StoreCounterBuilder>}
   */
  storePublic() {
    return this.__storePublic
  }
}
