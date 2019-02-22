import {DataResultStore} from '../../stores/DataResultStore'
import Worker from '../workers/compute.worker'
import {OpertorJob} from '../workers/OperatorExecutor'
import {JobInterface} from '../Job/JobInterface'

export class Job extends JobInterface {
  constructor(payload, store) {
    super()
    this.__message = {
      lexp: store.data().lexp,
      rexp: store.data().rexp,
      operator: store.data().operator.constructor.name
    }
    this.__store = store
    this.__payload = payload
  }
  processInline() {
    const result = new OpertorJob(this.__message).exec
    this.finish(this.__store, this.__payload, result)
  }

  processWorker() {
    const worker = new Worker()
    worker.postMessage(this.__message)
    worker.addEventListener('message', (event) => {
      this.finish(this.__store, this.__payload, event.data)
      worker.terminate()
    })
  }

  finish(store, payload, result) {
    store.set(new DataResultStore(result, payload.operator, ''))
  }
}
