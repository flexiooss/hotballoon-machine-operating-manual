'use strict'
import {isNode, assert} from 'flexio-jshelpers'
import {DispatcherEventListenerFactory, TypeCheck} from 'hotballoon'
import {AppInitializedAction} from '../actions/AppInitializedAction'
import {InitDocComponent} from './InitDocComponent'
import {ChangeRouteAction} from '../actions/ChangeRouteAction'
import {ChangeRouteDocAction} from '../../DocComponent/actions/ChangeRouteDocAction'
import {ChangeRouteDocPayload} from '../../DocComponent/actions/ChangeRouteDocPayload'

export class MainComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   */
  constructor(componentContext, parentNode) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    /**
     * @name CounterComponent#_componentContext
     * @type {ComponentContext}
     */
    Object.defineProperty(this, '_componentContext', {
      value: componentContext,
      enumerable: false,
      configurable: false
    })
    this.initMain()
    this._setParentNode(parentNode)
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @return {MainComponent}
   * @static
   */
  static create(componentContext, parentNode) {
    return new this(componentContext, parentNode)
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this._componentContext
  }

  /**
   *
   * @param {Node} parentNode
   * @private
   */
  _setParentNode(parentNode) {
    assert(!!isNode(parentNode),
      'MainComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    Object.defineProperty(this, '_parentNode', {
      enumerable: false,
      value: parentNode
    })
  }

  /**
   *
   * @return {MainComponent}
   */
  initMain() {
    this.componentContext.listenAction(
      DispatcherEventListenerFactory.listen(new AppInitializedAction())
        .callback(
          (payload) => {
            InitDocComponent.create(payload, this.componentContext.APP(), this._parentNode)
          })
        .build()
    )

    this.componentContext.listenAction(
      DispatcherEventListenerFactory.listen(
        new ChangeRouteAction())
        .callback((payload) => {
          if (payload.route === 'Doc') {
            this.componentContext.dispatchAction(
              ChangeRouteDocAction.withPayload(
                new ChangeRouteDocPayload(payload.option.component, payload.option.option)
              )
            )
          }
        })
        .build()
    )
    return this
  }
}
