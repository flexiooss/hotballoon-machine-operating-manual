import {View, HtmlParams} from 'hotballoon'
import * as demoComponentPackage from '../../../../../package.json'

export default class ViewFooter extends View {
  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('footer#footer.wrapper.tag', HtmlParams.withChildNodes([
      this.html('div#version', HtmlParams.withText('HotBalloon-machine-operating-manual [version : ' + demoComponentPackage.version + ']')),
      this.html('div#github', HtmlParams.withText('github : ' + demoComponentPackage.repository))

    ]))
  }
}
