import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'

export class ActionNumberInputMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionNumberInput>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionNumberInputMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionNumberInputUtils:init: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_calculator.actions.ActionNumberInput,
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
        dispatcher
      )
    )
    return new ActionNumberInputMaker(action)
  }

  /**
   *
   * @param {Store<StoreResult>} storeResult
   * @returns {this}
   */
  listen(storeResult) {
    assertType(TypeCheck.isStore(storeResult),
      'ActionNumberInputUtils:listen: `store` should be a Store'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionNumberInput} payload
       */
      (payload) => {
        if (storeResult.state().data.operator() === '') {
          storeResult.set(
            storeResult.state().data.withLexp(
              storeResult.state().data.lexp().concat(payload.number()).toString()
            )
          )
        } else {
          storeResult.set(
            storeResult.state().data.withRexp(
              storeResult.state().data.rexp().concat(payload.number())
            )
          )
        }
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionNumberInput>}
   */
  action() {
    return this.__action
  }
}
