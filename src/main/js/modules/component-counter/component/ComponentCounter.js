'use strict'
import {isNode, assert, isBoolean} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {ActionModifyCounterUtils} from '../actions/ActionModifyCounter/ActionModifyCounterUtils'
import {StoreCounterUtils} from '../stores/CounterStore/StoreCounterUtils'
import {ViewContainerCounterUtils} from '../views/counter/ViewContainerCounterUtils'

export class ComponentCounter {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {boolean} withSubView
   */
  constructor(componentContext, parentNode, withSubView) {
    assert(!!isNode(parentNode),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    assert(
      TypeCheck.isComponentContext(componentContext),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    assert(!!isBoolean(withSubView),
      'component-counter:constructor: `mode` argument should be Boolean, %s given',
      typeof withSubView)

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__withSubView = withSubView
    this.__actionModifyCounter = null
    this.__counterStore = null
    this.__viewContainer = null

    this.__addStoreCounter()
    this.__addActionModifyCounter()
  }

  /**
   *
   * @returns {ComponentCounter}
   * @private
   */
  __addActionModifyCounter() {
    this.__actionModifyCounter = new ActionModifyCounterUtils(
      this.__componentContext.dispatcher(),
      this.__counterStore.store()
    ).init().listen()
    return this
  }

  /**
   *
   * @returns {ComponentCounter}
   * @private
   */
  __addStoreCounter() {
    this.__counterStore = new StoreCounterUtils(this.__componentContext).build()
    return this
  }

  /**
   *
   * @returns {ComponentCounter}
   */
  mountView() {
    this.__viewContainer = new ViewContainerCounterUtils(
      this.__componentContext,
      this.__parentNode,
      this.__actionModifyCounter.action(),
      this.__counterStore.storePublic(),
      this.__withSubView
    ).init()
    return this
  }

  /**
   *
   * @returns {ComponentCounter}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer.viewContainer()),
      'ComponentDoc:unmountView: `viewContainer` should be a instanciate before use it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID())

    return this
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }

  /**
   *
   * @return {Store}
   */
  get counterStore() {
    return this.__counterStoreHandler
  }
}
