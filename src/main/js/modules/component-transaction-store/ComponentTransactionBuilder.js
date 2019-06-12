import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNode} from '@flexio-oss/assert'
import {ComponentTransactionPublic} from './component/ComponentTransactionPublic'
import {ComponentTransaction} from './component/ComponentTransaction'

export class ComponentTransactionBuilder {
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

    return new ComponentTransactionPublic(
      new ComponentTransaction(
        APP.addComponentContext(),
        parentNode
      )
    )
  }
}
