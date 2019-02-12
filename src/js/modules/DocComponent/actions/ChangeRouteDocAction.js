import {Action, ActionParams} from 'hotballoon'
import {ChangeRouteDocPayload} from './ChangeRouteDocPayload'

const ACTIONS_CHANGE_ROUTE_DOC = 'ACTIONS_CHANGE_ROUTE_DOC'

/**
 * @extends Action
 */
export class ChangeRouteDocAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_CHANGE_ROUTE_DOC, ChangeRouteDocPayload))
  }
}
