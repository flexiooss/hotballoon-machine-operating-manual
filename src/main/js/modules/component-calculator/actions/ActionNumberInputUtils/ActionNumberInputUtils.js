import { assertType, FLEXIO_IMPORT_OBJECT, isNull } from 'flexio-jshelpers'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from 'hotballoon'
import '../../generated/io/package'

const ActionNumberInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionNumberInput

export class ActionNumberInputUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Store} store
   * @param {PublicStoreHandler} storeHandler
   */
  constructor(dispatcher, store, storeHandler) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionNumberInputUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionNumberInputUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isPublicStoreHandler(storeHandler),
      'ActionNumberInputUtils:constructor: `storeHandler` should be a PublicStoreHandler'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__store = store
    this.__storeHandler = storeHandler
  }

  /**
   *
   * @returns {ActionNumberInputUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionNumberInput,
          /**
           *
           * @param {ActionNumberInput} data
           * @return {ActionNumberInput}
           */
          (data) => {
            if (isNull(data.number())) {
              return data.withNumber('')
            }
            return data
          },
          /**
           *
           * @param {ActionNumberInput} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.number())
          }
        ),
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionNumberInputUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionNumberInputUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      if (this.__storeHandler.data().operator() === '') {
        this.__store.set(
          this.__store.state().data.withLexp(
            this.__storeHandler.data().lexp().concat(payload.number()).toString()
          )
        )
      } else {
        this.__store.set(
          this.__store.state().data.withRexp(
            this.__storeHandler.data().rexp().concat(payload.number())
          )
        )
      }
    })
    return this
  }

  /**
   *
   * @returns {Action<ActionNumberInput>}
   */
  action() {
    return this.__action
  }
}
