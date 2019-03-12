import {OperatorNull} from '../../component/operator/OperatorNull'
import {ActionResultInput} from '../ActionResultInput/ActionResultInput'
import {StoreResult} from '../../stores/StoreResult/StoreResult'

/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionOperatorInput = (component) => {
  component.__actionOperatorInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().lexp !== '') {
      if (component.__resultStoreHandler.data().operator instanceof OperatorNull) {
        component.__resultStore.set(
          new StoreResult(
            component.__resultStoreHandler.data().lexp,
            payload.operator,
            component.__resultStoreHandler.data().rexp
          )
        )
      } else {
        component.__actionResultInput.dispatch(
          new ActionResultInput(payload.operator)
        )
      }
    }
  })
}
