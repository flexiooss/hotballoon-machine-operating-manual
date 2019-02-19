import {Action, ActionParams, ActionPayload} from 'hotballoon'

const ACTIONS_GET_RESULT = 'ACTIONS_GET_RESULT'

/**
 * @extends Action
 */
export class ResultInputAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_GET_RESULT, ActionPayload))
  }
}
