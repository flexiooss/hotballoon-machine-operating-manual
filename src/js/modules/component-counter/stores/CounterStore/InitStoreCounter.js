import {StoreBuilder, InMemoryStoreParams, StoreTypeParam} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {StoreCounter}
 */
const StoreCounter = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.stores.StoreCounter
const StoreCounterBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_counter.stores.StoreCounterBuilder

/**
 *
 * @param {ComponentContext} componentContext
 * @return {Store}
 */
export const initStoreCounter = (componentContext) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  return componentContext.addStore(StoreBuilder.InMemory(
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
}
