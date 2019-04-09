import {e, ElementEventListenerBuilder, View, ViewPublicEventHandler,EventListenerOrderedBuilder} from 'hotballoon'
import {assertType, isFunction} from 'flexio-jshelpers'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'

export default class ViewNavbar extends View {
  /**
   *
   * @param {ViewContainerBase} container
   * @param {ContainerStore} storeContainer
   */
  constructor(container, storeContainer) {
    super(container)
    this.__stores = storeContainer
    this.subscribeToStore(this.__stores.navbarStore)
  }

  /**
   *
   * @return {ViewCounterEvent}
   */
  on() {
    return new ViewNavbarEvent((a) => {
      return this._on(a)
    })
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

class ViewNavbarEvent extends ViewPublicEventHandler {
  /**
   *
   * @param {ViewCounterEvent~incrementClb} clb
   * @return {String}
   */
  changeView(clb) {
    assertType(
      isFunction(clb),
      'ViewContainerPublicEventHandler:beforeRemove: `clb` should be a function'
    )
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(CHANGE_COMPONENT_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   * @callback ViewCounterEvent~incrementClb
   */
}
