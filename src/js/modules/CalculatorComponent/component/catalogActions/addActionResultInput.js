import {DispatcherEventListenerFactory} from 'hotballoon'
import {OperatorNull} from '../operator/OperatorNull'
import {StoreDataResult} from '../../stores/StoreDataResult'
import {ActionResultInput} from '../../actions/ActionResultInput'
import {OperatorDiv} from '../operator/OperatorDiv'
import {Job} from '../cunsumers/JobResult'

export const addActionResultInput = (component) => {
  component.__componentContext.listenAction(
    DispatcherEventListenerFactory.listen(
      new ActionResultInput())
      .callback((payload) => {
        if (component.__resultStore.data().operator instanceof OperatorDiv && component.resultStore.data().rexp === '0') {
          component.__resultStore.set(new StoreDataResult())
        } else {
          if (component.__resultStore.data().lexp !== '' &&
            component.__resultStore.data().rexp !== '' &&
            !(component.__resultStore.data().operator instanceof OperatorNull)) {
            component.__executor.process(new Job(payload, component))
          }
        }
      })
      .build()
  )
}
