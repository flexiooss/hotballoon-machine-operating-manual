import {Action, ActionParams, ActionPayload} from 'hotballoon'

const APP_INITIALIZED = 'APP_INITIALIZED'

/**
 * @extends Action
 */
export class AppInitializedAction extends Action {
  constructor() {
    super(new ActionParams(APP_INITIALIZED, AppActionPayload))
  }
}

/**
* @extends ActionPayload
*/
export class AppActionPayload extends ActionPayload {
  constructor(message) {
    super()
    this.message = message
  }
}
