import {Job} from '../../component/cunsumers/JobResult'

/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionResultInput = (component) => {
  component.__actionResultInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().operator() === '/' && component.__resultStoreHandler.data().rexp() === '0') {
      component.__resultStore.set(
        component.__resultStore.state().data.withRexp('').withOperator('').withLexp('')
      )
    } else {
      if (component.__resultStoreHandler.data().lexp() !== '' &&
        component.__resultStoreHandler.data().rexp() !== '' &&
        component.__resultStoreHandler.data().operator() !== '') {
        component.__executor.process(new Job(payload, component))
      }
    }
  })
}
