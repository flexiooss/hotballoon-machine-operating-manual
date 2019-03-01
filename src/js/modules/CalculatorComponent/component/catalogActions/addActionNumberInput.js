import {DispatcherEventListenerFactory} from 'hotballoon'
import {ActionNumberInput} from '../../actions/ActionNumberInput'
import {OperatorNull} from '../operator/OperatorNull'
import {StoreDataResult} from '../../stores/StoreDataResult'

export const addActionNumberInput = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ActionNumberInput())
      .callback((payload) => {
        if (component.__resultStore.data().operator instanceof OperatorNull) {
          component.__resultStore.set(new StoreDataResult(
            component.__resultStore.data().lexp.concat(payload.number),
            component.__resultStore.data().operator,
            component.__resultStore.data().rexp)
          )
        } else {
          component.__resultStore.set(new StoreDataResult(
            component.__resultStore.data().lexp,
            component.__resultStore.data().operator,
            component.__resultStore.data().rexp.concat(payload.number))
          )
        }
      })
      .build()
  )
}
