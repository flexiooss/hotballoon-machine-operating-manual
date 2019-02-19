import {Action, ActionParams} from 'hotballoon'
import {ChangeComponentPayload} from './ChangeComponentPayload'

const ACTIONS_CHANGE_ROUTE = 'ACTIONS_CHANGE_ROUTE'

/**
 * @extends Action
 */
export class ChangeComponentAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_CHANGE_ROUTE, ChangeComponentPayload))
  }
}
