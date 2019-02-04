import {ActionPayload, DispatcherEventListenerFactory} from 'hotballoon'
import {RESULT_STORE, ResultStore} from '../stores/ResultStore'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {NumberInputAction} from '../actions/NumberInputAction'
import {ResultInputAction} from '../actions/ResultInputAction'
import {GetResult} from './cunsumers/GetResult'
import {OperatorNull} from './operator/OperatorNull'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'

export const initActionsListeners = (component) => {
  component.listenAction(
    DispatcherEventListenerFactory.listen(
      new NumberInputAction())
      .callback((payload) => {
        if (payload.component === component) {
          const store = component.StoreByRegister(RESULT_STORE)
          console.log(store.data().operator)
          if (store.data().operator instanceof OperatorNull) {
            store.set(new ResultStore(store.data().lexp.concat(payload.number), store.data().operator, store.data().rexp))
          } else {
            store.set(new ResultStore(store.data().lexp, store.data().operator, store.data().rexp.concat(payload.number)))
          }
        }
      })
      .build()
  )

  component.listenAction(
    DispatcherEventListenerFactory.listen(
      new OperatorInputAction())
      .callback((payload) => {
        if (payload.component === component) {
          const store = component.StoreByRegister(RESULT_STORE)
          if (store.data().lexp !== '') {
            if (store.data().operator instanceof OperatorNull) {
              store.set(new ResultStore(store.data().lexp, payload.operator, store.data().rexp))
            } else {
              console.log(component)
              component.dispatchAction(
                ResultInputAction.withPayload(
                  new OperatorInputPayload(payload.operator, component)
                )
              )
            }
          }
        }
      })
      .build()
  )
  component.listenAction(
    DispatcherEventListenerFactory.listen(
      new ResultInputAction())
      .callback((payload) => {
        if (payload.component === component) {
          const store = component.StoreByRegister(RESULT_STORE)
          if (store.data().lexp !== '' && store.data().rexp !== '' && !(store.data().operator instanceof OperatorNull)) {
            new GetResult(
              payload,
              component.StoreByRegister(RESULT_STORE),
              component.Dispatcher()
            )
          }
        }
      })
      .build()
  )
}
