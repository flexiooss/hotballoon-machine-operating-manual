import {assertType, isNode, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'
import {ComponentDocBuilder} from '../../component-doc/ComponentDocBuilder'

export class ActionInitializeMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionInitialize>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionInitializeMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitializeMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_main.actions.ActionInitialize,
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
        dispatcher
      )
    )
    return new ActionInitializeMaker(action)
  }

  /**
   *
   * @param {HotBalloonApplication} app
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {RouterActionDispatcher} routerActionDispatcher
   * @param {ExecutorInterface} executor
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @returns {this}
   */
  listen(app, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isHotballoonApplication(app),
      'ActionInitializeMaker:listen: `app` should be a HotballoonApplication'
    )
    assertType(isNode(parentNode),
      'ActionInitializeMaker:listen: `parentNode` should be a Node'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionInitialize} payload
       */
      (payload) => {
        ComponentDocBuilder.build(
          payload,
          app,
          routeHandler,
          routerActionDispatcher,
          executor,
          transactionActionDispatcher
        )
          .mountView(parentNode)
          .dispatchActionInitialize('counter', 'simple')
      }
    )
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionInitialize>}
   */
  action() {
    return this.__action
  }
}
