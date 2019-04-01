import {ProxyStoreParams, StoreBuilder, StoreTypeParam} from 'hotballoon'
import {StoreInputText} from './StoreInputText'

/**
 *
 * @param {ModuleInputNumber} view
 * @returns {Store}
 */
export const initStoreInputText = (view) => {
  return StoreBuilder.Proxy(
    new ProxyStoreParams(
      new StoreTypeParam(
        StoreInputText,
        /**
         *
         * @param {StoreInputText} data
         * @return {StoreInputText}
         */
        (data) => {
          return data
        },
        /**
         *
         * @param {StoreInputText} data
         * @return {boolean}
         */
        (data) => {
          return true
        },
        /**
         *
         * @param {Object} obj
         * @return {StoreInputText}
         */
        (obj) => obj
      ),
      view.__store,
      view.__mapper
    )
  )
}
