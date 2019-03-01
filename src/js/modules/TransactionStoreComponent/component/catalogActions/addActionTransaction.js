import {DispatcherEventListenerFactory} from 'hotballoon'
import {ActionTransaction} from '../../actions/ActionTransaction'
import {StoreDataTransaction} from '../../stores/StoreDataTransaction'

export const addActionTransaction = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ActionTransaction())
      .callback((payload) => {
        if (payload.isActive !== component.__transactionStoreHandler.isRunning) {
          component.__transactionStore.set(new StoreDataTransaction(payload.isActive))
        }
      })
      .build()
  )
}
