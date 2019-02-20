import {HtmlParams, NodeEventListenerFactory, View, ViewStoresParameters} from 'hotballoon'
import {NavbarStoreHandler} from '../stores/NavbarStoreHandler'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'
const NAVBAR_STORE = 'NAVBAR_STORE'

export default class Navbar extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {DocContainerStoresParameters} docContainerStoresParameters
   */
  constructor(viewParameters, docContainerStoresParameters) {
    super(viewParameters)
    this.__navbarStore = docContainerStoresParameters.navbarStore
    this.subscribeToStore(this.__navbarStore,(s)=>{
      this.maSubView.steNewData('toto').update()
      return true
    })
    this.__navStorehandler = new NavbarStoreHandler(this.__navbarStore.data())
  }

  /**
   *
   * @returns {Node}
   */
  template() {
    this.__updateStoreHandler()
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
    let linkCount = this.__navStorehandler.size
    let linksTempate = new Array(linkCount)
    for (let i = 0; i < linkCount; i++) {
      linksTempate[i] = this.html('a#linkNav3.linkNav',
        HtmlParams
          .withText(this.__navStorehandler.url(i).name)
          .addEventListener(
            NodeEventListenerFactory.listen('click')
              .callback((e) => {
                this.dispatch(CHANGE_COMPONENT_EVENT, {link: this.__navStorehandler.url(i).url})
                this.container().resetDemoDiv()
              })
              .build()
          )
      )
    }
    return linksTempate
  }

  /**
   *
   * @private
   */
  __updateStoreHandler() {
    this.__navStorehandler = new NavbarStoreHandler(this.__navbarStore.data())
  }
}
