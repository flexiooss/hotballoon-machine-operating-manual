import { assertType, FLEXIO_IMPORT_OBJECT, isNull } from 'flexio-jshelpers'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from 'hotballoon'
import '../../generated/io/package'

const ActionOperatorInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionOperatorInput
const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionResultInput

export class ActionOperatorInputUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Store} store
   * @param {PublicStoreHandler} storeHandler
   * @param {Action} actionResult
   */
  constructor(dispatcher, store, storeHandler, actionResult) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionOperatorInputUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionOperatorInputUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isPublicStoreHandler(storeHandler),
      'ActionOperatorInputUtils:constructor: `storeHandler` should be a PublicStoreHandler'
    )
    assertType(TypeCheck.isAction(actionResult),
      'ActionOperatorInputUtils:constructor: `actionResult` should be an Action'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__actionResult = actionResult
    this.__store = store
    this.__storeHandler = storeHandler
  }

  /**
   *
   * @returns {ActionOperatorInputUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionOperatorInput,
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
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionOperatorInputUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionOperatorInputUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      if (this.__storeHandler.data().lexp() !== '') {
        if (this.__storeHandler.data().operator() === '') {
          this.__store.set(
            this.__store.state().data.withOperator(
              payload.operator()
            )
          )
        } else {
          this.__actionResult.dispatch(
            new ActionResultInput(payload.operator())
          )
        }
      }
    })
    return this
  }

  /**
   *
   * @returns {Action}
   */
  action() {
    return this.__action
  }
}
