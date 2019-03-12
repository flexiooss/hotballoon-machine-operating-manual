import {TypeCheck} from 'hotballoon'
import {assert} from 'flexio-jshelpers'
import {StoreCounter} from '../stores/CounterStore/StoreCounter'

export class ContainerStore {
  /**
   *
   * @param {StoreHandlerCounter} counterStore
   */
  constructor(counterStore) {
    assert(
      counterStore.isTypeOf(StoreCounter),
      'CounterContainerStoresParams: `counterStore ` should be a Store of CounterStore')
    this.__counterStore = TypeCheck.assertStoreBase(counterStore)
  }

  /**
   *
   * @return {StoreHandlerCounter}
   */
  get counterStore() {
    return this.__counterStore
  }
}
