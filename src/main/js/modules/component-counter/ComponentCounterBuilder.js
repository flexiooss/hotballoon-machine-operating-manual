import {TypeCheck} from '@flexio-oss/hotballoon'
import {assert, isNode} from '@flexio-oss/assert'
import {ComponentCounterPublic} from './component/ComponentCounterPublic'
import {ComponentCounter} from './component/ComponentCounter'

export class ComponentCounterBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {boolean} withSubView
   */
  static build(APP, withSubView) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentCounterBuilder:build: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)
    return new ComponentCounterPublic(
      new ComponentCounter(
        APP.addComponentContext(),
        withSubView
      )
    )
  }
}
