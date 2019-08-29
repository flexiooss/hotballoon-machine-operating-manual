import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck} from '@flexio-oss/hotballoon'

export class ActionModifyCounterMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionModifyCounter>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionModifyCounterMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionModifyCounterMaker:init: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter,
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
        dispatcher
      )
    )
    return new ActionModifyCounterMaker(action)
  }

  /**
   *
   * @param {Store<StoreCounter>} storeCounter
   * @returns {this}
   */
  listen(storeCounter) {
    assertType(TypeCheck.isStore(storeCounter),
      'ActionModifyCounterMaker:listen: `store` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionModifyCounterMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
     *
     * @param {ActionModifyCounter} payload
     */
      (payload) => {
        let result = storeCounter.state().data.count() + payload.sum()
        storeCounter.set(
          storeCounter.state().data.withCount(result < 0 ? 0 : result)
        )
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionModifyCounter>}
   */
  action() {
    return this.__action
  }
}
