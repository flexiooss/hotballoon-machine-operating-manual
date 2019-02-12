import {DispatcherEventListenerFactory} from 'hotballoon'
import {CounterStore} from '../stores/CounterStore'
import {CounterAddNumberAction} from '../actions/CounterAddNumberAction'

export const initActionsListeners = (componentContext, counterStore) => {
  componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new CounterAddNumberAction())
      .callback((payload) => {
        if (payload.component === componentContext) {
          console.log(payload.sum)
          counterStore.set(new CounterStore(counterStore.data().count + payload.sum))
        }
      })
      .build()
  )
}
