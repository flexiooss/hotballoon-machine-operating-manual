import {HtmlParams, NodeEventListenerFactory, View, ViewStoresParameters} from 'hotballoon'
import {PathName} from 'flexio-jsrouter/src/URL/PathName'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'
const NAVBAR_STORE = 'NAVBAR_STORE'

export default class Navbar extends View {
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
    const data = this.store(NAVBAR_STORE).data()
    let linkCount = data.linkCollection.length
    let linksTempate = new Array(linkCount)
    for (let i = 0; i < linkCount; i++) {
      linksTempate[i] = this.html('a#linkNav3.linkNav',
        HtmlParams
          .withText(data.linkCollection[i].name)
          .addEventListener(
            NodeEventListenerFactory.listen('click')
              .callback((e) => {
                this.dispatch(CHANGE_COMPONENT_EVENT, {link: data.linkCollection[i].url})
                this.container().resetDemoDiv()
              })
              .build()
          )
      )
    }
    return linksTempate
  }
}

export class NavbarStores extends ViewStoresParameters {
  /**
   *
   * @param navbarStore
   */
  constructor(navbarStore) {
    super()
    this.setStore(NAVBAR_STORE, navbarStore)
  }
}
