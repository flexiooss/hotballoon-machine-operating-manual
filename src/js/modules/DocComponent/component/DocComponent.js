'use strict'
import {DispatcherEventListenerFactory, ViewContainerParameters} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'

import {AppInitializedAction} from '../../MainComponent/actions/AppInitializedAction'
import {InitCounterComponent} from './InitCounterComponent'
import {DocContainer, DocContainerStoresParameters} from '../views/Doc.container'
import {InitCalculatorComponent} from './InitCalculatorComponent'
import {Route} from 'flexio-jsrouter/src/Route/Route'
import {initStores} from './initStores'
import {HandlerNavbarStore} from '../stores/HandlerNavbarStore'
import {DataNavbarStore} from '../stores/DataNavbarStore'

export class DocComponent {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   */
  constructor(componentContext, parentNode, routeHandler, changeRoute) {
    assert(!!isNode(parentNode),
      'RouterComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    this.__componentContext = componentContext
    this.__parentNode = parentNode
    this.__routeHandler = routeHandler
    this.__viewContainerID = this.__componentContext.nextID()
    this.__changeRoute = changeRoute
    this.__initDocRoute()
    this.__navbarStore = initStores(this.__componentContext, this.__routeHandler)
    this.__navbarStoreHandler = new HandlerNavbarStore(this.__navbarStore)
    this.createRenderMountView()
    this.__initDispatcherListeners()
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @param {PublicRouteHandler} routeHandler
   * @param {function} changeRoute
   * @return {DocComponent}
   * @constructor
   * @static
   */
  static create(componentContext, parentNode, routeHandler, changeRoute) {
    return new this(componentContext, parentNode, routeHandler, changeRoute)
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }

  createRenderMountView() {
    this.__addDocViewContainer().renderAndMount(this.__parentNode)
  }

  __addDocViewContainer() {
    return this.__componentContext.addViewContainer(
      new DocContainer(
        new ViewContainerParameters(
          this.__componentContext,
          this.__viewContainerID,
          this.__parentNode
        ),
        new DocContainerStoresParameters(this.__navbarStoreHandler),
        this.__changeRoute
      )
    )
  }

  /**
   *
   * @private
   */
  __initDispatcherListeners() {
    console.log(this.__componentContext.viewContainer(this.__viewContainerID))
    this.__componentContext.listenAction(
      /**
       * @param {AppActionPayload} payload
       */
      DispatcherEventListenerFactory.listen(new AppInitializedAction())
        .callback(
          (payload) => {
            InitCounterComponent.create(
              payload,
              this.__componentContext.APP(),
              this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
              new CounterViewModeParameterObject('simple')
            )
          })
        .build()
    )
  }

  __initDocRoute() {
    const docRoute = new Route(
      'doc',
      '/doc/{component}/{option}',
      obj => Object.assign({}, obj),
      (params) => {
        let selected = -1
        if (params.component === 'counter') {
          InitCounterComponent.create(
            null,
            this.__componentContext.APP(),
            this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode(),
            new CounterViewModeParameterObject(params.option)
          )
          if (params.option === 'simple') {
            selected = 0
          } else if (params.option === 'subview') {
            selected = 1
          }
        } else {
          InitCalculatorComponent.create(
            null,
            this.__componentContext.APP(),
            this.__componentContext.viewContainer(this.__viewContainerID).getDemoNode())
          selected = 2
        }
        this.__navbarStore.set(new DataNavbarStore(this.__navbarStore.data().linkCollection, selected))
      }
    )
    this.__routeHandler.addRoute(docRoute)
  }
}

export class CounterViewModeParameterObject {
  constructor(option) {
    this.option = option
  }
}
