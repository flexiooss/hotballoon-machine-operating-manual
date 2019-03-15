import {ProxyStoreParams, StoreBuilder} from 'hotballoon'
import {StoreInputText} from './StoreInputText'

/**
 *
 * @param {ModuleInputNumber} view
 * @returns {Store}
 */
export const initStoreInputText = (view) => {
  /**
   *
   * @type {Store<StoreCounter>}
   */
  console.log(view.__store.state().data)
  const resultStore = StoreBuilder.Proxy(
    new ProxyStoreParams(
      StoreInputText,
      (data) => {
        return data instanceof StoreInputText
      },
      view.__store,
      view.__mapper
    )
  )
  view.subscribeToStore(resultStore)
  return resultStore
}
