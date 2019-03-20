import {InMemoryStoreParams, StoreBuilder, StoreTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {StoreResult}
 */
const StoreResult = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.stores.StoreResult
const StoreResultBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.stores.StoreResultBuilder

/**
 *
 * @param {ComponentContext} componentContext
 * @returns {Store}
 */
export const initStoreResult = (componentContext) => {
  return componentContext.addStore(StoreBuilder.InMemory(
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
}
