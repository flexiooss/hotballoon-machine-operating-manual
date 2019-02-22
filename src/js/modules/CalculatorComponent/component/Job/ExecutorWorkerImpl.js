import {ExecutorInterface} from './ExecutorInterface'

export class ExecutorWorker extends ExecutorInterface {
  /**
   *
   * @param {Job} job
   */
  process(job) {
    job.processWorker()
  }
}
