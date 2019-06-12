import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from '@flexio-oss/hotballoon'

const ActionModifyCounter = globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter

export class ActionModifyCounterUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Store} store
   */
  constructor(dispatcher, store) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionModifyCounterUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionModifyCounterUtils:constructor: `store` should be a Store'
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
          ActionModifyCounter,
          /**
           *
           * @param {ActionModifyCounter} data
           * @return {ActionModifyCounter}
           */
          (data) => {
            if (isNull(data.sum())) {
              return data.withSum(0)
            }
            return data
          },
          /**
           *
           * @param {ActionModifyCounter} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.sum())
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
      'ActionModifyCounterUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      let result = this.__store.state().data.count() + payload.sum()
      this.__store.set(this.__store.state().data.withCount(result < 0 ? 0 : result))
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
