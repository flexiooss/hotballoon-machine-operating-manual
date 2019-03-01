export class SchemaLink {
  /**
   *
   * @param {URL} url
   * @param {String} name
   */
  constructor(url = new URL(''), name = 'SchemaLink undefined') {
    this.url = url
    this.name = name
  }
}
