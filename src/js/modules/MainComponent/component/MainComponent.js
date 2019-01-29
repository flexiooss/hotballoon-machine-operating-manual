'use strict'
import {isNode, assert} from 'flexio-jshelpers'
import {Component, DispatcherEventListenerFactory} from 'hotballoon'
import {AppInitializedAction} from '../actions/AppInitializedAction'
import {InitDocComponent} from './InitDocComponent'

export class MainComponent extends Component {
  /**
   *
   * @param {HotBalloonApplication} hotBallonApplication
   * @param {Node} parentNode
   */
  constructor(hotBallonApplication, parentNode) {
    super(hotBallonApplication)
    this._setParentNode(parentNode)
  }

  /**
   *
   * @param {HotBalloonApplication} hotBallonApplication
   * @param {Node} parentNode
   * @return {MainComponent}
   * @static
   */
  static create(hotBallonApplication, parentNode) {
    return new this(hotBallonApplication, parentNode)
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
   * @private
   */
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
            InitDocComponent.create(payload, this.APP(), this._parentNode)
          })
        .build()
    )
  }

}
