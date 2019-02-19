import {Action, ActionParams} from 'hotballoon'
import {ChangeRoutePayload} from './ChangeRoutePayload'

const ACTIONS_CHANGE_ROUTE = 'ACTIONS_CHANGE_ROUTE'

/**
 * @extends Action
 */
export class ChangeRouteAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_CHANGE_ROUTE, ChangeRoutePayload))
  }
}
