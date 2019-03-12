import {e, ElementEventListenerBuilder, View} from 'hotballoon'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'

export default class ViewNavbar extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {StoreContainer} storeContainer
   */
  constructor(viewParameters, storeContainer) {
    super(viewParameters)
    this.__stores = storeContainer
    this.subscribeToStore(this.__stores.navbarStore)
  }

  /**
   *
   * @returns {Element}
   */
  template() {
    return this.html(
      e('nav#navBar.navBar').childNodes(
        this.html(
          e('h2#titleSommaire.titleSommaire')
            .text('Sommaire')
        ),
        this.html(
          e('div#divLinksNav')
            .childNodes(...this.__linkStoreToLinkView())
        )
      )
    )
  }

  /**
   *
   * @returns {Element[]}
   * @private
   */
  __linkStoreToLinkView() {
    let linkCount = this.__stores.navbarStore.size
    let linksTempate = []
    for (let i = 0; i < linkCount; i++) {
      linksTempate.push(
        this.html(
          e('link#linkNav3.linkNav' + (this.__stores.navbarStore.selected(i) ? '.selected' : ''))
            .text(this.__stores.navbarStore.url(i).name)
            .listenEvent(
              ElementEventListenerBuilder.listen('click')
                .callback((e) => {
                  this.dispatch(CHANGE_COMPONENT_EVENT, {link: this.__stores.navbarStore.url(i).url})
                  this.container().resetDemoDiv()
                })
                .build()
            )
        )
      )
    }
    return linksTempate
  }
}
