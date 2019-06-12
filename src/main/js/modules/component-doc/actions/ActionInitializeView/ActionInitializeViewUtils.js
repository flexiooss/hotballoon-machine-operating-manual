import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from '@flexio-oss/hotballoon'
import {StoreNavbar} from '../../stores/storeNavbar/StoreNavbar'

const ActionInitializeView = globalFlexioImport.io.flexio.component_doc.actions.ActionInitializeView

export class ActionInitializeViewUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param store
   */
  constructor(dispatcher, store) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitializeViewUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionInitializeViewUtils:constructor: `store` should be a Store'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__store = store
  }

  /**
   *
   * @returns {ActionModifyCounterUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionInitializeView,
          /**
           *
           * @param {ActionInitialize} data
           * @return {ActionInitialize}
           */
          (data) => {
            if (isNull(data.message)) {
              return data.withMessage('Default message')
            }
            return data
          },
          /**
           *
           * @param {ActionInitialize} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.message)
          }
        ),
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionModifyCounterUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionInitializeViewUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      let selected = -1
      if (payload.component() === 'counter') {
        if (payload.option() === 'simple') {
          selected = 0
        } else if (payload.option() === 'subview') {
          selected = 1
        }
      } else if (payload.component() === 'calculator') {
        selected = 2
      }
      this.__store.set(new StoreNavbar(this.__store.state().data.linkCollection, selected))
    })
    return this
  }

  /**
   *
   * @returns {Action<ActionModifyCounter>}
   */
  action() {
    return this.__action
  }
}
