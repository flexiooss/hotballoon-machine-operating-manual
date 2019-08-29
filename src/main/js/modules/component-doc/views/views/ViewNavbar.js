import {e, ElementEventListenerBuilder, View, ViewPublicEventHandler, EventListenerOrderedBuilder} from '@flexio-oss/hotballoon'
import {assertType, isFunction} from '@flexio-oss/assert'
import navbar from '../../assets/css/navbar.css'

export const CHANGE_COMPONENT_EVENT = 'CHANGE_COMPONENT_EVENT'

export default class ViewNavbar extends View {
  /**
   *
   * @param {ViewContainerBase} viewContainer
   * @param {NavbarStoreManager} navbarStoreManager
   */
  constructor(viewContainer, navbarStoreManager) {
    super(viewContainer)
    this.__stores = navbarStoreManager
    this.subscribeToStore(this.__stores.navbarStore())
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
      e('nav#navBar')
        .childNodes(
          this.html(
            e('h2#titleSommaire.titleSommaire')
              .className(navbar.titleSommaire)
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
    let linkCount = this.__stores.navbarStore().data().linkCollection().length
    let linksTempate = []
    for (let i = 0; i < linkCount; i++) {
      let selectedLink = this.__stores.navbarStore().data().linkCollection().get(i)
      linksTempate.push(
        this.html(
          e('link#linkNav3')
            .className(navbar.linkNav)
            .bindClassName(navbar.selected, this.__stores.navbarStore().data().selected() === i)
            .text(selectedLink.name())
            .listenEvent(
              ElementEventListenerBuilder.listen('click')
                .callback((e) => {
                  this.dispatch(CHANGE_COMPONENT_EVENT, {link: selectedLink.url()})
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
