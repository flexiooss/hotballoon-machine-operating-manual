'use strict'
import {ViewContainer} from '@flexio-oss/hotballoon'
import {ViewCounter} from './views/ViewCounter'

import {globalFlexioImport} from '@flexio-oss/global-import-registry'

/**
 * @extends ViewContainer
 */
export class ViewContainerCounter extends ViewContainer {
  /**
   *
   * @param {ViewContainerParameters} viewContainerParameters
   * @param {CounterStoreManager} counterStoreManager
   * @param {CounterActionManager} counterActionManager
   * @param {boolean} withSubView
   */
  constructor(viewContainerParameters, counterStoreManager, counterActionManager, withSubView) {
    super(viewContainerParameters)
    this.__stores = counterStoreManager
    this.__actions = counterActionManager
    this.__withSubView = withSubView
    this.__main = this.addView(new ViewCounter(this, this.__stores, this.__withSubView))
    this.__handleEvents()
  }

  /**
   *
   * @private
   */
  __handleEvents() {
    this.__main.on()
      .increment((payload) => {
        this.__actions.actionModifyCounter().dispatch(
          new globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter(1)
        )
      })
    this.__main.on()
      .decrement((payload) => {
        this.__actions.actionModifyCounter().dispatch(
          new globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter(-1)
        )
      })
    this.__main.on()
      .add((payload) => {
        this.__actions.actionModifyCounter().dispatch(
          new globalFlexioImport.io.flexio.component_counter.actions.ActionModifyCounter(payload.value)
        )
      })
  }
}
