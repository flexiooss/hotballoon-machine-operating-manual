import {COUNT_STORE, CounterStore} from '../stores/CounterStore'
import {Store, State, InMemoryStorage} from 'hotballoon'

/**
 *
 * @param componentContext
 * @return {Store}
 */
export const initStores = (componentContext) => {
  console.log(componentContext)
  return componentContext.addStore(
    new Store(COUNT_STORE, new InMemoryStorage(
      new State(COUNT_STORE, new CounterStore(0)),
      new CounterStore())
    )
  )
}
