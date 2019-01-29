import {View, HtmlParams} from 'hotballoon'
import * as demoComponentPackage from '../package.json'

export default class Footer extends View {
  view() {
    return this.html('footer#footer.wrapper.tag', HtmlParams.withText('Flexio CI [version : ' + demoComponentPackage.version + ']'))
  }
}
