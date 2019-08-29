import { assertType, isNull } from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import { ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig, TypeCheck } from '@flexio-oss/hotballoon'

export class ActionInitializeViewMaker {
  /**
   *
   * @private
   * @param {ActionDispatcher<ActionInitializeView>} action
   */
  constructor(action) {
    this.__action = action
  }

  /**
   *
   * @param {Dispatcher} dispatcher
   * @returns {ActionInitializeViewMaker}
   */
  static create(dispatcher) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitializeViewMaker:constructor: `dispatcher` should be a Dispatcher'
    )
    let action = ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          globalFlexioImport.io.flexio.component_doc.actions.ActionInitializeView,
          /**
           *
           * @param {ActionInitializeView} data
           * @return {ActionInitializeView}
           */
          (data) => {
            return data
          },
          /**
           *
           * @param {ActionInitializeView} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.message)
          }
        ),
        dispatcher
      )
    )
    return new ActionInitializeViewMaker(action)
  }

  /**
   *
   * @param {Store<StoreNavbar>} store
   * @returns {ActionInitializeViewMaker}
   */
  listen(store) {
    assertType(TypeCheck.isStore(store),
      'ActionInitializeViewMaker:listen: `store` should be a Store'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionInitializeView} payload
       */
      (payload) => {
        let selected = -1
        if (payload.component() === 'counter') {
          if (payload.option() === 'simple') {
            selected = 0
          } else if (payload.option() === 'subview') {
            selected = 1
          }
        } else if (payload.component() === 'calculator') {
          selected = 2
        }
        store.set(store.state().data.withSelected(selected))
      })
    return this
  }

  /**
   *
   * @returns {ActionDispatcher<ActionInitializeView>}
   */
  action() {
    return this.__action
  }
}
