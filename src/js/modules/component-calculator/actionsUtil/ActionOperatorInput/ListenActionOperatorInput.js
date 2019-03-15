import {FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import '../../generated/io/package'

/**
 *
 * @type {ActionResultInput}
 */
const ActionResultInput = window[FLEXIO_IMPORT_OBJECT].io.flexio.ComponentCalculator.ActionResultInput

/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionOperatorInput = (component) => {
  component.__actionOperatorInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().lexp() !== '') {
      if (component.__resultStoreHandler.data().operator() === '') {
        component.__resultStore.set(
          component.__resultStore.state().data.withOperator(
            payload.operator()
          )
        )
      } else {
        component.__actionResultInput.dispatch(
          new ActionResultInput(payload.operator())
        )
      }
    }
  })
}
