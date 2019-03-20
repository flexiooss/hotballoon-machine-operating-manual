import Worker from '../workers/compute.worker'
import {OpertorJob} from '../workers/OperatorExecutor'
import {JobInterface} from 'hotballoon'

export class Job extends JobInterface {
  /**
   *
   * @param payload
   * @param {ListenerActionResultInputParams} params
   */
  constructor(payload, params) {
    super()

    this.payload = payload
    this.ticket = params.ID
    this.actionResultInput = params.actionResultInput
    this.resultStore = params.resultStore
    this.resultStoreHandler = params.resultStoreHandler
    this.transactionActionDispatcher = params.transactionActionDispatcher

    this.message = {
      lexp: this.resultStoreHandler.data().lexp(),
      rexp: this.resultStoreHandler.data().rexp(),
      operator: this.resultStoreHandler.data().operator()
    }
  }
  processInline() {
    const result = new OpertorJob(this.__message).exec()
    this.finish(result)
  }

  processWorker() {
    this.transactionActionDispatcher.actionTansaction(this.ticket, true)
    const worker = new Worker()
    worker.postMessage(this.message)
    worker.addEventListener('message', (event) => {
      this.finish(event.data)
      worker.terminate()
      this.transactionActionDispatcher.actionTansaction(this.ticket, false)
    })
  }

  finish(result) {
    this.resultStore.set(
      this.resultStore.state().data
        .withLexp(result.toString())
        .withOperator(this.payload.operator() === '=' ? '' : this.payload.operator())
        .withRexp('')
    )
  }
}
