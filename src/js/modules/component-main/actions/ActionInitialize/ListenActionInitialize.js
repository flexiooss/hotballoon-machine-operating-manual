import {InitDocComponent} from '../../../component-doc/component/InitDocComponent'
import {TypeCheck} from 'hotballoon'
import {isNode, assertType} from 'flexio-jshelpers'
import {ComponentDoc} from '../../../component-doc'
import {ComponentDocBuilder} from '../../../component-doc/component/ComponentDocBuilder'

export class ListenActionInitializeParams {
  constructor(actionInitialize, app, parentNode, routeHandler, routerActionDispatcher, executor, transactionActionDispatcher) {
    assertType(TypeCheck.isAction(actionInitialize),
      'ComponentMain:ListenActionInitializeParams: actionInitialize should be an action'
    )
    assertType(TypeCheck.isHotballoonApplication(app),
      'ComponentMain:ListenActionInitializeParam: `app` should be a HotBalloonApplication'
    )
    assertType(isNode(parentNode),
      'ComponentMain:ListenActionInitializeParam: `parentNode` should be an Element'
    )
    this.actionInitialize = actionInitialize
    this.app = app
    this.parentNode = parentNode
    this.routeHandler = routeHandler
    this.routerActionDispatcher = routerActionDispatcher
    this.executor = executor
    this.transactionActionDispatcher = transactionActionDispatcher
  }
}

/**
 *
 * @param {ListenActionInitializeParams} params
 */
export const listenActionInitialize = (params) => {
  assertType(params instanceof ListenActionInitializeParams,
    'ComponentMain:listenActionInitialize: `params` should be ListenActionInitializeParams'
  )

  params.actionInitialize
    .listenWithCallback(
      /**
       *
       * @param {ActionInitialize} payload
       */
      (payload) => {
        ComponentDocBuilder.build(
          payload,
          params.app,
          params.parentNode,
          params.routeHandler,
          params.routerActionDispatcher,
          params.executor,
          params.transactionActionDispatcher
        ).initAndMount().dispatchActionInitialize()
      }
    )
}
