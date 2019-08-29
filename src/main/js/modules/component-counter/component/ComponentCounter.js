'use strict'
import '../import'
import {isNode, assert, isBoolean} from '@flexio-oss/assert'
import {TypeCheck, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ActionModifyCounterMaker} from '../actions/ActionModifyCounterMaker'
import {StoreCounterMaker} from '../stores/StoreCounterMaker'
import {CounterActionManager} from '../views/utils/CounterActionManager'
import {CounterStoreManager} from '../views/utils/CounterStoreManager'
import {ViewContainerCounter} from '../views/ViewContainerCounter'

export class ComponentCounter {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {boolean} withSubView
   */
  constructor(componentContext, withSubView) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof componentContext
    )

    assert(!!isBoolean(withSubView),
      'component-counter:constructor: `mode` argument should be Boolean, %s given',
      typeof withSubView)

    this.__componentContext = componentContext
    this.__withSubView = withSubView
    this.__actionModifyCounter = ActionModifyCounterMaker.create(this.__componentContext.dispatcher())
    this.__counterStore = StoreCounterMaker.create(this.__componentContext)

    this.__actionModifyCounter.listen(this.__counterStore.store())
  }

  /**
   *
   * @param {Element} parentNode
   * @returns {this}
   */
  mountView(parentNode) {
    assert(!!isNode(parentNode),
      'component-counter:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode
    )
    this.__viewContainer = new ViewContainerCounter(
      new ViewContainerParameters(
        this.__componentContext,
        this.__componentContext.nextID(),
        parentNode
      ),
      new CounterStoreManager(this.__counterStore.storePublic()),
      new CounterActionManager(this.__actionModifyCounter.action()),
      this.__withSubView
    )
    this.__componentContext.addViewContainer(this.__viewContainer)
    this.__viewContainer.renderAndMount()
    return this
  }

  /**
   *
   * @returns {this}
   */
  unmountView() {
    assert(TypeCheck.isViewContainer(this.__viewContainer),
      'ComponentDoc:unmountView: `viewContainer` should be a instanciate before using it'
    )
    this.__componentContext.removeViewContainer(this.__viewContainer.ID)

    return this
  }

  /**
   *
   * @return {ComponentContext}
   */
  componentContext() {
    return this.__componentContext
  }

  /**
   *
   * @return {Store<StoreCounter>}
   */
  counterStore() {
    return this.__counterStoreHandler
  }
}
