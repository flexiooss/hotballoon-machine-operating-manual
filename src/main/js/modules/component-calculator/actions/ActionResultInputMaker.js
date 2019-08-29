import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {JobResult} from '../jobs/JobResult'

export class ActionResultInputMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionResultInput>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionResultInputMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionResultInputMaker:init: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_calculator.actions.ActionResultInput,
          /**
           *
           * @param {ActionResultInput} data
           * @return {ActionResultInput}
           */
          (data) => {
            if (isNull(data.operator())) {
              return data.withOperator('')
            }
            return data
          },
          /**
           *
           * @param {ActionResultInput} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.operator())
          }
        ),
        dispatcher
      )
    )
    return new ActionResultInputMaker(action)
  }

  /**
   *
   * @param {Store<StoreResult>} storeResult
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {String} id
   * @returns {this}
   */
  listen(storeResult, transactionActionDispatcher, executor, id) {
    assertType(TypeCheck.isStore(storeResult),
      'ActionResultInputMaker:constructor: `store` should be a Store'
    )
    assertType(!isNull(this.__action),
      'ActionResultInputMaker:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionResultInput} payload
       */
      (payload) => {
        if (storeResult.state().data.operator() === '/' && this.__storeHandler.data().rexp() === '0') {
          storeResult.set(
            storeResult.state().data.withRexp('').withOperator('').withLexp('')
          )
        } else {
          if (storeResult.state().data.lexp() !== '' &&
            storeResult.state().data.rexp() !== '' &&
            storeResult.state().data.operator() !== '') {
            executor.process(
              new JobResult(
                payload,
                storeResult,
                transactionActionDispatcher,
                id
              )
            )
          }
        }
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionResultInput>}
   */
  action() {
    return this.__action
  }
}
