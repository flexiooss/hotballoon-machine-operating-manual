import Worker from './workers/compute.worker'
import {OpertorJob} from './workers/OperatorExecutor'
import {JobInterface} from '@flexio-oss/hotballoon'

export class JobResult extends JobInterface {
  /**
   *
   * @param {ActionResultInput} payload
   * @param {Store<StoreResult>} store
   * @param {TransactionActionDispatcher} transactionActionDispatcher
   * @param {String} ID
   */
  constructor(payload, store, transactionActionDispatcher, ID) {
    super()
    this.payload = payload
    this.ticket = ID
    this.resultStore = store
    this.transactionActionDispatcher = transactionActionDispatcher

    this.message = {
      lexp: this.resultStore.state().data.lexp(),
      rexp: this.resultStore.state().data.rexp(),
      operator: this.resultStore.state().data.operator()
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
