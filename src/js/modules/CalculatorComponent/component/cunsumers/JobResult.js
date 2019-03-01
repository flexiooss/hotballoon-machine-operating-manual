import {StoreDataResult} from '../../stores/StoreDataResult'
import Worker from '../workers/compute.worker'
import {OpertorJob} from '../workers/OperatorExecutor'
import {JobInterface} from '../Job/JobInterface'

export class Job extends JobInterface {
  /**
   *
   * @param payload
   * @param {ComponentCalculator} component
   */
  constructor(payload, component) {
    super()
    this.__message = {
      lexp: component.__resultStore.data().lexp,
      rexp: component.__resultStore.data().rexp,
      operator: component.__resultStore.data().operator.constructor.name
    }
    this.__component = component
    this.__payload = payload
    console.log(typeof component.__transactionAction)
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
    this.__component.__componentContext.dispatchAction(
      this.__component.__transactionAction(true)
    )
  }

  finish(result) {
    this.__component.__resultStore.set(new StoreDataResult(result.toString(), this.__payload.operator, ''))
    this.__component.__componentContext.dispatchAction(
      this.__component.__transactionAction(false)
    )
  }
}
