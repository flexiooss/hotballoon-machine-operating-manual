'use strict'
import {Component, DispatcherEventListenerFactory, ViewContainerParameters} from 'hotballoon'
import {isNode, assert} from 'flexio-jshelpers'

import {AppInitializedAction} from '../../MainComponent/actions/AppInitializedAction'
import {InitCounterComponent} from './InitCounterComponent'
import {DOC_VIEWCONTAINER, MAIN_VIEW, DocContainer, DocContainerStores} from '../views/Doc.container'
import {CounterContainerPO} from '../../CounterComponent/component/CounterComponent'
import {InitCalculatorComponent} from './InitCalculatorComponent'

export class DocComponent extends Component {
  constructor(hotBalloonApplication, parentNode) {
    super(hotBalloonApplication)

    // initStores(this)
    // initActionsListeners(this)

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
   * @param {HotballoonApplication} hotballoonApplication
   * @param {Node} parentNode
   * @return {DocComponent}
   * @constructor
   * @static
   */
  static create(hotballoonApplication, parentNode) {
    return new this(hotballoonApplication, parentNode)
  }

  createRenderMountView() {
    this.viewContainer = this._addDocViewContainer()
    this.viewContainer.renderAndMount(this._parentNode)
  }

  _addDocViewContainer() {
    const DOC_VIEWCONTAINER_ID = this.nextID()

    const DOC_VIEWCONTAINER_INST = this.addViewContainer(
      new DocContainer(
        new ViewContainerParameters(
          this,
          DOC_VIEWCONTAINER_ID,
          this._parentNode
        ),
        new DocContainerStores()
      )
    )
    this.viewContainersKey.set(DOC_VIEWCONTAINER, DOC_VIEWCONTAINER_ID)
    return DOC_VIEWCONTAINER_INST
  }

  _initDispatcherListeners() {
    this.listenAction(
      /**
       * @param {AppActionPayload} payload
       */
      DispatcherEventListenerFactory.listen(new AppInitializedAction())
        .callback(
          /**
           * @param {AppActionPayload} payload
           */
          (payload) => {
            console.log(this.viewContainer)
            InitCounterComponent.create(payload, this.APP(), this.viewContainer.getSimpleDemoNode(), new CounterContainerPO('SIMPLE'))
            InitCounterComponent.create(payload, this.APP(), this.viewContainer.getSubViewDemoNode(), new CounterContainerPO('SUB_VIEW'))
            InitCalculatorComponent.create(payload, this.APP(), this.viewContainer.getCalculatorDemoNode())
          })
        .build()
    )
  }
}
