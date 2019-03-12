import {StoreCounter} from '../../stores/CounterStore/StoreCounter'
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
      let result = component.__counterStoreHandler.data().count + payload.sum
      component.__counterStore.set(new StoreCounter(result < 0 ? 0 : result))
    })
}
