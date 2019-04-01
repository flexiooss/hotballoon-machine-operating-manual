import {e, StoreBuilder, View} from 'hotballoon'
import {initStoreInputText} from '../proxyStore/InitStoreInputText'
import {StoreHandlerInputText} from '../proxyStore/StoreHandlerInputText'

export class ModuleInputNumber extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {StoreInterface} store
   * @param {function} mapper
   */
  constructor(viewParameters, store, mapper) {
    super(viewParameters)
    this.__store = store
    this.__mapper = mapper
    this.__storeInputText = initStoreInputText(this)
    this.subscribeToStore(this.__storeInputText)
    this.__storeHandlerInputText = new StoreHandlerInputText(this.__storeInputText)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('input#inputText.inputText')
        .attributes({ type: 'text', value: this.__storeHandlerInputText.text, readOnly: true })
    )
  }
}
