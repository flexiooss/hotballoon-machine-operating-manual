import {RESULT_STORE, ResultStore} from '../stores/ResultStore'
import {Store, State, InMemoryStorage} from 'hotballoon'
import {OperatorNull} from './operator/OperatorNull'

export const initStores = (component) => {
  component.storesKeyRegister.set(
    RESULT_STORE,
    component.addStore(
      new Store(RESULT_STORE, new InMemoryStorage(
        new State(RESULT_STORE, new ResultStore('', new OperatorNull(), '')),
        new ResultStore())
      )
    )
  )
}
