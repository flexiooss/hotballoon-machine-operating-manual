import {ComponentTransaction} from './ComponentTransaction'
import {ActionTransaction} from '../actions/ActionTransaction/ActionTransaction'

export class InitTransactionStoreComponent {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   */
  constructor(APP, parentNode) {
    this.__docComponent = ComponentTransaction.create(
      APP.addComponentContext(),
      parentNode
    ).setEventLoop().mountView()
  }

  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @return {InitMainComponent}
   * @constructor
   * @static
   */
  static create(APP, parentNode) {
    return new this(APP, parentNode)
  }

  transactionActionDispatcher() {
    return new TransactionActionDispatcher(this.__docComponent.__actionTransaction, ActionTransaction)
  }
}

class TransactionActionDispatcher {
  constructor(action, actionObject) {
    this.__action = action
    this.__actionObject = actionObject
  }

  actionTansaction(isActive) {
    this.__action.dispatch(new this.__actionObject(isActive))
  }
}
