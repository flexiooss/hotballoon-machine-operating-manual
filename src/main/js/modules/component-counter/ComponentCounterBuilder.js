import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNode} from '@flexio-oss/assert'
import {ComponentCounterPublic} from './component/ComponentCounterPublic'
import {ComponentCounter} from './component/ComponentCounter'

export class ComponentCounterBuilder {
  /**
   *
   * @param {Object} payload
   * @param {HotBalloonApplication} APP
   * @param {Node} parentNode
   * @param {boolean} withSubView
   */
  static build(payload, APP, parentNode, withSubView) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentCounterBuilder:build: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    assert(!!isNode(parentNode),
      'ComponentCounterBuilder:build: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    return new ComponentCounterPublic(
      new ComponentCounter(
        APP.addComponentContext(),
        parentNode,
        withSubView
      )
    )
  }
}
