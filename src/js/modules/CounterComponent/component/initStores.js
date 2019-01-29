import {COUNT_STORE, CounterStore} from '../stores/CounterStore'
import {Store, State, InMemoryStorage} from 'hotballoon'

export const initStores = (component) => {
  component.storesKeyRegister.set(
    COUNT_STORE,
    component.addStore(
      new Store(COUNT_STORE, new InMemoryStorage(
        new State(COUNT_STORE, new CounterStore(0)),
        new CounterStore())
      )
    )
  )
}
