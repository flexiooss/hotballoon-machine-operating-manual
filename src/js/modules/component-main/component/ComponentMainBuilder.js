import {ComponentMain} from './ComponentMain'
import {TypeCheck} from 'hotballoon'
import {assert, isNode} from 'flexio-jshelpers'
import {ComponentMainPublic} from './ComponentMainPublic'

export class ComponentMainBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Element} parentNode
   * @param {ExecutorInterface} executor
   * @return {ComponentMainPublic}
   */
  static build(APP, parentNode, executor) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentMain:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    assert(!!isNode(parentNode),
      'ComponentMain:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    return new ComponentMainPublic(
      new ComponentMain(
        APP.addComponentContext(),
        parentNode,
        executor
      )
    )
  }
}
