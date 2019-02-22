import {ExecutorInterface} from './ExecutorInterface'

export class ExecutorInline extends ExecutorInterface {
  /**
   *
   * @param {Job} job
   */
  process(job) {
    job.processInline()
  }
}
