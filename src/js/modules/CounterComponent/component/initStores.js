import {COUNT_STORE, DataCounterStore} from '../stores/DataCounterStore'
import {State, InMemoryStorage} from 'hotballoon'
import {CounterStore} from '../stores/CounterStore'

/**
 *
 * @param componentContext
 * @return {Store}
 */
export const initStores = (componentContext) => {
  console.log(componentContext)
  return componentContext.addStore(
    new CounterStore(COUNT_STORE, new InMemoryStorage(
      new State(COUNT_STORE, new DataCounterStore(0)),
      new DataCounterStore())
    )
  )
}
