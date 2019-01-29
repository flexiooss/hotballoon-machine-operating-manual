import {DispatcherEventListenerFactory} from 'hotballoon'
import {COUNT_STORE, CounterStore} from '../stores/CounterStore'
import {CounterAddNumberAction} from '../actions/CounterAddNumberAction'

export const initActionsListeners = (component) => {
  component.listenAction(
    DispatcherEventListenerFactory.listen(
      new CounterAddNumberAction())
      .callback((payload) => {
        if(payload.component === component) {
          const store = component.StoreByRegister(COUNT_STORE)
          console.log(payload.sum)
          store.set(new CounterStore(store.data().count + payload.sum))
        }
      })
      .build()
  )
}
