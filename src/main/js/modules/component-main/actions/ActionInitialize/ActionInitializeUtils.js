import {assertType, FLEXIO_IMPORT_OBJECT, isNode, isNull} from 'flexio-jshelpers'
import { ActionBuilder, ActionParams, ActionTypeParam, TypeCheck } from 'hotballoon'
import '../../generated/io/package'
import {ComponentDocBuilder} from '../../../component-doc/component/ComponentDocBuilder'

const ActionInitialize = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_main.actions.ActionInitialize

export class ActionInitializeUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {HotBalloonApplication} app
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   */
  constructor(dispatcher, app, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitializeUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isHotballoonApplication(app),
      'ActionInitializeUtils:constructor: `app` should be a HotballoonApplication'
    )
    assertType(isNode(parentNode),
      'ActionInitializeUtils:constructor: `parentNode` should be a Node'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__app = app
    this.__parentNode = parentNode
    this.__routeHandler = routeHandler
    this.__routerActionDispatcher = routerActionDispatcher
    this.__executor = executor
    this.__transactionActionDispatcher = transactionActionDispatcher
  }

  /**
   *
   * @returns {ActionModifyCounterUtils}
   */
  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionInitialize,
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
            return !isNull(payload.message())
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
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionInitialize} payload
       */
      (payload) => {
        ComponentDocBuilder.build(
          payload,
          this.__app,
          this.__parentNode,
          this.__routeHandler,
          this.__routerActionDispatcher,
          this.__executor,
          this.__transactionActionDispatcher
        ).mountView().dispatchActionInitialize('counter', 'simple')
      }
    )
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
