import {DispatcherEventListenerFactory} from 'hotballoon'
import {ActionModifyCounter} from '../../actions/ActionModifyCounter'
import {StoreDataCounter} from '../../stores/StoreDataCounter'

/**
 *
 * @param {ComponentCounter} component
 */
export const addActionModifyCounter = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ActionModifyCounter())
      .callback((payload) => {
        let result = component.__counterStore.data().count + payload.sum
        component.__counterStore.set(new StoreDataCounter(result < 0 ? 0 : result))
      })
      .build()
  )
}
