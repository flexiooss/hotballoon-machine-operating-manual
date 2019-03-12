import {OperatorNull} from '../../component/operator/OperatorNull'
import {OperatorDiv} from '../../component/operator/OperatorDiv'
import {Job} from '../../component/cunsumers/JobResult'
import {StoreResult} from '../../stores/StoreResult/StoreResult'

/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionResultInput = (component) => {
  component.__actionResultInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().operator instanceof OperatorDiv && component.resultStore.data().rexp === '0') {
      component.__resultStore.set(new StoreResult())
    } else {
      if (component.__resultStoreHandler.data().lexp !== '' &&
        component.__resultStoreHandler.data().rexp !== '' &&
        !(component.__resultStoreHandler.data().operator instanceof OperatorNull)) {
        component.__executor.process(new Job(payload, component))
      }
    }
  })
}
