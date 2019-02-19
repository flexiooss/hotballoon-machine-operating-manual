import {ResultStore} from '../../stores/ResultStore'
import Worker from '../workers/compute.worker'

export class GetResult {
  constructor(payload, store) {
    this._worker = new Worker()
    this._worker.postMessage({
      lexp: store.data().lexp,
      rexp: store.data().rexp,
      operator: store.data().operator.constructor.name
    })
    console.log(store.data())
    this._worker.addEventListener('message', (event) => {
      console.log('%c GetResult:from worker', 'color: purple;')
      console.log(event)
      const result = event.data
      store.set(new ResultStore(result, payload.operator, ''))
      this._worker.terminate()
    })
  }
}
