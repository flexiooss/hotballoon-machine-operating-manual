import {e, View} from '@flexio-oss/hotballoon'
import {initStoreInputText} from '../proxyStore/InitStoreInputText'
import {StoreHandlerInputText} from '../proxyStore/StoreHandlerInputText'

export class ModuleInputNumber extends View {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {StoreInterface} store
   * @param {function} mapper
   */
  constructor(viewContainer, store, mapper) {
    super(viewContainer)
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
