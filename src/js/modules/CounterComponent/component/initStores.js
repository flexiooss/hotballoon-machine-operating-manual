import {COUNT_STORE, CounterStore} from '../stores/CounterStore'
import {DataCounterStore} from '../stores/DataCounterStore'
import {State, InMemoryStorage} from 'hotballoon'

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
