import {Action, ActionParams, ActionPayload} from 'hotballoon'

const ACTIONS_CHANGE_VIEW = 'ACTIONS_CHANGE_VIEW'

/**
 * @extends Action
 */
export class ActionChangeView extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_CHANGE_VIEW, ActionPayload))
  }
}
