import {RESULT_STORE, DataResultStore} from '../stores/DataResultStore'
import {Store, State, InMemoryStorage} from 'hotballoon'
import {OperatorNull} from './operator/OperatorNull'
import {ResultStore} from '../stores/ResultStore'

/**
 *
 * @param {ComponentContext} componentContext
 * @returns {Store}
 */
export const initStores = (componentContext) => {
  return componentContext.addStore(
    new ResultStore(RESULT_STORE, new InMemoryStorage(
      new State(RESULT_STORE, new DataResultStore('', new OperatorNull(), '')),
      new DataResultStore())
    )
  )
}
