import {View, e} from '@flexio-oss/hotballoon'

export default class ViewMain extends View {
  /**
   *
   * @return {Element}
   */
  template() {
    return this.html(
      e('main#main')
        .childNodes(
          this.html(
            e('h2#subtitle.subtitle')
              .text('Description')
          ),
          this.html(
            e('div#demo.demo')
              .attributes()
          )
        )
    )
  }

  /**
   *
   * @return {Node}
   */
  getDemoDiv() {
    return this.nodeRef('demo')
  }

  resetDemoDiv() {
    if (this.nodeRef('demo').hasChildNodes()) {
      this.nodeRef('demo').removeChild(this.nodeRef('demo').firstChild)
    }
  }
}
