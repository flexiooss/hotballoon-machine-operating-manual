import {ViewStoresParameters} from 'hotballoon'

/**
 * @extends ViewStoresParameters
 */
export class CounterContainerStoresParameters extends ViewStoresParameters {
  /**
   *
   * @param {ResultStore} counterStore
   */
  constructor(counterStore) {
    super()
    this.__counterStore = this.validate(counterStore)
  }

  /**
   *
   * @return {ResultStore}
   */
  get counterStore() {
    return this.__counterStore
  }
}
