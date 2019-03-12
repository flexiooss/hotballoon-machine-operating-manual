import {OperatorNull} from '../../component/operator/OperatorNull'
import {StoreResult} from '../../stores/StoreResult/StoreResult'

/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionNumberInput = (component) => {
  component.__actionNumberInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().operator instanceof OperatorNull) {
      component.__resultStore.set(new StoreResult(
        component.__resultStoreHandler.data().lexp.concat(payload.number),
        component.__resultStoreHandler.data().operator,
        component.__resultStoreHandler.data().rexp)
      )
    } else {
      component.__resultStore.set(new StoreResult(
        component.__resultStoreHandler.data().lexp,
        component.__resultStoreHandler.data().operator,
        component.__resultStoreHandler.data().rexp.concat(payload.number))
      )
    }
  })
}
