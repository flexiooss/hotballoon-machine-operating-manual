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
   * @param {ExecutorInterface} executor
   */
  constructor(componentContext, parentNode, executor) {
    assert(
      TypeCheck.isComponentContext(componentContext),
      'BootstrapComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__executor = executor
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
   * @param {ExecutorInterface} executor
   * @return {MainComponent}
   * @static
   */
  static create(componentContext, parentNode, executor) {
    return new this(componentContext, parentNode, executor)
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
              this.__changeRoute,
              this.__executor
            )
          })
        .build()
    )
  }
}
