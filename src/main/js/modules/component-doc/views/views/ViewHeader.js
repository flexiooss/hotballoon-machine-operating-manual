import {View, e} from '@flexio-oss/hotballoon'

export default class ViewHeader extends View {
  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('header#header')
        .childNodes(

          this.html(
            e('h1#h1')
              .text('HotBalloon machine operating manual'))
        )
    )
  }
}
