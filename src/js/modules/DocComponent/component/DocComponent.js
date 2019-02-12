'use strict'
import {DispatcherEventListenerFactory, ViewContainerParameters} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'

import {AppInitializedAction} from '../../MainComponent/actions/AppInitializedAction'
import {InitCounterComponent} from './InitCounterComponent'
import {DocContainer, DocContainerStores} from '../views/Doc.container'
import {InitCalculatorComponent} from './InitCalculatorComponent'
import {ChangeRouteDocAction} from '../actions/ChangeRouteDocAction'

export class DocComponent {
  constructor(componentContext, parentNode) {
    /**
     * @name CounterComponent#_componentContext
     * @type {ComponentContext}
     */
    Object.defineProperty(this, '_componentContext', {
      value: componentContext,
      enumerable: false,
      configurable: false
    })
    this._initDispatcherListeners()
    this._setParentNode(parentNode)
  }

  _setParentNode(parentNode) {
    assert(!!isNode(parentNode),
      'MainComponent:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    Object.defineProperties(this, {
      _parentNode: {
        enumerable: false,
        /**
         * @property {Node} _parentNode
         * @name DocComponent#_parentNode
         */
        value: parentNode
      }
    })
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Node} parentNode
   * @return {DocComponent}
   * @constructor
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

  createRenderMountView() {
    // this.viewContainer = this._addDocViewContainer()
    // this.viewContainer.renderAndMount(this._parentNode)
    this.viewContainer = this._addDocViewContainer()
    this.viewContainer.renderAndMount(this._parentNode)
  }

  _addDocViewContainer() {
    const DOC_VIEWCONTAINER_ID = this.componentContext.nextID()

    return this.componentContext.addViewContainer(
      new DocContainer(
        new ViewContainerParameters(
          this.componentContext,
          DOC_VIEWCONTAINER_ID,
          this._parentNode
        ),
        new DocContainerStores()
      )
    )
  }

  _initDispatcherListeners() {
    var eee = new CounterViewModeParameterObject('SIMPLE')
    console.log(eee)
    this.componentContext.listenAction(
      /**
       * @param {AppActionPayload} payload
       */
      DispatcherEventListenerFactory.listen(new AppInitializedAction())
        .callback(
          /**
           * @param {AppActionPayload} payload
           */
          (payload) => {
            InitCounterComponent.create(payload, this.componentContext.APP(), this.viewContainer.getDemoNode(), new CounterViewModeParameterObject('SIMPLE'))
          })
        .build()
    )

    this.componentContext.listenAction(
      DispatcherEventListenerFactory.listen(
        new ChangeRouteDocAction())
        .callback((payload) => {
          if (payload.component === 'Counter') {
            if (payload.option === 'SIMPLE') {
              InitCounterComponent.create(payload, this.componentContext.APP(), this.viewContainer.getDemoNode(), new CounterViewModeParameterObject('SIMPLE'))
            } else if (payload.option === 'SUB_VIEW') {
              InitCounterComponent.create(payload, this.componentContext.APP(), this.viewContainer.getDemoNode(), new CounterViewModeParameterObject('SUB_VIEW'))
            }
          } else if (payload.component === 'Calculator') {
            InitCalculatorComponent.create(payload, this.componentContext.APP(), this.viewContainer.getDemoNode())
          }
        })
        .build()
    )
  }
}

export class CounterViewModeParameterObject {
  constructor(option) {
    this.option = option
  }
}
