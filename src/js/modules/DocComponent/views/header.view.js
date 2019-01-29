import {View, HtmlParams} from 'hotballoon'
import logo from '../assets/img/logo.jpg'

export default class Header extends View {
  view() {
    return this.html('header#header', HtmlParams.withChildNodes([
      this.html('img#logo.center', HtmlParams.withAttributes({src: logo})),
      this.html('h1#h1', HtmlParams.withText('Flexio CI'))
    ])
    )
  }
}
