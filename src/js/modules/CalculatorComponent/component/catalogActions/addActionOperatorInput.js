import {DispatcherEventListenerFactory} from 'hotballoon'
import {OperatorNull} from '../operator/OperatorNull'
import {StoreDataResult} from '../../stores/StoreDataResult'
import {ActionOperatorInput} from '../../actions/ActionOperatorInput'
import {ActionResultInput} from '../../actions/ActionResultInput'
import {PayloadOperatorInput} from '../../actions/PayloadOperatorInput'

export const addActionOperatorInput = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ActionOperatorInput())
      .callback((payload) => {
        if (component.__resultStore.data().lexp !== '') {
          if (component.__resultStore.data().operator instanceof OperatorNull) {
            component.__resultStore.set(new StoreDataResult(
              component.__resultStore.data().lexp,
              payload.operator,
              component.__resultStore.data().rexp)
            )
          } else {
            component.__componentContext.dispatchAction(
              ActionResultInput.withPayload(
                new PayloadOperatorInput(payload.operator)
              )
            )
          }
        }
      })
      .build()
  )
}
