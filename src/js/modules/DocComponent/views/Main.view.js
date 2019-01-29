import {View, HtmlParams, ViewParameters, ViewStoresParameters} from 'hotballoon'


const COUNTER_SUBVIEW = 'COUNTER_SUBVIEW'

export default class Main extends View {
  /**
   *
   * @param {ViewParameters} viewParameters
   * @param {MainStores} mainStores
   */
  constructor(viewParameters, mainStores) {
    super(viewParameters, mainStores)
  }

  /**
   *
   * @return {Node}
   */
  view() {
    return this.html('main#main', HtmlParams.withChildNodes([
      this.html('h1#title.title',
        HtmlParams.withText('Hotballoon way of visit')
      ),
      this.html('h2#subtitle.subtitle',
        HtmlParams.withText('Description')
      ),
      this.html('div#corp.corp',
        HtmlParams.withChildNodes( [
          this.html('p#text.text',
            HtmlParams.withText('Une fois que le component Main est initialisé, on ....')
          ),
          this.html('pre#code.code',
            HtmlParams.withText(
        'const MAIN_COMPONENT_ID = app.addComponent(MainComponent.create(app, document.body))\n' +
              'app.Component(MAIN_COMPONENT_ID)\n' +
              '  .dispatchAction(\n' +
              '    AppInitializedAction.withPayload(\n' +
              '      new AppActionPayload(\"some string\")\n' +
              '    )\n' +
              '  )'
            )
          ),
          this.html('p#text.text',
            HtmlParams.withText('Une fois que le component Main est initialisé, on ....')
          ),
          ]
        )
      ),
      this.html('div#firstDemo.demo',
        HtmlParams.withAttributes()
      ),
        this.html('p#text.text',
          HtmlParams.withText('some description')
        ),
      this.html('div#secondDemo.demo',
        HtmlParams.withAttributes()
      ),
      this.html('p#text.text',
        HtmlParams.withText('some description')
      )
    ])
    )
  }

  /**
   *
   * @return {Node}
   */
  getSimpleDemoDiv() {
    return this.nodeRef('firstDemo')
  }

  /**
   *
   * @return {Node}
   */
  getSubViewDemoDiv() {
    return this.nodeRef('secondDemo')
  }
}

export class MainStores extends ViewStoresParameters {
  /**
   *
   */
  constructor() {
    super()
  }
}
