import {View, HtmlParams} from 'hotballoon'

export default class Head extends View {
  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('link', HtmlParams.withAttributes({
      href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro|Fira+Mono',
      rel: 'stylesheet'
    }))
  }
}
