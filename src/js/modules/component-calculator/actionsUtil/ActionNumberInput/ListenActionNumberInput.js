/**
 *
 * @param {ComponentCalculator} component
 */
export const listenActionNumberInput = (component) => {
  component.__actionNumberInput.listenWithCallback((payload) => {
    if (component.__resultStoreHandler.data().operator() === '') {
      component.__resultStore.set(
        component.__resultStore.state().data.withLexp(
          component.__resultStoreHandler.data().lexp().concat(payload.number())
        )
      )
    } else {
      component.__resultStore.set(
        component.__resultStore.state().data.withRexp(
          component.__resultStoreHandler.data().rexp().concat(payload.number())
        )
      )
    }
  })
}
