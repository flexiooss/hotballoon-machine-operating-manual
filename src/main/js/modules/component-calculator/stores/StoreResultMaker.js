import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {assertType, isNull} from '@flexio-oss/assert'

export class StoreResultMaker {
  /**
   *
   * @private
   * @param {Store<StoreResult>} store
   * @param {PublicStoreHandler<StoreResult>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreResultMaker}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreResultUtils:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.component_calculator.stores.StoreResult,
          /**
           *
           * @param {StoreResult} data
           * @return {StoreResult}
           */
          (data) => {
            if (isNull(data.lexp()) || isNull(data.operator()) || isNull(data.rexp())) {
              return data.withLexp('').withOperator('').withRexp('')
            }
            return data
          },
          /**
           *
           * @param {StoreResult} data
           * @return {boolean}
           */
          (data) => {
            return !isNull(data.lexp()) && !isNull(data.operator()) && !isNull(data.rexp())
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreResult}
           */
          (obj) => globalFlexioImport.io.flexio.component_calculator.stores.StoreResultBuilder.fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.component_calculator.stores.StoreResultBuilder().lexp('').operator('').rexp('').build()
      )
    ))
    let storePublic = new PublicStoreHandler(store)
    return new StoreResultMaker(store, storePublic)
  }

  /**
   *
   * @returns {Store<StoreResult>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<StoreResult>}
   */
  storePublic() {
    return this.__storePublic
  }
}
