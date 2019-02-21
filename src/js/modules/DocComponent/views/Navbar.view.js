import {HtmlParams, NodeEventListenerFactory, View} from 'hotballoon'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'

export default class Navbar extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {DocContainerStoresParameters} docContainerStoresParameters
   */
  constructor(viewParameters, docContainerStoresParameters) {
    super(viewParameters)
    this.__stores = docContainerStoresParameters
    this.subscribeToStore(this.__stores.navbarStore)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html('nav#navBar.navBar',
      HtmlParams.withChildNodes([
        this.html('h2#titleSommaire.titleSommaire', HtmlParams.withText('Sommaire')),
        this.html('div#divLinksNav',
          HtmlParams.withChildNodes(this.__linkStoreToLinkView())
        )
      ])
    )
  }

  /**
   *
   * @returns {Node[]}
   * @private
   */
  __linkStoreToLinkView() {
    let linkCount = this.__stores.navbarStore.size
    let linksTempate = new Array(linkCount)
    for (let i = 0; i < linkCount; i++) {
      linksTempate[i] = this.html('link#linkNav3.linkNav' + (this.__stores.navbarStore.selected(i) ? '.selected' : ''),
        HtmlParams
          .withText(this.__stores.navbarStore.url(i).name)
          .addEventListener(
            NodeEventListenerFactory.listen('click')
              .callback((e) => {
                this.dispatch(CHANGE_COMPONENT_EVENT, {link: this.__stores.navbarStore.url(i).url})
                this.container().resetDemoDiv()
              })
              .build()
          )
      )
    }
    return linksTempate
  }
}
