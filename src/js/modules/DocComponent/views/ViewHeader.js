import {View, HtmlParams} from 'hotballoon'

export default class ViewHeader extends View {
  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('header#header', HtmlParams.withChildNodes([
      this.html('h1#h1', HtmlParams.withText('HotBalloon machine operating manual'))
    ]))
  }
}
