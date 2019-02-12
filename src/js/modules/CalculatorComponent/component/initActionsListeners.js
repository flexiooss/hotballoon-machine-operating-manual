import {DispatcherEventListenerFactory} from 'hotballoon'
import {ResultStore} from '../stores/ResultStore'
import {OperatorInputAction} from '../actions/OperatorInputAction'
import {NumberInputAction} from '../actions/NumberInputAction'
import {ResultInputAction} from '../actions/ResultInputAction'
import {GetResult} from './cunsumers/GetResult'
import {OperatorNull} from './operator/OperatorNull'
import {OperatorInputPayload} from '../actions/OperatorInputPayload'

export const initActionsListeners = (componentContext, resultStore) => {
  componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new NumberInputAction())
      .callback((payload) => {
        if (resultStore.data().operator instanceof OperatorNull) {
          resultStore.set(new ResultStore(resultStore.data().lexp.concat(payload.number), resultStore.data().operator, resultStore.data().rexp))
        } else {
          resultStore.set(new ResultStore(resultStore.data().lexp, resultStore.data().operator, resultStore.data().rexp.concat(payload.number)))
        }
      })
      .build()
  )

  componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new OperatorInputAction())
      .callback((payload) => {
        if (resultStore.data().lexp !== '') {
          if (resultStore.data().operator instanceof OperatorNull) {
            resultStore.set(new ResultStore(resultStore.data().lexp, payload.operator, resultStore.data().rexp))
          } else {
            console.log(componentContext)
            componentContext.dispatchAction(
              ResultInputAction.withPayload(
                new OperatorInputPayload(payload.operator, componentContext)
              )
            )
          }
        }
      })
      .build()
  )
  componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ResultInputAction())
      .callback((payload) => {
        if (resultStore.data().lexp !== '' && resultStore.data().rexp !== '' && !(resultStore.data().operator instanceof OperatorNull)) {
          new GetResult(
            payload,
            resultStore
          )
        }
      })
      .build()
  )
}
