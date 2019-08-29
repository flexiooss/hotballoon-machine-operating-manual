import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'

export class ActionOperatorInputMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionOperatorInput>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionOperatorInputMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionOperatorInputMaker:init: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_calculator.actions.ActionOperatorInput,
          /**
           *
           * @param {ActionOperatorInput} data
           * @return {ActionOperatorInput}
           */
          (data) => {
            if (isNull(data.operator())) {
              return data.withOperator('')
            }
            return data
          },
          /**
           *
           * @param {ActionOperatorInput} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.operator())
          }
        ),
        dispatcher
      )
    )
    return new ActionOperatorInputMaker(action)
  }

  /**
   *
   * @param {Store<StoreResult>} storeResult
   * @param {ActionDispatcher} actionResult
   * @returns {this}
   */
  listen(storeResult, actionResult) {
    assertType(TypeCheck.isStore(storeResult),
      'ActionOperatorInputMaker:listen: `store` should be a Store'
    )
    assertType(TypeCheck.isActionDispatcher(actionResult),
      'ActionOperatorInputMaker:listen: `actionResult` should be an Action'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionOperatorInput} payload
       */
      (payload) => {
        if (storeResult.state().data.lexp() !== '') {
          if (storeResult.state().data.operator() === '') {
            storeResult.set(
              storeResult.state().data.withOperator(payload.operator())
            )
          } else {
            actionResult.dispatch(
              new globalFlexioImport.io.flexio.component_calculator.actions.ActionResultInput(
                payload.operator()
              )
            )
          }
        }
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionOperatorInput>}
   */
  action() {
    return this.__action
  }
}
