import {InMemoryStoreParams, StoreBuilder} from 'hotballoon'
import {FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {StoreResult}
 */
const StoreResult = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.StoreResult

/**
 *
 * @param {ComponentTransaction} component
 * @returns {Store}
 */
export const initStoreResult = (component) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  const resultStore = StoreBuilder.InMemory(
    new InMemoryStoreParams(
      StoreResult,
      (data) => {
        return data instanceof StoreResult
      },
      new StoreResult('', '', '')
    )
  )

  component.__componentContext.addStore(resultStore)
  return resultStore
}
