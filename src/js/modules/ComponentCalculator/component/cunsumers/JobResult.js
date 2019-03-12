import Worker from '../workers/compute.worker'
import {OpertorJob} from '../workers/OperatorExecutor'
import {StoreResult} from '../../stores/StoreResult/StoreResult'
import {JobInterface} from 'hotballoon'

export class Job extends JobInterface {
  /**
   *
   * @param payload
   * @param {ComponentCalculator} component
   */
  constructor(payload, component) {
    super()
    this.__message = {
      lexp: component.__resultStoreHandler.data().lexp,
      rexp: component.__resultStoreHandler.data().rexp,
      operator: component.__resultStoreHandler.data().operator.constructor.name
    }
    this.__component = component
    this.__payload = payload
  }
  processInline() {
    this.start()
    const result = new OpertorJob(this.__message).exec()
    this.finish(result)
  }

  processWorker() {
    this.start()
    const worker = new Worker()
    worker.postMessage(this.__message)
    worker.addEventListener('message', (event) => {
      this.finish(event.data)
      worker.terminate()
    })
  }

  start() {
    console.log(this.__component.__transactionActionDispatcher)
    this.__component.__transactionActionDispatcher.actionTansaction(true)
  }

  finish(result) {
    this.__component.__resultStore.set(new StoreResult(result.toString(), this.__payload.operator, ''))
    this.__component.__transactionActionDispatcher.actionTansaction(false)
  }
}
