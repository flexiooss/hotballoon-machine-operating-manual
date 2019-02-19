import {DispatcherEventListenerFactory} from 'hotballoon'
import {DataCounterStore} from '../stores/DataCounterStore'
import {CounterAddNumberAction} from '../actions/CounterAddNumberAction'

/**
 *
 * @param {ComponentContext} componentContext
 * @param {Store} counterStore
 */
export const initActionsListeners = (componentContext, counterStore) => {
  componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new CounterAddNumberAction())
      .callback((payload) => {
        if (payload.component === componentContext) {
          console.log(payload.sum)
          let result = counterStore.data().count + payload.sum
          counterStore.set(new DataCounterStore(result < 0 ? 0 : result))
        }
      })
      .build()
  )
}
