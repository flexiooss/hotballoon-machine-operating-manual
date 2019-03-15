import Worker from '../workers/compute.worker'
import {OpertorJob} from '../workers/OperatorExecutor'
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
      lexp: component.__resultStoreHandler.data().lexp(),
      rexp: component.__resultStoreHandler.data().rexp(),
      operator: component.__resultStoreHandler.data().operator()
    }
    this.__component = component
    this.__payload = payload
    this.ticket = component.__componentContext.nextID()
  }
  processInline() {
    const result = new OpertorJob(this.__message).exec()
    this.finish(result)
  }

  processWorker() {
    this.__component.__transactionActionDispatcher.actionTansaction(this.ticket, true)
    const worker = new Worker()
    worker.postMessage(this.__message)
    worker.addEventListener('message', (event) => {
      this.finish(event.data)
      worker.terminate()
      this.__component.__transactionActionDispatcher.actionTansaction(this.ticket, false)
    })
  }

  finish(result) {
    this.__component.__resultStore.set(
      this.__component.__resultStore.state().data
        .withLexp(result.toString())
        .withOperator(this.__payload.operator() === '=' ? '' : this.__payload.operator())
        .withRexp('')
    )
  }
}
