'use strict'
import {ViewStoresParameters, ViewContainer, ViewParameters, ViewEventListenerFactory, ActionPayload} from 'hotballoon'
import { default as Main, MainStores } from './Main.view'

import '../assets/css/style.css'

export const DOC_VIEWCONTAINER = 'COUNTER_VIEWCONTAINER'

const MAIN_VIEW = Symbol('MAIN_VIEW')

export class DocContainer extends ViewContainer {
  /**
   * @override
   */
  registerViews() {
    this.main = Main.create(new ViewParameters(MAIN_VIEW, this))
    this.addView(this.main)
  }

  getSimpleDemoNode() {
    return this.main.getSimpleDemoDiv()
  }

  getSubViewDemoNode() {
    return this.main.getSubViewDemoDiv()
  }
}

/**
 * @extends ViewStoresParameters
 */
export class DocContainerStores extends ViewStoresParameters {
  constructor() {
    super()
  }
}
