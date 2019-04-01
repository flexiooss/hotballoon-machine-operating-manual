import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck} from 'hotballoon'
import {assertType, FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'
import {StoreHandlerCounter} from './StoreHandlerCounter'

const StoreCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.stores.StoreCounter
const StoreCounterBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.stores.StoreCounterBuilder

export class StoreCounterUtils {
  constructor(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreResultUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__componentContext = componentContext
    this.__store = null
    this.__storePublic = null
  }

  /**
   *
   * @returns {StoreCounterUtils}
   */
  build() {
    this.__store = this.__componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          StoreCounter,
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
          (obj) => StoreCounterBuilder.fromObject(obj).build()
        ),
        new StoreCounterBuilder().count(0).build()
      )
    ))
    this.__storePublic = new StoreHandlerCounter(this.__store)
    return this
  }

  /**
   *
   * @returns {Store}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {StoreHandlerCounter}
   */
  storePublic() {
    return this.__storePublic
  }
}
