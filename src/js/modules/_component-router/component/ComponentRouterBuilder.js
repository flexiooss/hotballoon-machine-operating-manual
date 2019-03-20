import {ComponentRouterPublic} from './ComponentRouterPublic'
import {TypeCheck} from 'hotballoon'
import {assert, isNode} from 'flexio-jshelpers'
import {ComponentRouter} from './ComponentRouter'

export class ComponentRouterBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @return {ComponentRouterPublic}
   */
  static build(APP) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentRouterBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)

    return new ComponentRouterPublic(
      new ComponentRouter(
        APP.addComponentContext()
      )
    )
  }
}
