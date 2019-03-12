export class StoreNavbar {
  /**
   *
   * @param {SchemaLink[]} linkCollection
   * @param {int} selected
   */
  constructor(linkCollection = null, selected = 0) {
    this.linkCollection = linkCollection
    this.selected = selected
  }
}
