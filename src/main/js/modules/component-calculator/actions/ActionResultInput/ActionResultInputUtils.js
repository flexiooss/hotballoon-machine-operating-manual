import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from '@flexio-oss/hotballoon'
import {Job} from '../../component/cunsumers/JobResult'

const ActionResultInput = globalFlexioImport.io.flexio.component_calculator.actions.ActionResultInput

export class ActionResultInputUtils {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Store} store
   * @param {PublicStoreHandler} storeHandler
   * @param transactionActionDispatcher
   * @param executor
   */
  constructor(componentContext, store, storeHandler, transactionActionDispatcher, executor) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ActionResultInputUtils:constructor: `componentContext` should be a ComponentContext'
    )
    assertType(TypeCheck.isStore(store),
      'ActionResultInputUtils:constructor: `store` should be a Store'
    )
    assertType(TypeCheck.isPublicStoreHandler(storeHandler),
      'ActionResultInputUtils:constructor: `storeHandler` should be a PublicStoreHandler'
    )

    this.__componentContext = componentContext
    this.__action = null
    this.__store = store
    this.__storeHandler = storeHandler
    this.__transactionActionDispatcher = transactionActionDispatcher
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
        this.__componentContext.dispatcher()
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
              this.__componentContext.nextID()
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
