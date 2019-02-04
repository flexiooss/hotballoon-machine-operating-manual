import {Action, ActionParams} from 'hotballoon'
import {OperatorInputPayload} from './OperatorInputPayload'

const ACTIONS_ADD_OPERATOR = Symbol('ACTIONS_ADD_OPERATOR')

/**
 * @extends Action
 */
export class OperatorInputAction extends Action {
  constructor() {
    super(new ActionParams(ACTIONS_ADD_OPERATOR, OperatorInputPayload))
  }
}
