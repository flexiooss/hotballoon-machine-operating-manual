import {View, HtmlParams, ViewStoresParameters, NodeEventListenerFactory} from 'hotballoon'

export const CHANGE_ROUTE_EVENT = 'CHANGE_ROUTE_EVENT'

export default class Main extends View {
  /**
   *
   * @return {Node}
   */
  template() {
    return this.html('div#divBody',
      HtmlParams.withChildNodes([
        this.html('nav#navBar.navBar',
          HtmlParams.withChildNodes([
            this.html('a#linkNav.linkNav',
              HtmlParams
                .withAttributes({ href: '#Part1' })
                .addText('Part 1')
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(CHANGE_ROUTE_EVENT, {route: 'Doc', option: {component: 'Counter', option: 'SIMPLE'}})
                      this.resetDemoDiv()
                    })
                    .build()
                )
            ),
            this.html('a#linkNav.linkNav',
              HtmlParams
                .withAttributes({ href: '#Part2' })
                .addText('Part 2')
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(CHANGE_ROUTE_EVENT, {route: 'Doc', option: {component: 'Counter', option: 'SUB_VIEW'}})
                      this.resetDemoDiv()
                    })
                    .build()
                )
            ),
            this.html('a#linkNav.linkNav',
              HtmlParams
                .withAttributes({ href: '#Part3' })
                .addText('Part 3')
                .addEventListener(
                  NodeEventListenerFactory.listen('click')
                    .callback((e) => {
                      this.dispatch(CHANGE_ROUTE_EVENT, {route: 'Doc', option: {component: 'Calculator', option: 'NULL'}})
                      this.resetDemoDiv()
                    })
                    .build()
                )
            )
          ])
        ),
        this.html('main#main',
          HtmlParams.withChildNodes([
            this.html('h1#title.title',
              HtmlParams.withText('Hotballoon way of visit')
            ),
            this.html('h2#subtitle.subtitle',
              HtmlParams.withText('Description')
            ),
            this.html('div#demo.demo',
              HtmlParams.withAttributes()
            )
          ])
        )
      ])
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
    this.nodeRef('demo').removeChild(this.nodeRef('demo').firstChild)
  }
}

export class MainStores extends ViewStoresParameters {
}
