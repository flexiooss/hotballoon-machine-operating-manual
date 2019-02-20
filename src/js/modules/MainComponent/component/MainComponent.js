'use strict'
import {isNode, assert} from 'flexio-jshelpers'
import {ComponentContext, DispatcherEventListenerFactory, TypeCheck} from 'hotballoon'
import {AppInitializedAction} from '../actions/AppInitializedAction'
import {InitDocComponent} from './InitDocComponent'
import {RouterComponent} from '../../_ComponentRouter'

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
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__changeRoute = RouterComponent.changeRoute
    this.__routeHandler = RouterComponent.create(
      this.componentContext.APP().addComponentContext(
        new ComponentContext(this.componentContext.APP())
      )
    ).routeHandler
    this.__initDocComponent()
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
    return this.__componentContext
  }

  /**
   *
   * @private
   */
  __initDocComponent() {
    this.componentContext.listenAction(
      DispatcherEventListenerFactory.listen(new AppInitializedAction())
        .callback(
          (payload) => {
            InitDocComponent.create(
              payload,
              this.componentContext.APP(),
              this.__parentNode,
              this.__routeHandler,
              this.__changeRoute
            )
          })
        .build()
    )
  }
}
