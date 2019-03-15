import {assert} from 'flexio-jshelpers'

/**
 *
 * @param {ComponentCounter} component
 */
export const listenActionModifyCounter = (component) => {
  assert(component.__actionModifyCounter !== 'undefined',
    'listenActionModifyCounter: ActionChangeAction should be initialized before using it'
  )

  component.__actionModifyCounter
    .listenWithCallback((payload) => {
      let result = component.__counterStore.state().data.count() + payload.sum()
      component.__counterStore.set(component.__counterStore.state().data.withCount(result < 0 ? 0 : result))
    })
}
