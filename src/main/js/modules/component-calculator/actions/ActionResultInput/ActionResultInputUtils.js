import { assertType, FLEXIO_IMPORT_OBJECT, isNull } from 'flexio-jshelpers'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from 'hotballoon'
import '../../generated/io/package'
import {Job} from '../../component/cunsumers/JobResult'

const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_calculator.actions.ActionResultInput

export class ActionResultInputUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {Store} store
   * @param {PublicStoreHandler} storeHandler
   * @param transactionActionDispatcher
   * @param ID
   * @param executor
   */
  constructor(dispatcher, store, storeHandler, transactionActionDispatcher, ID, executor) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionResultInputUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isStore(store),
      'ActionResultInputUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isPublicStoreHandler(storeHandler),
      'ActionResultInputUtils:constructor: `storeHandler` should be a PublicStoreHandler'
    )

    this.__dispatcher = dispatcher
    this.__action = null
    this.__store = store
    this.__storeHandler = storeHandler
    this.__transactionActionDispatcher = transactionActionDispatcher
    this.__ID = ID
    this.__executor = executor
  }

  /**
   *
   * @returns {ActionResultInputUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionResultInput,
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
        this.__dispatcher
      )
    )
    return this
  }

  /**
   *
   * @returns {ActionResultInputUtils}
   */
  listen() {
    assertType(!isNull(this.__action),
      'ActionResultInputUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback((payload) => {
      if (this.__storeHandler.data().operator() === '/' && this.__storeHandler.data().rexp() === '0') {
        this.__store.set(
          this.__store.state().data.withRexp('').withOperator('').withLexp('')
        )
      } else {
        if (this.__storeHandler.data().lexp() !== '' &&
          this.__storeHandler.data().rexp() !== '' &&
          this.__storeHandler.data().operator() !== '') {
          this.__executor.process(
            new Job(payload,
              this.__action,
              this.__store,
              this.__storeHandler,
              this.__transactionActionDispatcher,
              this.__ID
            )
          )
        }
      }
    })
    return this
  }

  /**
   *
   * @returns {Action<ActionResultInput>}
   */
  action() {
    return this.__action
  }
}
