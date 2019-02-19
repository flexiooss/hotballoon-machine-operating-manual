export class Link {
  /**
   *
   * @param {URL} url
   * @param {String} name
   */
  constructor(url = new URL(''), name = 'Link undefined') {
    this.url = url
    this.name = name
  }
}
