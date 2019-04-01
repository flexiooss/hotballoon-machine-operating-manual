import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck} from 'hotballoon'
import {assertType, FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'
import {StoreHandlerResult} from './StoreHandlerResult'

const StoreResult = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.stores.StoreResult
const StoreResultBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.stores.StoreResultBuilder

export class StoreResultUtils {
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
   * @returns {StoreResultUtils}
   */
  build() {
    this.__store = this.__componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          StoreResult,
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
          (obj) => StoreResultBuilder.fromObject(obj).build()
        ),
        new StoreResultBuilder().lexp('').operator('').rexp('').build()
      )
    ))
    this.__storePublic = new StoreHandlerResult(this.__store)
    return this
  }

  /**
   *
   * @returns {StoreResult}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {StoreHandlerResult}
   */
  storePublic() {
    return this.__storePublic
  }
}
