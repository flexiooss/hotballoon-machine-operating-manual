import {View, HtmlParams} from 'hotballoon'

export default class Header extends View {
  template() {
    return this.html('header#header', HtmlParams.withChildNodes([
      this.html('h1#h1', HtmlParams.withText('HotBalloon machine operating manual'))
    ]))
  }
}
